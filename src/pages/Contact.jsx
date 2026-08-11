import { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((current) => ({ ...current, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      return;
    }

    if (!trimmedEmail) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!trimmedMessage) {
      setStatus({ type: 'error', message: 'Please enter a message.' });
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      console.error('VITE_FORMSPREE_ENDPOINT is missing. Add it to your .env file for Formspree integration.');
      setStatus({ type: 'error', message: 'Formspree endpoint is not configured. Please check your environment settings.' });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          _replyto: trimmedEmail,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const result = contentType.includes('application/json') ? await response.json() : null;

      if (!response.ok) {
        console.error('Formspree submission failed', response.status, result);
        throw new Error('Something went wrong. Please try again.');
      }

      setStatus({ type: 'success', message: "Message sent successfully! We'll get back to you soon. 💚" });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Formspree submit error:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-kibo-blue mb-6">
                Let's Start a Conversation.
              </h1>
              <p className="text-xl md:text-2xl text-kibo-blue/70 mb-10">
                Book a discovery call to discuss how we can transform your ideas into experiences.
              </p>
              
              <div className="flex flex-col gap-6 text-lg font-medium text-kibo-blue">
                <a href="mailto:hello@creativekibo@gmail.com" className="flex items-center gap-4 hover:text-kibo-orange transition-colors">
                  <span className="w-10 h-10 rounded-full bg-kibo-cream/50 flex items-center justify-center">@</span>
                  hello@creativekibo@gmail.com
                </a>
                <a href="https://wa.me/919373541264" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-kibo-orange transition-colors">
                  <span className="w-10 h-10 rounded-full bg-kibo-cream/50 flex items-center justify-center">#</span>
                  +91 93735 41264
                </a>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-kibo-cream/20 p-8 md:p-12 rounded-3xl border border-kibo-cream/50 flex flex-col gap-6"
            >
              <h2 className="text-2xl font-bold text-kibo-blue mb-2">Send a Message</h2>

              {status.message && (
                <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {status.message}
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-kibo-blue">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-white border border-kibo-cream focus:outline-none focus:ring-2 focus:ring-kibo-orange/50 transition-shadow"
                  placeholder="Your Name"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-kibo-blue">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-white border border-kibo-cream focus:outline-none focus:ring-2 focus:ring-kibo-orange/50 transition-shadow"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-kibo-blue">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-white border border-kibo-cream focus:outline-none focus:ring-2 focus:ring-kibo-orange/50 transition-shadow resize-none"
                  placeholder="Tell us about your ideas..."
                />
              </div>

              <Button type="submit" size="lg" className="mt-4 w-full" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
