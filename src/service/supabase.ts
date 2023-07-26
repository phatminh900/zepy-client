import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dtxsukkzkbbixvkbitln.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0eHN1a2t6a2JiaXh2a2JpdGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5OTgwMjMsImV4cCI6MjAwNTU3NDAyM30.o0qFJCk54ZClo03fsou5Bw92ciLmkfX7t0uNdqSVY-Y";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
