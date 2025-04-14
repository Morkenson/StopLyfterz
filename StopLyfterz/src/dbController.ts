// Functions for our database such as login, register, and getting lifters cards and such.
import { supabase } from './supabaseClient';

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

export async function createProfile(
  email: string,
  level: string,
  authorized: boolean
) {
  try {
    const { data, error } = await supabase
      .from('Profiles')
      .insert([
        {
          Email: email,
          Level: level,
          Authorized: authorized
        },
      ])
      .select()  // retrieve the newly inserted record
      .single(); // ensure we only get one row
    
    if (error || !data) {
      throw new Error(error?.message || 'Failed to create profile');
    }
    return data; // Return the inserted profile data
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
}

export async function getAccountRole(email: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('Profiles')
      .select('Level')
      .eq('Email', email)
      .single();

    if (error || !data) {
      throw new Error(error?.message || 'Account not found');
    }
    // Assuming "Level" is the field where the role is stored.
    return data.Level as string;
  } catch (err) {
    console.error('Error getting account role:', err);
    throw err;
  }
}
