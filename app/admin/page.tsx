"use client";

import { Alert, Button, Card, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { getAllBookings, getCurrentUser, isAdmin, rejectBooking } from '../../lib/utils';

import type { Booking } from '../../lib/utils';

export default function AdminPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editDialog, setEditDialog] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState('');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadAdminData = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/');
        return;
      }
      const admin = await isAdmin(user.id);
      setIsAdminUser(admin);
      setAdminLoading(false);
      if (admin) loadBookings();
    };
    loadAdminData();
  }, []);

  const loadBookings = async () => {
    try {
      const allBookings = await getAllBookings();
      setBookings(allBookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Reject this booking?')) return;
    setRejectingId(id);
    try {
      await rejectBooking(id);
      loadBookings();
    } catch (error) {
      alert('Reject failed');
    } finally {
      setRejectingId(null);
    }
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setNewDate(booking.booking_date);
    setEditDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!editingBooking || !newDate) return;
    try {
      await supabase
        .from('bookings')
        .update({ booking_date: newDate })
        .eq('id', editingBooking.id)
        .select();
      loadBookings();
      setEditDialog(false);
    } catch (error) {
      alert('Update failed');
    }
  };

  const handleAddNew = async () => {
    if (!newDate) return;
    try {
      const { data } = await supabase
        .from('bookings')
        .insert([{ booking_date: newDate }])
        .select();
      loadBookings();
      setEditDialog(false);
      setNewDate('');
    } catch (error) {
      alert('Add failed');
    }
  };

  const openEditDialog = () => {
    setEditingBooking(null);
    setNewDate('');
    setEditDialog(true);
  };

  if (adminLoading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!isAdminUser) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="error">
          <Typography variant="h6">Access Denied</Typography>
          <Typography>Admin access required.</Typography>
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Typography variant="h3" gutterBottom sx={{ mt: 4 }}>
          Admin Panel - All Bookings ({bookings.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openEditDialog}
          sx={{ mb: 3 }}
        >
          Add Booking
        </Button>

        <Card>
          <CardContent>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>User Email</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((booking) => (
                      <TableRow key={booking.id} hover>
                        <TableCell>{booking.id.substring(0, 8)}...</TableCell>
                        <TableCell>{booking.profile?.email || booking.user_id.substring(0, 8)}...</TableCell>
                        <TableCell>{dayjs(booking.booking_date).format('YYYY-MM-DD')}</TableCell>
                        <TableCell>
                          <Alert severity={booking.status === 'pending' ? 'warning' : booking.status === 'rejected' ? 'error' : 'success'} variant="filled" sx={{ fontSize: '0.8rem', px: 1 }}>
                            {booking.status || 'pending'}
                          </Alert>
                        </TableCell>
                        <TableCell>
                          {booking.status !== 'rejected' && (
                            <IconButton color="error" onClick={() => handleReject(booking.id)} disabled={rejectingId === booking.id}>
                              <CancelIcon fontSize="small" />
                            </IconButton>
                          )}
                          <IconButton color="primary" onClick={() => handleEdit(booking as Booking)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={bookings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editingBooking ? 'Edit Booking' : 'Add New Booking'}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Booking Date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              sx={{ mt: 2 }}
              inputProps={{ min: dayjs().format('YYYY-MM-DD') }}
            />
            {editingBooking && (
              <Alert severity="info" sx={{ mt: 2 }}>
                User: {editingBooking.user_id.substring(0, 8)}...
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog(false)}>Cancel</Button>
            <Button onClick={editingBooking ? handleSaveEdit : handleAddNew} variant="contained">
              {editingBooking ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
}

