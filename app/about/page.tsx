"use client";

import { TempleHindu, Group } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from "framer-motion";

export default function AboutPage() {
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
            🙏 मंदिर के बारे में | About Mata Temple
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={4} sx={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
            Where Tradition Meets Divinity <br />
            <em>जय माता दी</em>
          </Typography>
        </Box>

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 4, height: "100%", boxShadow: "0 15px 35px rgba(255, 153, 51, 0.3)" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <TempleHindu sx={{ fontSize: 48, color: "var(--saffron)", mr: 2 }} />
                  <Typography variant="h4" color="primary.main">
                    Our Sacred Heritage
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                  Established over 50 years ago, our Mata Temple follows authentic Vedic traditions.
                  Every pooja is conducted with pure devotion by experienced priests trained in Agama Shastras.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Traditional Vedic Rituals" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Pandits with 20+ years experience" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Daily temple maintenance" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Fresh flowers & prasad daily" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card sx={{ p: 4, height: "100%", boxShadow: "0 15px 35px rgba(128, 0, 0, 0.3)" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Group sx={{ fontSize: 48, color: "var(--maroon)", mr: 2 }} />
                  <Typography variant="h4" color="secondary.main">
                    Our Devoted Priests
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                  Our pandits come from generations of temple priest families, trained in the ancient art of pooja vidhi.
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                  Pandit Shri Ram Sharma Ji
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Head Priest - 35 years experience
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                  Pandit Shri Krishna Joshi Ji
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Assistant Priest - 25 years experience
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8 }} />

        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 4 }}>
            <FavoriteIcon sx={{ fontSize: 64, color: 'var(--temple-red)', mr: 2 }} />
            <Typography variant="h4" color="error.main" fontWeight="bold">
              Our Commitment to Authenticity
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto", lineHeight: 1.8, fontSize: "1.1rem" }}>
            Every pooja follows strict traditional procedures using only the purest materials.
            We ensure mantra uccharan, homa kund, and prasad preparation as per shastras.
            Your spiritual experience is our sacred responsibility.
            <br /><br />
            <strong>शुभ लाभ 🙏</strong>
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontFamily: "'Noto Sans Devanagari', serif", mb: 2 }}>
            Ready to book your divine experience?
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/poojas"
            sx={{ fontSize: "1.1rem", px: 6, boxShadow: "0 10px 25px rgba(255, 153, 51, 0.4)" }}
          >
            Explore Poojas
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}

