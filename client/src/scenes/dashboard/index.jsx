// import React from "react";
// import FlexBetween from "components/FlexBetween";
// import Header from "components/Header";
// import {
//   LockOutlined,
//   TrendingUpOutlined,
//   PointOfSaleOutlined,
//   MapOutlined,
//   PublicOutlined,
// } from "@mui/icons-material";
// import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
// import { useSelector } from "react-redux";

// const Dashboard = () => {
//   const theme = useTheme();
//   const currentUser = useSelector((state) => state.global.currentUser);
//   const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

//   const cardStyle = (gradient) => ({
//     background: gradient,
//     color: "white",
//     p: "2rem",
//     borderRadius: "1rem",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
//     transition: "all 0.3s ease",
//     "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.25)" },
//   });

//   return (
//     <Box p="2rem" sx={{ minHeight: "100vh", backgroundColor: "#646b85ff" }}>
//       {/* Header */}
//       <FlexBetween mb="2rem">
//         <Header title="HOME" subtitle="Welcome to your Crime Analyzer Dashboard" />
//         {!currentUser ? (
//           <Button variant="contained" color="primary" startIcon={<LockOutlined />}>
//             Login
//           </Button>
//         ) : (
//           <Button variant="contained" color="primary">
//             Welcome, {currentUser.name || "User"}
//           </Button>
//         )}
//       </FlexBetween>

//       {/* Grid Cards */}
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//         gridAutoRows="minmax(250px, auto)"
//         gap="30px"
//         sx={{
//           "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
//         }}
//       >
//         {/* Crime Analysis */}
//         <Box gridColumn="span 6" sx={cardStyle("linear-gradient(135deg, #1e3c72, #2a5298)")}>
//           <Typography variant="h3" mb={2}>
//             Crime Analysis
//           </Typography>
//           <Typography fontSize="1.1rem">
//             Monitor trends, recurring incidents, and crime patterns. Data-driven insights help authorities plan better for safer communities.
//           </Typography>
//           <TrendingUpOutlined sx={{ fontSize: 80, opacity: 0.7, mt: 3, alignSelf: "center" }} />
//         </Box>

//         {/* Data Collection */}
//         <Box gridColumn="span 6" sx={cardStyle("linear-gradient(135deg, #11998e, #38ef7d)")}>
//           <Typography variant="h3" mb={2}>
//             Data Collection
//           </Typography>
//           <Typography fontSize="1.1rem">
//             Gather information from service calls, reports, and arrests. Centralized data ensures accurate analysis and actionable insights.
//           </Typography>
//           <PointOfSaleOutlined sx={{ fontSize: 80, opacity: 0.7, mt: 3, alignSelf: "center" }} />
//         </Box>

//         {/* Crime Mapping */}
//         <Box gridColumn="span 6" sx={cardStyle("linear-gradient(135deg, #ff512f, #dd2476)")}>
//           <Typography variant="h3" mb={2}>
//             Crime Mapping
//           </Typography>
//           <Typography fontSize="1.1rem">
//             Visualize high-crime zones and hotspots. Plan interventions, monitor risk areas, and allocate resources efficiently.
//           </Typography>
//           <MapOutlined sx={{ fontSize: 80, opacity: 0.7, mt: 3, alignSelf: "center" }} />
//         </Box>

//         {/* Analytics */}
//         <Box gridColumn="span 6" sx={cardStyle("linear-gradient(135deg, #654ea3, #eaafc8)")}>
//           <Typography variant="h3" mb={2}>
//             Analytics
//           </Typography>
//           <Typography fontSize="1.1rem">
//             Gain insights on crime patterns and recurring incidents. Make informed decisions to prevent crimes and improve public safety.
//           </Typography>
//           <TrendingUpOutlined sx={{ fontSize: 80, opacity: 0.7, mt: 3, alignSelf: "center" }} />
//         </Box>

//         {/* Upcoming Features */}
//         <Box gridColumn="span 12" sx={cardStyle("linear-gradient(135deg, #99656eff, #d49e7fff)")}>
//           <Typography variant="h3" mb={2}>
//             Upcoming Features
//           </Typography>
//           <Typography fontSize="1.1rem">
//             AI-powered crime predictions, real-time alerts, and automated trend detection are coming soon to make crime prevention smarter and faster.
//           </Typography>
//           <PublicOutlined sx={{ fontSize: 80, opacity: 0.7, mt: 3, alignSelf: "center" }} />
//         </Box>
//       </Box>

//       {/* Call to Action */}
//       <Box mt={6} textAlign="center">
//         <Typography variant="h4" fontWeight="bold" mb={2}>
//           Ready to Improve Public Safety?
//         </Typography>

//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;




