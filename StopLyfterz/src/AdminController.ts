import { supabase } from './supabaseClient';

export interface Profile {
    Email: string;
    Level: string;
    Authorized: boolean;
  }
  
  /**
   * Fetch all business accounts (or users) that are pending authorization.
   * Here we filter for those with authorized=false.
   */
  export async function fetchPendingBusinessAccounts(): Promise<Profile[]> {
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .eq('Authorized', false);
        
      if (error) {
        throw new Error(error.message);
      }
      return data as Profile[];
    } catch (error) {
      console.error('Error fetching pending business accounts:', error);
      throw error;
    }
  }
  
  /**
   * Approve a business account by setting authorized to true.
   */
  export async function approveBusinessAccount(email: string): Promise<Profile> {
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .update({ Authorized: true })
        .eq('Email', email)
        .select()
        .single();
        
      if (error || !data) {
        throw new Error(error?.message || 'Failed to approve business account');
      }
      return data as Profile;
    } catch (error) {
      console.error('Error approving business account:', error);
      throw error;
    }
  }
  /**
   * Deny a business account by deleting the profile (or you could mark it as denied).
   */
  export async function rejectBusinessAccount(email: string): Promise<Profile> {
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .delete()
        .eq('Email', email)
        .select()
        .single();
        
      if (error || !data) {
        throw new Error(error?.message || 'Failed to reject business account');
      }
      return data as Profile;
    } catch (error) {
      console.error('Error rejecting business account:', error);
      throw error;
    }
  }