# Supabase Integration Setup Guide

## Summary of Changes Made

I've implemented the complete Supabase integration for your portfolio project management system. Here's what was created and updated:

### ✅ Files Created
1. **src/lib/supabaseClient.js** - Supabase client initialization
2. **src/services/portfolioService.js** - Service layer with all CRUD operations and file upload functions
3. **SUPABASE_SETUP.sql** - SQL script to create the database table and policies

### ✅ Files Updated
1. **.env** - Added VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
2. **server/.env** - Added SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
3. **src/pages/AdminPanel.jsx** - Integrated all portfolio service functions
4. **src/pages/Portfolio.jsx** - Added data fetching and display logic

### ✅ Build Status
- Frontend builds successfully ✓
- No errors or import issues ✓

---

## Step-by-Step Setup Instructions

### Step 1: Create the Database Table in Supabase

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project (kxycqiktbsereijwtgvb)
3. Go to **SQL Editor** (left sidebar)
4. Click **"New query"**
5. Copy and paste the contents of `SUPABASE_SETUP.sql` from the root folder
6. Click **"Run"** to execute the SQL

This will create:
- The `portfolio_projects` table with all required columns
- Row Level Security (RLS) policies for public read and admin write access
- An index for better query performance

### Step 2: Verify Storage Buckets Exist

The two storage buckets should already exist:
- **portfolio-images** (PUBLIC) - for project images
- **portfolio-videos** (PUBLIC) - for project videos

If they don't exist:
1. Go to **Storage** in the Supabase dashboard
2. Click **New bucket** and create:
   - Name: `portfolio-images`, Permissions: PUBLIC
   - Name: `portfolio-videos`, Permissions: PUBLIC

### Step 3: Verify Environment Variables

The following have been added to your `.env` files:

**Frontend (.env):**
```
VITE_SUPABASE_URL=https://kxycqiktbsereijwtgvb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eWNxaWt0YnNlcmVpand0Z3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2Nzc2NTYsImV4cCI6MjEwMjI1MzY1Nn0._5_S6j24um16RI4VuHgqxJ1KzAOFswbxj-6kOiBH8xk
```

**Server (server/.env):**
```
SUPABASE_URL=https://kxycqiktbsereijwtgvb.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eWNxaWt0YnNlcmVpand0Z3ZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY3NzY1NiwiZXhwIjoyMTAyMjUzNjU2fQ.9-KsMl-BtYx_O9JGXzs-wvDL_1bpdUZZtN51ZNVCWek
```

---

## How the System Works

### Admin Panel Flow
1. User taps the logo 3 times in the navbar
2. Redirected to `/admin-login`
3. Enters PIN: **7710**
4. Accesses `/admin` panel
5. Can:
   - **Add Projects**: Fill form + upload image/video → saved to Supabase
   - **Edit Projects**: Click Edit → modify → update
   - **Delete Projects**: Click Delete → removed from Supabase

### Portfolio Page Flow
1. User visits `/portfolio`
2. Page fetches all projects from `portfolio_projects` table
3. Displays featured project (first) + grid of others
4. Images load from `portfolio-images` bucket
5. Videos show as "Video" links to `portfolio-videos` bucket

### Service Layer (`portfolioService.js`)
- `fetchPortfolioProjects()` - GET all projects
- `createPortfolioProject(project)` - POST new project
- `updatePortfolioProject(id, project)` - PUT to update
- `deletePortfolioProject(id)` - DELETE project
- `uploadPortfolioImage(file)` - Upload image to bucket
- `uploadPortfolioVideo(file)` - Upload video to bucket

---

## Testing Checklist

After completing the setup:

- [ ] Database table created successfully in Supabase
- [ ] Storage buckets exist (portfolio-images, portfolio-videos)
- [ ] Frontend runs: `npm run dev`
- [ ] Backend runs: `npm start` (in server/ folder)
- [ ] Access admin via logo tap → PIN 7710
- [ ] Upload image to admin panel
- [ ] Upload video to admin panel
- [ ] Create a test project
- [ ] Verify project appears in Supabase dashboard
- [ ] Visit /portfolio and see the new project displayed
- [ ] Edit project details
- [ ] Delete project from admin panel

---

## Troubleshooting

### "Storage bucket is missing" error
- Check that both `portfolio-images` and `portfolio-videos` buckets exist and are PUBLIC

### "Row level security policy missing" error
- Re-run the SQL script to ensure all policies are created

### Images/videos not uploading
- Verify the server is running on port 5000
- Check browser console for specific error messages
- Ensure file size is reasonable (< 50MB recommended)

### Projects not showing on portfolio page
- Go to Supabase SQL Editor
- Run: `SELECT COUNT(*) FROM portfolio_projects;`
- Verify projects exist in the table

---

## File Structure Summary

```
Website-2/
├── .env (updated with Supabase keys)
├── src/
│   ├── lib/
│   │   └── supabaseClient.js (NEW)
│   ├── services/
│   │   └── portfolioService.js (NEW)
│   └── pages/
│       ├── AdminPanel.jsx (updated)
│       └── Portfolio.jsx (updated)
├── server/
│   └── .env (updated with Supabase keys)
└── SUPABASE_SETUP.sql (NEW)
```

---

## Next Steps

1. ✅ Run the SQL setup in Supabase dashboard
2. ✅ Verify buckets are PUBLIC
3. ✅ Start both frontend and backend servers
4. ✅ Test the admin panel flow
5. ✅ Add test projects
6. ✅ Verify portfolio page displays them

The system is now fully integrated with Supabase and ready to use!
