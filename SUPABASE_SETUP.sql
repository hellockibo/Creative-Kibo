-- Drop table if it exists and recreate from scratch
DROP TABLE IF EXISTS portfolio_projects CASCADE;

-- Create the portfolio_projects table
CREATE TABLE portfolio_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_name TEXT NOT NULL,
  project_type TEXT NOT NULL CHECK (project_type IN ('Website', 'AI Ads', 'Branding', 'Graphic Design', 'Custom')),
  image_url TEXT,
  video_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- DISABLE Row Level Security completely (no restrictions)
ALTER TABLE portfolio_projects DISABLE ROW LEVEL SECURITY;

-- Create an index on created_at for better query performance
CREATE INDEX idx_portfolio_projects_created_at ON portfolio_projects(created_at DESC);

-- Verify table was created successfully
SELECT 'Table created successfully!' as status;
