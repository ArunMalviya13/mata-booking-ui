"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
    const [date, setDate] = useState("");
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    async function fetchBookings() {
        const { data } = await supabase.from("bookings").select("*");
        setBookings(data || []);
    }

    async function handleBooking() {
        const user = (await supabase.auth.getUser()).data.user;

        if (!user) {
            alert("Please login first");
            return;
        }

        const { error } = await supabase.from("bookings").insert([
            {
                user_id: user.id,
                booking_date: date,
            },
        ]);

        if (error) {
            alert("Date already booked ❌");
        } else {
            alert("Booking successful ✅");
            fetchBookings();
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Mandir Pooja Booking</h1>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button onClick={handleBooking}>Book</button>

            <h3>Booked Dates:</h3>
            <ul>
                {bookings.map((b) => (
                    <li key={b.id}>{b.booking_date}</li>
                ))}
            </ul>
        </div>
    );
}