import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  LockOutlined,
  TrendingUpOutlined,
  PointOfSaleOutlined,
  MapOutlined,
  PublicOutlined,
  SecurityOutlined,
  AnalyticsOutlined,
  NotificationsOutlined,
  ArrowForwardOutlined,
  CheckCircleOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
  Avatar,
  keyframes,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


// Define keyframes for animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;



const Dashboard = () => {
  const theme = useTheme();
  const currentUser = useSelector((state) => state.global.currentUser);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isSmallScreens = useMediaQuery("(max-width: 600px)");
{/* Hero Section */}
<Box
  sx={{
    background: theme.palette.mode === 'dark' 
      ? "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)" 
      : "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)",
    color: "white",
    py: { xs: 8, md: 12 },
    textAlign: "center",
    animation: `${fadeInUp} 1.5s ease-out`,
  }}
>
  <Container maxWidth="md">
    <Typography
      variant="h2"
      fontWeight="bold"
      mb={2}
      sx={{ animation: `${slideInLeft} 2s ease-out` }}
    >
      Advanced Crime Analysis for Safer Communities
    </Typography>

    <Typography
      variant="h5"
      mb={4}
      sx={{
        opacity: 0.9,
        animation: `${slideInRight} 2.5s ease-out`,
      }}
    >
      Leverage data-driven insights to prevent crime, optimize resources,
      and enhance public safety with our comprehensive analytics platform.
    </Typography>

    {/* Advanced Features Button */}
    <Button
      variant="contained"
      size="large"
      onClick={() => navigate("/features")}
      sx={{
        px: 5,
        py: 1.5,
        fontSize: "1rem",
        fontWeight: "bold",
        borderRadius: "30px",
        background: "linear-gradient(135deg, #ff9800, #ff5722)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        textTransform: "none",
        animation: `${fadeInUp} 3s ease-out`,
        "&:hover": {
          background: "linear-gradient(135deg, #ffa726, #f4511e)",
          transform: "translateY(-3px)",
        },
      }}
    >
      Explore Advanced Features →
    </Button>
  </Container>
</Box>
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default, overflowX: "hidden" }}>
      {/* Header */}
      <Box
  sx={{
    background: "linear-gradient(135deg, #283e51 0%, #3d6ea3ff 100%)",  // dark blue gradient
    // backgroundColor: "#2c2f4a",   // ya ek solid dark purple color bhi try kar sakte hain
    boxShadow: "0 2px 10px  rgba(0, 0, 0, 0.6)",  // thoda soft shadow, color match kiya hai
    position: "sticky",
    top: 0,
    zIndex: 100,
    animation: `${fadeIn} 1s ease-out`,
  }}
>

        <Container maxWidth="lg">
          <FlexBetween py={2}>
            <Header title="Crime Analyzer" subtitle="" />
            {currentUser && (
              <Button
  variant="contained"
  sx={{
    borderRadius: "12px",
    px: 3.5,
    py: 1.2,
    fontWeight: "600",
    fontSize: "0.95rem",
    textTransform: "none",
    color: "#fff",
    background: "linear-gradient(135deg, #3f51b5, #2196f3)",
    boxShadow: "0 8px 25px rgba(33, 150, 243, 0.35)",
    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 12px 35px rgba(33, 150, 243, 0.55)",
      background: "linear-gradient(135deg, #5c6bc0, #42a5f5)",
    },
  }}
>
  Welcome, {currentUser.name || "User"}
</Button>

            )}
          </FlexBetween>
        </Container>
      </Box>


<Box
  sx={{
    background: theme.palette.mode === 'dark' 
      ? "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)" 
      : "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)",
    color: "white",
    py: { xs: 8, md: 12 },
    textAlign: "center",
    animation: `${fadeInUp} 1.5s ease-out`,
  }}
>
  <Container maxWidth="md">
   <Typography
  variant="h2"
  fontWeight="bold"
  mb={2}
  sx={{ animation: `${slideInLeft} 2s ease-out` }}
>
  Empowering Public Safety Through Smart Technology
</Typography>

<Typography
  variant="h5"
  mb={4}
  sx={{
    opacity: 0.9,
    animation: `${slideInRight} 2.5s ease-out`,
  }}
>
  Helping communities stay safe by providing real-time alerts, crime awareness,
  intelligent insights, and easy-to-use tools that support citizens, authorities,
  and emergency response teams.
</Typography>


    {/* Advanced Features Button */}
    <Button
      variant="contained"
      size="large"
      onClick={() => navigate("/features")}
      sx={{
        px: 5,
        py: 1.5,
        fontSize: "1rem",
        fontWeight: "bold",
        borderRadius: "30px",
        background: "linear-gradient(135deg, #ff9800, #ff5722)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        textTransform: "none",
        animation: `${fadeInUp} 3s ease-out`,
        "&:hover": {
          background: "linear-gradient(135deg, #ffa726, #f4511e)",
          transform: "translateY(-3px)",
        },
      }}
    >
      Explore Advanced Features →
    </Button>
  </Container>
