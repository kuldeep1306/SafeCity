import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { keyframes } from "@mui/system";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CaseStats = () => {
  const [stats, setStats] = useState({ total: 0, solved: 0, pending: 0 });
  const crimes = useSelector((state) => state.global.crimeDatas);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:9000/client/case-stats");
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (err) {
      console.error("Failed to fetch case stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [crimes]);

  const solvedPercent = stats.total ? (stats.solved / stats.total) * 100 : 0;

  const cardStyle = {
    flex: 1,
    borderRadius: "16px",
    color: "#fff",
    animation: `${fadeInUp} 0.8s ease`,
    transition: "all 0.35s ease",
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
    },
  };

  return (
    <Box display="flex" gap={3} flexWrap="wrap">
      
      {/* Solved */}
      <Card
        sx={{
          ...cardStyle,
          background: "linear-gradient(135deg, #43cea2, #185a9d)",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ opacity: 0.85 }}>
            Solved Cases
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            {stats.solved}
          </Typography>
        </CardContent>
      </Card>

      {/* Pending */}
      <Card
        sx={{
          ...cardStyle,
          background: "linear-gradient(135deg, #ff512f, #dd2476)",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ opacity: 0.85 }}>
            Pending Cases
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            {stats.pending}
          </Typography>
        </CardContent>
      </Card>

      {/* Total */}
      <Card
        sx={{
          ...cardStyle,
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ opacity: 0.85 }}>
            Total Cases
          </Typography>

          <Typography variant="h3" fontWeight="bold">
            {stats.total}
          </Typography>

          <Box mt={2}>
            <LinearProgress
              variant="determinate"
              value={solvedPercent}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.25)",
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(90deg, #00f260, #0575e6)",
                  borderRadius: 5,
                },
              }}
            />
            <Typography variant="body2" mt={1} sx={{ opacity: 0.9 }}>
              {solvedPercent.toFixed(1)}% cases solved
            </Typography>
          </Box>
        </CardContent>
      </Card>

    </Box>
  );
};

export default CaseStats;
  