"use client";

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Container, IconButton, List, ListItem, ListItemSecondaryAction, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteBooking, getCurrentUser, getUserBookings } from '../../lib/utils';

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
    } catch (error: any) {
      console.error('Error loading bookings:', error);
      if (error.message?.includes('Bookings table not found')) {
        // Don't show generic error - table missing is expected until setup
      }
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
    <Container maxWidth="md" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Typography
          className="heading-2"
          gutterBottom
          textAlign="center"
          sx={{ mb: 8, color: 'var(--saffron)' }}
          component="h1"
        >
          My Bookings
        </Typography>

        {user ? (
          <>
            <Typography
              variant="h5"
              color="text.secondary"
              textAlign="center"
              mb={6}
              sx={{
                fontWeight: 300,
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              Welcome back, {user.email}
            </Typography>

            {bookings.length === 0 ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Alert severity="info" sx={{ mt: 4, px: 4, py: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    No bookings yet
                  </Typography>
                  <Typography color="text.secondary">
                    Ready to book your divine pooja?
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => router.push('/')}
                    sx={{ mt: 2, px: 4 }}
                  >
                    Book Now
                  </Button>
                </Alert>
              </motion.div>
            ) : (
              <Card sx={{ mb: 4, boxShadow: 'var(--shadow-xl)' }} className="card-hover">
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ p: 4, pb: `calc(${8}px + 0.5vw)` }}>
                    <Typography variant="h6" color="primary.main" gutterBottom fontWeight="bold">
                      Your Active Bookings ({bookings.length})
                    </Typography>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {bookings.map((booking, index) => (
                      <motion.div key={booking.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                        <ListItem divider sx={{ px: 4, py: 3 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight="medium">
                              Pooja on {dayjs(booking.booking_date).format('MMMM DD, YYYY')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ID: {booking.id.substring(0, 8)}...
                            </Typography>
                            <Chip
                              label={booking.status || 'pending'}
                              size="small"
                              sx={{ mt: 1, fontWeight: 600 }}
                              color={booking.status === 'confirmed' ? 'success' : booking.status === 'rejected' ? 'error' : 'warning'}
                            />
                          </Box>
                          <ListItemSecondaryAction sx={{ alignSelf: 'flex-start' }}>
                            {booking.status === 'pending' && (
                              <IconButton
                                edge="end"
                                onClick={() => handleCancel(booking.id)}
                                disabled={deletingId === booking.id}
                                color="error"
                                sx={{ mr: 1 }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                            {booking.status === 'pending' && <ScheduleIcon sx={{ fontSize: 20, color: 'warning.main' }} />}
                            {booking.status === 'confirmed' && <CheckCircleIcon sx={{ fontSize: 20, color: 'success.main' }} />}
                            {booking.status === 'rejected' && <CancelIcon sx={{ fontSize: 20, color: 'error.main' }} />}
                          </ListItemSecondaryAction>
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Alert severity="warning" sx={{ mt: 8, px: 4, py: 4 }}>
              <Typography variant="h6" gutterBottom>
                Login Required
              </Typography>
              <Typography color="text.secondary" mb={3}>
                Please login to view your bookings
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push('/')}
                sx={{ px: 4 }}
              >
                Go to Home & Login
              </Button>
            </Alert>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
}

