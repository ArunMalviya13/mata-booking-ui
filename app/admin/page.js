"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Admin() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    async function fetchBookings() {
        const { data } = await supabase.from("bookings").select("*");
        setBookings(data || []);
    }

    async function deleteBooking(id) {
        await supabase.from("bookings").delete().eq("id", id);
        fetchBookings();
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Admin Panel</h1>

            {bookings.map((b) => (
                <div key={b.id}>
                    <p>{b.booking_date}</p>
                    <button onClick={() => deleteBooking(b.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}