</Box>


      {/* Key Features Section */}
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
          animation: `${fadeInUp} 1s ease-out 0.5s both`,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          mb={6}
          color="primary"
          sx={{
            animation: `${fadeIn} 1s ease-out 0.7s both`,
          }}
        >
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: <TrendingUpOutlined sx={{ fontSize: 32, color: "white" }} />,
              title: "Crime Analysis",
              desc: "Monitor crime trends and patterns with advanced analytics to inform strategic planning and resource allocation.",
              color: "primary.main",
              delay: "0.8s",
            },
            {
              icon: <PointOfSaleOutlined sx={{ fontSize: 32, color: "white" }} />,
              title: "Data Collection",
              desc: "Centralize data from reports, arrests, and service calls for accurate, real-time insights and decision-making.",
              color: "secondary.main",
              delay: "1s",
            },
            {
              icon: <MapOutlined sx={{ fontSize: 32, color: "white" }} />,
              title: "Crime Mapping",
              desc: "Visualize crime hotspots and risk areas to prioritize interventions and optimize patrol strategies.",
              color: "success.main",
              delay: "1.2s",
            },
            {
              icon: <AnalyticsOutlined sx={{ fontSize: 32, color: "white" }} />,
              title: "Advanced Analytics",
              desc: "Uncover deep insights into crime patterns to drive proactive prevention and improve community safety.",
              color: "warning.main",
              delay: "1.4s",
            },
            {
              icon: <NotificationsOutlined sx={{ fontSize: 32, color: "white" }} />,
              title: "Real-Time Alerts",
              desc: "Receive instant notifications on emerging threats and trends to respond swiftly and effectively.",
              color: "info.main",
              delay: "1.6s",
            },
            {
              icon: <SecurityOutlined sx={{ fontSize: 32, color: "white" }} />,
              title: "Predictive Modeling",
              desc: "Use AI-driven predictions to anticipate crime hotspots and deploy resources preemptively.",
              color: "error.main",
              delay: "1.8s",
            },
          ].map((feature, index) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={index}
              sx={{
                animation: `${fadeInUp} 1s ease-out ${feature.delay} both`,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  backgroundColor: theme.palette.background.paper,
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: feature.color,
                      width: 64,
                      height: 64,
                      mx: "auto",
                      mb: 2,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "rotate(10deg)" },
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" mb={2} color={theme.palette.text.primary}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color={theme.palette.text.secondary}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : "#f1f3f4",
          py: 8,
          animation: `${fadeInUp} 1s ease-out 2s both`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            mb={6}
            color="primary"
            sx={{
              animation: `${fadeIn} 1s ease-out 2.2s both`,
            }}
          >
            Why Choose Crime Analyzer?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <CheckCircleOutlined sx={{ fontSize: 48, color: "success.main" }} />,
                title: "Data Accuracy",
                desc: "Ensure reliable data collection and analysis for informed decision-making.",
                delay: "2.4s",
              },
              {
                icon: <CheckCircleOutlined sx={{ fontSize: 48, color: "success.main" }} />,
                title: "Scalable Solutions",
                desc: "Adapt to growing needs with flexible, enterprise-grade tools.",
                delay: "2.6s",
              },
              {
                icon: <CheckCircleOutlined sx={{ fontSize: 48, color: "success.main" }} />,
                title: "User-Friendly Interface",
                desc: "Intuitive design for quick adoption and efficient workflow.",
                delay: "2.8s",
              },
            ].map((item, index) => (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                sx={{
                  animation: `${fadeInUp} 1s ease-out ${item.delay} both`,
                }}
              >
                <Box textAlign="center">
                  <Box sx={{ transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.1)" } }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" mb={1} mt={2} color={theme.palette.text.primary}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color={theme.palette.text.secondary}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark' 
            ? "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)" 
            : "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
          animation: `${fadeInUp} 1s ease-out 3s both`,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{
              animation: `${slideInLeft} 1s ease-out 3.2s both`,
            }}
          >
            Ready to Enhance Public Safety?
          </Typography>
          <Typography
            variant="h6"
            mb={4}
            sx={{
              opacity: 0.9,
              animation: `${slideInRight} 1s ease-out 3.4s both`,
            }}
          >
            Join leading agencies in using data to create safer communities. Start your free trial today.
          </Typography>
        
        </Container>
      </Box>

     
    </Box>
  );
};

export default Dashboard;