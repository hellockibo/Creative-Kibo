import { useEffect, useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import supabase from '../lib/supabaseClient';

export function SupabaseDemo() {
  const [buckets, setBuckets] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  const fetchBuckets = async () => {
    const res = await fetch('/api/supabase/buckets');
    const json = await res.json();
    setBuckets(json.buckets || json);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <PageWrapper>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Supabase Demo</h1>

          <div className="mb-6">
            <p className="text-sm text-gray-600">Client session: {session ? 'Signed in' : 'No session'}</p>
            {session && <button className="btn-primary mt-3" onClick={signOut}>Sign out</button>}
          </div>

          <div className="mb-6">
            <button className="btn-primary" onClick={fetchBuckets}>Fetch Storage Buckets (server)</button>
          </div>

          <div>
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{buckets ? JSON.stringify(buckets, null, 2) : 'No data yet'}</pre>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
