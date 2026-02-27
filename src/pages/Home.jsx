import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Stack,
  LinearProgress,
  Paper,
  Divider,
} from "@mui/material";
import {
  School,
  Code,
  Timer,
  TrendingUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import lessons, { groupByChapter } from "../data/lessons";
import { getProgress } from "../components/ProgressTracker";

function Home() {
  const navigate = useNavigate();
  const progress = getProgress();
  const chapters = groupByChapter(lessons);

  const completedCount = lessons.filter((l) => progress[l.id]).length;
  const percent = Math.round((completedCount / lessons.length) * 100);

  const stats = [
    { icon: <School />, label: "Bài học", value: lessons.length },
    {
      icon: <Code />,
      label: "Bài tập",
      value: lessons.reduce((s, l) => s + (l.exercises?.length || 0), 0),
    },
    {
      icon: <Timer />,
      label: "Hoàn thành",
      value: `${completedCount}/${lessons.length}`,
    },
    { icon: <TrendingUp />, label: "Tiến độ", value: `${percent}%` },
  ];

  const difficultyColor = (d) => {
    switch (d) {
      case "Newbie":
      case "Cơ bản":
        return "success";
      case "Intermediate":
      case "Trung bình":
        return "warning";
      case "Senior":
      case "Nâng cao":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #1b5e20 0%, #388e3c 50%, #66bb6a 100%)",
          color: "white",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
          🟢 Node.js Learning
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
          Học Node.js từ cơ bản đến nâng cao — Hiểu cơ chế & Thực hành thực tế
        </Typography>

        {/* Progress bar */}
        <Box sx={{ maxWidth: 400 }}>
          <Typography variant="body2" sx={{ mb: 0.5, opacity: 0.8 }}>
            Tiến độ: {completedCount}/{lessons.length} bài
          </Typography>
          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: "rgba(255,255,255,0.3)",
              "& .MuiLinearProgress-bar": { bgcolor: "white" },
            }}
          />
        </Box>
      </Paper>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((s, i) => (
          <Grid size={{ xs: 6, md: 3 }} key={i}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
              <Box sx={{ color: "primary.main", mb: 1 }}>{s.icon}</Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {s.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {s.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* Chapters */}
      {Object.entries(chapters).map(([chapter, chapterLessons]) => (
        <Box key={chapter} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            {chapter}
          </Typography>
          <Grid container spacing={2}>
            {chapterLessons.map((lesson) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={lesson.id}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    border: progress[lesson.id]
                      ? "2px solid"
                      : "1px solid",
                    borderColor: progress[lesson.id]
                      ? "success.main"
                      : "divider",
                    opacity: progress[lesson.id] ? 0.85 : 1,
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/lesson/${lesson.id}`)}
                    sx={{ height: "100%" }}
                  >
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <Chip
                          label={`Bài ${lesson.id}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={lesson.difficulty}
                          size="small"
                          color={difficultyColor(lesson.difficulty)}
                        />
                      </Stack>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          textDecoration: progress[lesson.id]
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {lesson.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {lesson.description}
                      </Typography>
                      {progress[lesson.id] && (
                        <Chip
                          label="✓ Đã hoàn thành"
                          size="small"
                          color="success"
                          sx={{ mt: 1 }}
                        />
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default Home;
