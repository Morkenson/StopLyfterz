// Functions for our database such as login, register, and getting lifters cards and such.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function signUp(email: string, password: string) {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        console.log('Sign up successful:', data.user);
        return data.user; // Return the created user object on success
      } catch (err) {
        console.error('Unexpected error in signUp:', err);
        throw err;
      }
    }

export async function login(email: string, password: string) {
  try{
    const { data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return data.user;

  } catch(err){
      console.error('Error logging in:', err);
      return;
    }
}
