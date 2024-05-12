import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://owjosckubsnefkjsattp.supabase.co";
// The reason why we can leave this key here, is because in supabase we have already enabled role - level security
// What it means is that we have allowed this public key to only be able to do certain action (Example: only reading)
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93am9zY2t1YnNuZWZranNhdHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0MDEyNTQsImV4cCI6MjAzMDk3NzI1NH0.4TbjLXBCDjPlT8613YVrV3FZs31bxsHJKJyVm9DPTZI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
