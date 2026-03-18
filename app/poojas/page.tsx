"use client";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const poojas = [
  {
    id: "navratri",
    title: "नवरात्रि पूजा (Navratri Pooja)",
    subtitle: "9 Days of Divine Worship",
    description: "Complete Navratri celebrations with Maa Durga's blessings for prosperity and protection.",
    duration: "9 Days",
    price: "₹5,100",
    benefits: "Protection, Prosperity, Spiritual Awakening",
    image: "/diya.svg", // Placeholder - add to public
  },
  {
    id: "durga",
    title: "दुर्गा पूजा (Durga Pooja)",
    subtitle: "Victory over Evil",
    description: "Powerful Durga Pooja to remove obstacles and grant strength.",
    duration: "2 Hours",
    price: "₹2,500",
    benefits: "Obstacle Removal, Courage, Success",
    image: "/temple-bell.svg",
  },
  {
    id: "lakshmi",
    title: "लक्ष्मी पूजा (Lakshmi Pooja)",
    subtitle: "Goddess of Wealth",
    description: "Attract abundance and financial prosperity with Lakshmi blessings.",
    duration: "1.5 Hours",
    price: "₹1,800",
    benefits: "Wealth, Harmony, Business Growth",
    image: "/lotus.svg",
  },
  {
    id: "saraswati",
    title: "सरस्वती पूजा (Saraswati Pooja)",
    subtitle: "Goddess of Knowledge",
    description: "Blessings for education, wisdom and creative arts.",
    duration: "1 Hour",
    price: "₹1,200",
    benefits: "Knowledge, Creativity, Academic Success",
    image: "/book.svg",
  },
  {
    id: "ganesh",
    title: "गणेश पूजा (Ganesh Pooja)",
    subtitle: "Remover of Obstacles",
    description: "Begin any auspicious work with Lord Ganesha's approval.",
    duration: "45 Min",
    price: "₹900",
    benefits: "New Beginnings, Success in Ventures",
    image: "/ganesh.svg",
  },
  {
    id: "special",
    title: "विशेष पूजा (Special Pooja)",
    subtitle: "Custom Requirements",
    description: "Personalized pooja for marriage, health, career or family issues.",
    duration: "Custom",
    price: "Contact Us",
    benefits: "Tailored Blessings",
    image: "/custom.svg",
  },
];

export default function PoojasPage() {
  const router = useRouter();

  const handleBook = (poojaId: string) => {
    // Store pooja selection in localStorage/session, redirect to date picker
    sessionStorage.setItem("selectedPooja", poojaId);
    router.push("/");
  };

  return (
    <Container maxWidth="lg" className="divine-hero section-padding">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Box sx={{ textAlign: "center", mb: 12, px: { xs: 2, md: 0 } }}>
          <Typography
            className="heading-1"
            gutterBottom
            component="h1"
            sx={{
              background: "linear-gradient(45deg, var(--saffron), var(--gold))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.025em",
              mb: 4
            }}
          >
            🛕 पूजा सेवाएँ | Pooja Services
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{
              mb: 8,
              fontWeight: 300,
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.5,
              fontSize: { xs: '1.5rem', md: '1.875rem', lg: '2.25rem' }
            }}
          >
            Choose from our sacred rituals blessed by experienced priests
            <br />
            <span style={{ color: 'var(--temple-red)', fontFamily: "'Noto Sans Devanagari', serif" }}>
              <em>"जय माता दी" 🙏</em>
            </span>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {poojas.map((pooja, index) => (
            <Grid xs={12} sm={6} md={4} key={pooja.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 30px rgba(255, 153, 51, 0.2)",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 40px rgba(255, 215, 0, 0.4)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={pooja.image || "/placeholder-temple.jpg"}
                    alt={pooja.title}
                    sx={{ background: "linear-gradient(45deg, var(--saffron), var(--maroon))", objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h3" fontWeight="bold" color="primary.main">
                      {pooja.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {pooja.subtitle}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {pooja.description}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                      <Chip icon={<AccessTimeIcon fontSize="small" />} label={pooja.duration} variant="outlined" color="primary" />
                      <Chip icon={<AttachMoneyIcon fontSize="small" />} label={pooja.price} color="secondary" />
                    </Box>
                    <Typography variant="body2" color="success.main" fontWeight="medium">
                      Benefits: {pooja.benefits}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 3, py: 1.5 }}
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => handleBook(pooja.id)}
                    >
                      Book Now शुभ लाभ
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontFamily: "'Noto Sans Devanagari'" }}>
            Can't find what you need? Contact us for custom poojas.
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
}

