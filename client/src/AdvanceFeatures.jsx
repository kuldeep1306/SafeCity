import { Box, Container, Grid, Typography, Card, CardContent } from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";
import MapIcon from "@mui/icons-material/Map";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

export default function AdvancedFeatures() {

  const features = [
    {
      icon: <InsightsIcon fontSize="large" />,
      title: "TODO List App",
        desc: "A clean and responsive task management application that allows users to create, update, and delete tasks efficiently, helping them stay organized and productive.",

      link: "https://kultodo.netlify.app/",
    },
    {
      icon: <MapIcon fontSize="large" />,
      title: "Language Translation Chatbot",
        desc: "An AI-powered chatbot that instantly translates text between multiple languages, enabling seamless communication with real-time responses and an intuitive interface.",

      link: "https://kullang.netlify.app/",
    },
     {
      icon: <MapIcon fontSize="large" />,
      title: "Fitness Tracker App",
      desc: "A smart fitness tracking application that monitors workouts, steps, calories burned, and health metrics, helping users stay consistent, motivated, and achieve their fitness goals through clear insights and progress tracking.",

      link: "https://kulfitness.netlify.app/",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        py: 10,
      }}
    >
      <Container maxWidth="md">

        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Advanced Features
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85 }}>
            Explore our most powerful crime analytics capabilities
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={6} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <MotionCard
                component="a"
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.06, y: -10 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                sx={{
                  height: "100%",
                  textDecoration: "none",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
                  backdropFilter: "blur(14px)",
                  borderRadius: 5,
                  color: "white",
                  cursor: "pointer",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
                }}
              >
                <CardContent>
                  <Box mb={2} color="#ff9800">
                    {feature.icon}
                  </Box>

                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {feature.title}
                  </Typography>

                  <Typography variant="body2" sx={{ opacity: 0.85, mb: 2 }}>
                    {feature.desc}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#ff9800",
                      fontSize: "0.9rem",
                    }}
                  >
                    View Project →
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
