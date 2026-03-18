"use client";

import { Box, Container, Divider, Link, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-auto"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--red)), hsl(var(--background)))',
        position: 'relative',
        overflow: 'hidden'
      }}

    >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--glow-red), transparent)'
        }} />

      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
            🛕 Mata Pooja Booking
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Noto Sans Devanagari', 'serif'", mb: 2 }}>
            जय माता दी 🙏 | Book Divine Blessings
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: 'divider' }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            © 2024 माता पूजा बुकिंग | Mata Pooja Booking. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with <FavoriteIcon sx={{ fontSize: 16, color: 'var(--red)', verticalAlign: 'middle', mx: 0.5 }} /> for temple bookings
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: 'divider' }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Link href="/about" color="text.secondary" variant="body2" underline="hover">
            About
          </Link>
          <Link href="/contact" color="text.secondary" variant="body2" underline="hover">
            Contact
          </Link>
          <Link href="/privacy" color="text.secondary" variant="body2" underline="hover">
            Privacy
          </Link>
          <Link href="/terms" color="text.secondary" variant="body2" underline="hover">
            Terms
          </Link>
        </Box>

        <Typography variant="caption" color="text.disabled" sx={{ mt: 4, display: 'block' }}>
          Temple bookings made simple ✨
        </Typography>
      </Container>
    </motion.footer>
  );
}

