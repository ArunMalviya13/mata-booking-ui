"use client";

import { Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-auto"
      style={{ background: 'linear-gradient(180deg, var(--secondary), var(--background))' }}
    >
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © 2024 Mata Pooja Booking. All rights reserved.
        </Typography>
        <Typography variant="body2" mt={1}>
          Made with ❤️ for temple bookings
        </Typography>
      </Container>
    </motion.footer>
  );
}

