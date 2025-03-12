
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bwenrbcyqcebxwdcucbc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3ZW5yYmN5cWNlYnh3ZGN1Y2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDY4NzMsImV4cCI6MjA1NzM4Mjg3M30.C3jP5J0e - QIMTEmNW6krMzqveB6wyPiTa01zsau5Dwo';

export const supabase = createClient(supabaseUrl, supabaseKey)

