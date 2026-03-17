"use client";

import { useEffect, useState } from 'react';
import { Typography, Container, Button, Card, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Alert, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { getCurrentUser, getUserBookings, deleteBooking } from '../../lib/utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        setLoading(false);
        return;
      }
      setUser(currentUser);
      const userBookings = await getUserBookings(currentUser.id);
      setBookings(userBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Cancel this booking?')) return;
    setDeletingId(id);
    try {
      await deleteBooking(id);
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (error) {
      alert('Error cancelling booking');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mt: 4, mb: 6 }}>
          My Bookings
        </Typography>

        {user ? (
          <>
            <Typography variant="h6" color="text.secondary" textAlign="center" mb={4}>
              Welcome, {user.email}
            </Typography>

            {bookings.length === 0 ? (
              <Alert severity="info" sx={{ mt: 4 }}>
                No bookings yet. <Button onClick={() => router.push('/')}>Book Now</Button>
              </Alert>
            ) : (
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <List>
                    {bookings.map((booking) => (
                      <ListItem key={booking.id} divider>
                        <ListItemText
                          primary={`Pooja on ${dayjs(booking.booking_date).format('MMMM DD, YYYY')}`}
                          secondary={`ID: ${booking.id.substring(0, 8)}...`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleCancel(booking.id)}
                            disabled={deletingId === booking.id}
                          >
                            <Trash2 size={20} color="error.main" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Alert severity="warning" sx={{ mt: 8 }}>
            Please <Button onClick={() => router.push('/')}>login</Button> to view your bookings.
          </Alert>
        )}
      </motion.div>
    </Container>
  );
}

