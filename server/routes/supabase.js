const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn('Supabase service role key or URL not set in server/.env');
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// Return list of storage buckets (server-side using service role key)
router.get('/buckets', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.storage.listBuckets();
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ buckets: data });
  } catch (err) {
    console.error('Supabase buckets error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
