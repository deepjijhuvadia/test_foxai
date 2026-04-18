# FoxAI Waitlist Data

This directory stores waitlist submissions.

## Current Storage: LocalStorage → CSV Export

Waitlist entries are currently stored in the browser's `localStorage` under the key `foxai_waitlist_entries`.

### Exporting to CSV/XLSX

Run in the browser console:
```js
WaitlistModule.downloadCSV();
```

This will download a `.csv` file that can be opened in Excel or Google Sheets and saved as `.xlsx`.

## Future Migration: Supabase

When ready to switch to Supabase:

1. Create a `waitlist` table in Supabase with columns:
   - `id` (uuid, primary key)
   - `full_name` (text)
   - `email` (text, unique)
   - `instagram` (text, nullable)
   - `creator_type` (text)
   - `timestamp` (timestamptz)
   - `source` (text)

2. Update `assets/js/waitlist.js`:
   - Import Supabase client
   - Replace `saveEntry()` function body with Supabase insert
   - Replace `getEntries()` function body with Supabase select

See comments in `waitlist.js` for exact migration instructions.
