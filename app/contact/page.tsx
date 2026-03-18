"use client";

import { Email, LocationOn, Phone, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <Container maxWidth="lg" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography className="heading-1 hero-title" component="h1" gutterBottom>
            📞 संपर्क करें | Contact Us
          </Typography>
          <Typography variant="h6" className="hero-subtitle" sx={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
            We're here to help with your spiritual journey. <br />
            <em>जय माता दी 🙏</em>
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          <Grid size={{ xs: 12, md: 5 }}>
            <Card className="glass-card" sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
              <Stack spacing={2}>
                <Typography variant="h5" fontWeight={700} color="primary.main">
                  Temple Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reach out to us for timings, guidance, or booking assistance.
                </Typography>
                <Divider />

                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <LocationOn color="primary" />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>Location</Typography>
                      <Typography variant="body2" color="text.secondary">
                        123 Divine Street, Temple Road, City 400001
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Phone color="primary" />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>Phone</Typography>
                      <Typography variant="body2" color="text.secondary">
                        +91 98765 43210, +91 98765 43211
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Email color="primary" />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>Email</Typography>
                      <Typography variant="body2" color="text.secondary">
                        bookings@matatemple.com
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>

                <Divider />
                <Typography variant="body2" color="text.secondary">
                  Temple hours: 5:00 AM - 9:00 PM (Daily)
                </Typography>
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Card className="glass-card" sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" fontWeight={700} color="secondary.main" gutterBottom>
                Enquiry Form
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Share your details and we will confirm the best slot for you.
              </Typography>

              <Box component="form">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      placeholder="Enter your full name"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Mobile"
                      placeholder="98XXXXXXXX"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Pooja Type"
                      placeholder="Navratri / Durga / Special"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Special Requirements"
                      multiline
                      rows={4}
                      placeholder="Marriage, health, career, family issues etc."
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 3, py: 1.5, fontSize: "1.05rem" }}
                  startIcon={<Send />}
                >
                  Send Enquiry
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Card className="glass-card" sx={{ mt: 4, p: 3, textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight={700} color="primary.main" gutterBottom>
            शुभ लाभ 🙏 जय माता दी
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We respond within 2 hours during temple hours.
          </Typography>
        </Card>
      </motion.div>
    </Container>
  );
}

