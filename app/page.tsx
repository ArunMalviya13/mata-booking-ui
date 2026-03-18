"use client";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Link,
  Typography
} from "@mui/material";
import toast from "react-hot-toast";

import {
  DateCalendar,
  PickersDay,
  PickersDayProps
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllBookings, getCurrentUser } from "../lib/utils";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const user = await Promise.race([
          getCurrentUser(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Auth timeout")), 5000)
          )
        ]);
        setCurrentUser(user);
      } catch (e) {
        console.error("Auth load failed:", e);
        setAuthError(true);
      } finally {
        setUserLoading(false);
        fetchBookings();
      }
    };
    loadInitialData();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(data || []);
    } catch (e: any) {
      if (e.message && e.message.includes('Bookings table not found')) {
        toast.error('Calendar data unavailable. Database setup in progress.', { duration: 4000 });
      } else {
        console.error('Bookings fetch failed:', e);
        setAuthError(true);
      }
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const bookedDates = bookings.map((b) =>
    dayjs(b.booking_date).format("YYYY-MM-DD")
  );

  const isDateBooked = (date: Dayjs) =>
    bookedDates.includes(date.format("YYYY-MM-DD"));

  const handleDateSelect = (date: Dayjs | null) => {
    if (!currentUser && date !== selectedDate) {
      toast.error("Please login to select dates", { duration: 3000 });
      return;
    }
    setSelectedDate(date);
  };

  const handleBook = async () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    if (isDateBooked(selectedDate)) {
      alert("Date already booked ❌");
      return;
    }

    router.push(`/confirm-booking/${selectedDate.format("YYYY-MM-DD")}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: [3, 4, 5, 6] }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Box sx={{ textAlign: "center", mb: 8, px: { xs: 2, md: 0 } }}>
          <Typography
            className="heading-1"
            gutterBottom
            component="h1"
            sx={{
              background: "linear-gradient(45deg, hsl(var(--blue)), hsl(var(--blue-light)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.025em",
              mb: 3
            }}
          >
            🛕 माता पूजा बुकिंग | Mata Pooja Booking
          </Typography>

          <Typography
            variant="h4"
            color="text.primary"
            sx={{
              mb: 6,
              fontWeight: 300,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.4,
              fontSize: { xs: '1.5rem', md: '1.875rem' }
            }}
          >
            Book Divine Blessings with Ease <br />
            <span className="heading-2" style={{ color: 'hsl(var(--red))' }}>जय माता दी 🙏</span>
          </Typography>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              component={Link}
              href="/poojas"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderWidth: 2,
                fontWeight: 600,
                className: 'card-hover'
              }}
            >
              Explore Poojas →
            </Button>
          </motion.div>
        </Box>


        <Card sx={{ maxWidth: 600, mx: "auto", mb: 6, p: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom textAlign="center">
              <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: 28 }} />
              Select Pooja Date
            </Typography>

            {!userLoading ? (
              <>
                <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: currentUser ? 'success.main' : 'text.secondary', fontStyle: authError ? 'italic' : 'normal' }}>
                  {authError ? '⚠️ Auth service unavailable - View-only mode' : !currentUser ? '👋 Guest mode - Login to book dates' : '✅ Logged in - Select your Pooja date'}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateSelect}
                    disablePast
                    readOnly={!currentUser}
                    slots={{
                      day: (props: PickersDayProps) => {
                        const isBooked = props.day && isDateBooked(props.day);
                        return (
                          <motion.div
                            whileHover={currentUser ? { scale: 1.05 } : {}}
                            whileTap={currentUser ? { scale: 0.95 } : {}}
                          >
                            <PickersDay
                              {...props}
                              sx={{
                                ...(props.sx || {}),
                                backgroundColor: isBooked ? "primary.main !important" : undefined,
                                color: isBooked ? "white !important" : undefined,
                                fontWeight: isBooked ? "bold" : "normal",
                                cursor: currentUser ? 'pointer' : 'default',
                              }}
                            />
                          </motion.div>
                        );
                      },
                    }}
                  />
                </LocalizationProvider>
              </>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress size={40} />
                <Typography sx={{ ml: 2 }}>Loading calendar...</Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {selectedDate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Alert severity="info" sx={{ maxWidth: 400, mx: "auto", mb: 4 }}>
              Selected: {selectedDate.format("MMMM DD, YYYY")}
            </Alert>
          </motion.div>
        )}

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleBook}
            disabled={!currentUser || !selectedDate || loading}
            startIcon={<CalendarTodayIcon />}
            sx={{ minWidth: 200, fontSize: "1.1rem" }}
          >
            {!currentUser ? "Login to Book" : "Book Pooja Slot"}
          </Button>
        </Box>

        {bookings.length > 0 && (
          <Card sx={{ mt: 8, p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Recent Bookings
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {bookings.slice(0, 10).map((b) => (
                <Alert
                  key={b.id}
                  severity="warning"
                  variant="outlined"
                  sx={{ fontSize: "0.9rem" }}
                >
                  {dayjs(b.booking_date).format("MMM DD")}
                </Alert>
              ))}
            </Box>
          </Card>
        )}
      </motion.div>
    </Container>
  );
}

