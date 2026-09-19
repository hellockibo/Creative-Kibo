const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../supabase');

const login = async (req, res) => {
  const { pin } = req.body;
  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').trim().toLowerCase();

  if (!pin) {
    return res.status(400).json({ error: 'Admin PIN required' });
  }

  try {
    const { data: admin, error } = await supabase.from('admins').select('id, email, password_hash').eq('email', email.trim().toLowerCase()).maybeSingle();
    if (error) throw error;

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(String(pin), admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.cookie('kibo_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.json({ success: true, message: 'Logged in successfully' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('kibo_admin_token');
  return res.json({ success: true, message: 'Logged out successfully' });
};

const checkAuth = (req, res) => {
  // If this route is reached, the middleware has already verified the token
  return res.json({ success: true, admin: req.admin });
};

module.exports = { login, logout, checkAuth };
