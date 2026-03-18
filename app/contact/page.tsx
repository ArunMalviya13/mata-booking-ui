"use client";

import { LocationOn, Email, Phone, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <Container maxWidth="lg" className="divine-hero">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: "center", my: 8 }}>
          <Typography
            variant="h2"
            gutterBottom
            fontWeight="bold"
            sx={{
              background: "linear-gradient(45deg, var(--saffron), var(--gold))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            📞 संपर्क करें | Contact Us
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={4} sx={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
            We're here to help with your spiritual journey <br />
            <em>जय माता दी 🙏</em>
          </Typography>
        </Box>

        <Grid container spacing={6}>
          <Grid xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 4, height: "fit-content" }}>
              <Typography variant="h4" gutterBottom color="primary.main">
                मंदिर विवरण | Temple Information
              </Typography>
              <Divider sx={{ mb: 4 }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn sx={{
                      color: "var(--maroon)",
                    }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Mata Temple Location"
                    secondary="123 Divine Street, Temple Road, City 400001"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone sx={{ color: "var(--saffron)" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary="+91 98765 43210 | +91 98765 43211"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email sx={{ color: "var(--temple-red)" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Mail"
                    secondary="bookings@matatemple.com"
                  />
                </ListItem>
              </List>
              <Typography variant="body2" color="text.secondary" mt={3}>
                ⏰ Open: 5 AM - 9 PM (Daily)
              </Typography>
            </Paper>
          </Grid>

          <Grid xs={12} md={6}>
            <Card sx={{ p: 4, boxShadow: "0 15px 35px rgba(255, 153, 51, 0.3)" }}>
              <Typography variant="h4" gutterBottom color="secondary.main">
                पूछताछ फॉर्म | Enquiry Form
              </Typography>
              <Box component="form" sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="पूर्ण नाम | Full Name *"
                      placeholder="Enter your full name"
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="मोबाइल नंबर | Mobile *"
                      placeholder="98XXXXXXXX"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      label="ईमेल | Mail"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      label="पूजा प्रकार | Pooja Type"
                      select
                      SelectProps={{ native: true }}
                      helperText="Select or describe your requirement"
                    >
                      <option value="">Choose Pooja...</option>
                      <option value="navratri">Navratri Pooja</option>
                      <option value="durga">Durga Pooja</option>
                      <option value="lakshmi">Lakshmi Pooja</option>
                      <option value="special">Special/Custom</option>
                    </TextField>
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      label="विशेष आवश्यकताएं | Special Requirements"
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
                  sx={{ mt: 4, py: 1.5, fontSize: "1.1rem" }}
                  startIcon={<Send />}
                >
                  भेजें | Send Enquiry
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 8, p: 4, bgcolor: "rgba(255, 153, 51, 0.05)" }}>
          <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
            शुभ लाभ 🙏 जय माता दी
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We respond within 2 hours during temple hours
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
}

