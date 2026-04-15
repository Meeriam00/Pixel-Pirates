import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://enuhlgduswurzhrnbeqf.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVudWhsZ2R1c3d1cnpocm5iZXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDMyMjEsImV4cCI6MjA5MTMxOTIyMX0.7k-nbVM6Rdy9zfZ-xIiU1-05S0l8aD0qizFWvdqMCEQ"; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);