"use client";

import { Group, TempleHindu } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <Container maxWidth="lg" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography className="heading-1 hero-title" component="h1" gutterBottom>
            🙏 मंदिर के बारे में | About Mata Temple
          </Typography>
          <Typography variant="h6" className="hero-subtitle" sx={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
            Where tradition meets divinity. <br />
            <em>जय माता दी</em>
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: { xs: 4, md: 6 } }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card className="glass-card" sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TempleHindu color="primary" sx={{ fontSize: 44 }} />
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    Our Sacred Heritage
                  </Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Established over five decades ago, our Mata Temple follows authentic Vedic traditions. Every pooja is
                  conducted with pure devotion by experienced priests trained in Agama Shastras.
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">Traditional Vedic rituals</Typography>
                  <Typography variant="body2" color="text.secondary">Pandits with 20+ years of experience</Typography>
                  <Typography variant="body2" color="text.secondary">Daily temple maintenance</Typography>
                  <Typography variant="body2" color="text.secondary">Fresh flowers and prasad daily</Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card className="glass-card" sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Group color="primary" sx={{ fontSize: 44 }} />
                  <Typography variant="h5" fontWeight={700} color="secondary.main">
                    Our Devoted Priests
                  </Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Our pandits come from generations of temple priest families, trained in the ancient art of pooja vidhi.
                </Typography>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} color="primary.main">
                    Pandit Shri Ram Sharma Ji
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Head Priest — 35 years experience
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} color="primary.main">
                    Pandit Shri Krishna Joshi Ji
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assistant Priest — 25 years experience
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        <Card className="glass-card" sx={{ p: { xs: 3, md: 4 }, mb: { xs: 4, md: 6 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', md: 'center' }}>
            <FavoriteIcon color="error" sx={{ fontSize: 54 }} />
            <Box>
              <Typography variant="h5" fontWeight={700} color="error.main" gutterBottom>
                Our Commitment to Authenticity
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Every pooja follows strict traditional procedures using only the purest materials. We ensure mantra uccharan,
                homa kund, and prasad preparation as per shastras. Your spiritual experience is our sacred responsibility.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                शुभ लाभ 🙏
              </Typography>
            </Box>
          </Stack>
        </Card>

        <Divider sx={{ my: { xs: 3, md: 4 } }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontFamily: "'Noto Sans Devanagari', serif", mb: 2 }}>
            Ready to book your divine experience?
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/poojas"
            sx={{ fontSize: "1.05rem", px: 6 }}
          >
            Explore Poojas
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}

