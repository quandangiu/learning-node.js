import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  AccessTime,
} from "@mui/icons-material";
import matter from "gray-matter";
import MarkdownRenderer from "../components/MarkdownRenderer";
import CodePlayground from "../components/CodePlayground";
import Quiz from "../components/Quiz";
import ExerciseBlock from "../components/ExerciseBlock";
import ProgressTracker from "../components/ProgressTracker";
import lessons from "../data/lessons";

function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lessonId = parseInt(id);
  const lesson = lessons.find((l) => l.id === lessonId);
  const currentIndex = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  useEffect(() => {
    if (!lesson) {
      setError("Không tìm thấy bài học");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/lessons/${lesson.file}`)
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải bài học");
        return res.text();
      })
      .then((text) => {
        const { data, content: md } = matter(text);
        setMetadata(data);
        setContent(md);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [lessonId, lesson]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/")}>
          Về trang chủ
        </Button>
      </Box>
    );
  }

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
    <Box sx={{ maxWidth: 960, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }} flexWrap="wrap">
          <Chip label={`Bài ${lessonId}`} color="primary" size="small" />
          <Chip
            label={lesson?.difficulty || metadata.difficulty}
            color={difficultyColor(lesson?.difficulty || metadata.difficulty)}
            size="small"
          />
          {lesson?.tags?.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>

        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
          {metadata.title || lesson?.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {metadata.description || lesson?.description}
        </Typography>
      </Box>

      {/* Progress */}
      <ProgressTracker lessonId={lessonId} />

      <Divider sx={{ my: 3 }} />

      {/* Markdown Content */}
      <MarkdownRenderer content={content} />

      {/* Code Playground */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        🖥️ Code Playground
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Thử viết code JavaScript ngay tại đây (chạy trong trình duyệt, hỗ trợ console.log):
      </Typography>
      <CodePlayground />

      {/* Exercises */}
      {lesson?.exercises?.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            📝 Bài tập thực hành
          </Typography>
          {lesson.exercises.map((ex, i) => (
            <ExerciseBlock key={i} exercise={ex} index={i + 1} />
          ))}
        </>
      )}

      {/* Quiz */}
      {lesson?.quiz?.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Quiz questions={lesson.quiz} />
        </>
      )}

      {/* Navigation */}
      <Divider sx={{ my: 4 }} />
      <Stack direction="row" justifyContent="space-between">
        {prevLesson ? (
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(`/lesson/${prevLesson.id}`)}
          >
            Bài {prevLesson.id}: {prevLesson.title}
          </Button>
        ) : (
          <Box />
        )}
        {nextLesson ? (
          <Button
            endIcon={<ArrowForward />}
            onClick={() => navigate(`/lesson/${nextLesson.id}`)}
          >
            Bài {nextLesson.id}: {nextLesson.title}
          </Button>
        ) : (
          <Button onClick={() => navigate("/")}>Về trang chủ</Button>
        )}
      </Stack>
    </Box>
  );
}

export default LessonPage;
