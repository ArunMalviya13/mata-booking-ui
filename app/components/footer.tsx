"use client";

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Container, Divider, Link, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-auto"
      style={{
        background: 'var(--footer-bg)',
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
        background: 'linear-gradient(90deg, transparent, rgba(31, 166, 178, 0.6), transparent)'
      }} />

      <Container maxWidth={false} disableGutters sx={{ px: { xs: 2, md: 6 }, py: { xs: 6, md: 8 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 5, md: 8 }} sx={{ mb: 5 }}>
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <Typography variant="h5" fontWeight={700} color="var(--footer-title)" gutterBottom>
              Mata Pooja Booking
            </Typography>
            <Typography variant="body1" color="var(--footer-text)" sx={{ fontFamily: "'Noto Sans Devanagari', 'serif'", mb: 2 }}>
              जय माता दी | Book Divine Blessings
            </Typography>
            <Typography variant="body2" color="var(--footer-text)">
              A premium scheduling experience for devotees, built to streamline temple rituals, confirmations, and guest access.
            </Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom color="var(--footer-title)">
              Services
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="var(--footer-text)">Pooja slot booking</Typography>
              <Typography variant="body2" color="var(--footer-text)">Real-time availability</Typography>
              <Typography variant="body2" color="var(--footer-text)">Secure confirmations</Typography>
              <Typography variant="body2" color="var(--footer-text)">My bookings dashboard</Typography>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom color="var(--footer-title)">
              Support
            </Typography>
            <Stack spacing={1}>
              <Link href="/contact" color="var(--footer-text)" variant="body2" underline="hover">
                Contact Support
              </Link>
              <Link href="/about" color="var(--footer-text)" variant="body2" underline="hover">
                About the Temple
              </Link>
              <Typography variant="body2" color="var(--footer-text)">
                Privacy Policy
              </Typography>
              <Typography variant="body2" color="var(--footer-text)">
                Terms of Service
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom color="var(--footer-title)">
              Temple Info
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="var(--footer-text)">Daily timings: 6:00 AM - 9:00 PM</Typography>
              <Typography variant="body2" color="var(--footer-text)">Pooja window: 7:00 AM - 7:00 PM</Typography>
              <Typography variant="body2" color="var(--footer-text)">Helpline: +91 9XXXXXXXXX</Typography>
              <Typography variant="body2" color="var(--footer-text)">Email: support@matabooking.in</Typography>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 3, borderColor: 'var(--footer-divider)' }} />

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between">
          <Typography variant="body2" color="var(--footer-text)">
            © 2026 माता पूजा बुकिंग | Mata Pooja Booking. All rights reserved.
          </Typography>
          <Typography variant="body2" color="var(--footer-text)">
            Made with <FavoriteIcon sx={{ fontSize: 16, color: 'var(--brand-rose)', verticalAlign: 'middle', mx: 0.5 }} /> for temple bookings
          </Typography>
        </Stack>

        <Typography variant="caption" color="var(--footer-text)" sx={{ mt: 3, display: 'block' }}>
          Temple bookings made simple
        </Typography>
      </Container>
    </motion.footer>
  );
}

