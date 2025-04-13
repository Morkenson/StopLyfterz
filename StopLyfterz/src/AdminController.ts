import { supabase } from './supabaseClient';

export interface Profile {
    id: string;
    email: string;
    role: string;
    authorized: boolean;
  }
  
  /**
   * Fetch all business accounts (or users) that are pending authorization.
   * Here we filter for those with authorized=false.
   */
  export async function fetchPendingBusinessAccounts(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('authorized', false);
    if (error) {
      throw error;
    }
    return data as Profile[];
  }
  
  /**
   * Approve a business account by setting authorized to true.
   */
  export async function approveBusinessAccount(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ authorized: true })
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }
  
  /**
   * Deny a business account by deleting the profile (or you could mark it as denied).
   */
  export async function denyBusinessAccount(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }