import { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export interface Booking {
  id: string;
  user_id: string;
  booking_date: string;
  status: 'pending' | 'confirmed' | 'rejected';
  profile?: {
    email: string;
    role: 'user' | 'admin';
  };
}

export interface Profile {
  id: string;
  role: 'user' | 'admin';
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (e) {
    console.error('getCurrentUser error:', e);
    return null;
  }
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      profile:profiles(role)
    `)
    .eq('user_id', userId)
    .neq('status', 'rejected')
    .order('booking_date', { ascending: true });
  if (error) throw error;
  return data as Booking[];
}

export async function rejectBooking(bookingId: string) {
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'rejected' })
    .eq('id', bookingId)
    .eq('status', 'pending');
  if (error) throw error;
}

export async function deleteBooking(bookingId: string) {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);
  if (error) throw error;
}

export async function createBooking(userId: string, bookingDate: string) {
  const { error } = await supabase
    .from('bookings')
    .insert({
      user_id: userId,
      booking_date: bookingDate,
      status: 'pending'
    });
  if (error) throw error;
}

export async function getAllBookings(): Promise<Booking[]> {
  try {
      const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        profile:profiles(role, email)
      `)
      .order('booking_date', { ascending: false })
      .limit(100);
    if (error) {
      console.error('getAllBookings error details:', error);
      throw error;
    }
    return data as Booking[] || [];
  } catch (e) {
    console.error('getAllBookings error:', e);
    return [];
  }
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', userId)
    .single();
  if (error && error.code !== 'PGRST116') return null; // No row found
  if (!data) return null;
  return data as Profile;
}

export async function isAdmin(userId: string): Promise<boolean> {
  const profile = await getProfile(userId);
  return profile?.role === 'admin';
}

