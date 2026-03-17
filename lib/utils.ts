import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';

export interface Booking {
  id: string;
  user_id: string;
  booking_date: string;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('booking_date', { ascending: true });
  if (error) throw error;
  return data as Booking[];
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
    .insert({ user_id: userId, booking_date: bookingDate });
  if (error) throw error;
}

export async function getAllBookings(): Promise<Booking[]> {
  const { data, error } = await supabase.from('bookings').select('*');
  if (error) throw error;
  return data as Booking[];
}

