"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography
} from "@mui/material";

import {
  DateCalendar,
  PickersDay,
  PickersDayProps
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await supabase.from("bookings").select("*");
    setBookings(data || []);
    setLoading(false);
  };

  const bookedDates = bookings.map((b) =>
    dayjs(b.booking_date).format("YYYY-MM-DD")
  );

  const isDateBooked = (date: Dayjs) =>
    bookedDates.includes(date.format("YYYY-MM-DD"));

  const handleDateSelect = (date: Dayjs | null) => setSelectedDate(date);

  const handleBook = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
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
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            gutterBottom
            fontWeight="bold"
            sx={{
              background:
                "linear-gradient(45deg, var(--primary), var(--primary-dark))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            🛕 Mata Pooja Booking
          </Typography>

          <Typography variant="h5" color="text.secondary" mb={4}>
            Book your divine pooja slot with ease
          </Typography>
        </Box>

        <Card sx={{ maxWidth: 600, mx: "auto", mb: 6, p: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom textAlign="center">
              <Calendar style={{ verticalAlign: "middle", marginRight: 8 }} />
              Select Pooja Date
            </Typography>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateSelect}
                  disablePast
                  slots={{
                    day: (props: PickersDayProps) => {
                      const isBooked = isDateBooked(props.day);

                      return (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <PickersDay
                            {...props}
                            sx={{
                              ...(props.sx || {}),
                              backgroundColor: isBooked ? "error.main" : undefined,
                              color: isBooked ? "white" : undefined,
                              fontWeight: isBooked ? "bold" : "normal",
                            }}
                          />
                        </motion.div>
                      );
                    },
                  }}
                />
              </LocalizationProvider>
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
            disabled={!selectedDate || loading}
            startIcon={<Calendar />}
            sx={{ minWidth: 200, fontSize: "1.1rem" }}
          >
            Book Pooja Slot
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