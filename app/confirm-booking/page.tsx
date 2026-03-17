"use client";

import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabaseClient';
import { createBooking, getCurrentUser } from '../../lib/utils';

export default function ConfirmBooking() {
  const params = useParams();
  const router = useRouter();
  const [bookingDate, setBookingDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [bookedDates, setBookedDates] = useState<string[]>([]);

  useEffect(() => {
    const date = params.date as string;
    if (date) {
      setBookingDate(date);
      loadData(date);
    } else {
      router.push('/');
    }
  }, [params.date]);

  const loadData = async (date: string) => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return;
      }
      setUser(currentUser);

      const { data: bookings } = await supabase.from('bookings').select('booking_date').neq('status', 'rejected');
      setBookedDates(bookings?.map((b: any) => b.booking_date) || []);

      if (bookedDates.includes(date)) {
        toast.error('This date is already booked!');
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await createBooking(user.id, bookingDate);
      toast.success('Booking confirmed! Check My Bookings.');
      router.push('/my-bookings');
    } catch (error) {
      toast.error('Booking failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingDate) {
    return <CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%' }} />;
  }

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Card sx={{ p: 6, boxShadow: 'var(--shadow-xl)' }}>
            <CardContent>
              <Typography variant="h3" gutterBottom color="primary.main">
                <CheckCircle style={{ verticalAlign: 'middle', marginRight: 2, fontSize: 48 }} />
                Confirm Booking
              </Typography>
              <Typography variant="h4" gutterBottom>
                Pooja Slot
              </Typography>
              <Alert severity="success" sx={{ mb: 4, fontSize: '1.2rem' }}>
                <Calendar style={{ marginRight: 1 }} />
                {dayjs(bookingDate).format('dddd, MMMM DD, YYYY')}
              </Alert>

              {user && (
                <Typography variant="body1" sx={{ mb: 4, fontWeight: 'medium' }}>
                  For: {user.email}
                </Typography>
              )}

              <Button
                variant="contained"
                size="large"
                onClick={handleConfirm}
                disabled={loading || !user}
                fullWidth
                sx={{ py: 2, fontSize: '1.1rem' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Confirm & Book'}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => router.push('/')}
              >
                Change Date
              </Button>
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Container>
  );
}

