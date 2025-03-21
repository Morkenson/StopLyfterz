
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://emgrhbaltiiogjxmsxgx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZ3JoYmFsdGlpb2dqeG1zeGd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjE0NzY5MCwiZXhwIjoyMDU3NzIzNjkwfQ.8_i6Ms1Sga-d8bA3kSm76mLcd_Rgz3FxJVLHMx1xy08';

export const supabase = createClient(supabaseUrl, supabaseKey)

