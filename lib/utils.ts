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
    .select('*')
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
  if (error) {
    console.error('createBooking error:', error);
    if (error.code === '23505') {
      const details = error.details || '';
      if (details.includes('booking_date')) {
        throw new Error('This date is already booked by someone else');
      } else if (details.includes('user_id')) {
        throw new Error('You already have a booking for this date');
      }
    }
    throw new Error(`Booking failed: ${error.message}`);
  }
}



export async function getAllBookings(): Promise<Booking[]> {
  try {
      const { data, error } = await supabase
      .from('bookings')
      .select('*')
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
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('id', userId)
      .single();
    if (error) {
      console.error('getProfile error:', error);
      return null;
    }
    return data as Profile || null;
  } catch (e) {
    console.error('getProfile error:', e);
    return null;
  }
}


export async function isAdmin(userId: string): Promise<boolean> {
  const profile = await getProfile(userId);
  return profile?.role === 'admin';
}

