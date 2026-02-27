import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import lessons from "../data/lessons";

const STORAGE_KEY = "nodejs-learning-progress";

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function ProgressTracker({ lessonId }) {
  const [progress, setProgress] = useState(getProgress);

  useEffect(() => {
    setProgress(getProgress());
  }, [lessonId]);

  const isCompleted = progress[lessonId] === true;

  const toggleComplete = () => {
    const updated = { ...progress, [lessonId]: !isCompleted };
    saveProgress(updated);
    setProgress(updated);
  };

  const completedCount = lessons.filter((l) => progress[l.id]).length;
  const totalLessons = lessons.length;
  const percent = Math.round((completedCount / totalLessons) * 100);

  return (
    <Box sx={{ my: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Tiến độ: {completedCount}/{totalLessons} bài ({percent}%)
        </Typography>
        <LinearProgress
          variant="determinate"
          value={percent}
          sx={{ flex: 1, height: 8, borderRadius: 4 }}
          color="success"
        />
      </Stack>

      <Button
        variant={isCompleted ? "outlined" : "contained"}
        color={isCompleted ? "success" : "primary"}
        startIcon={isCompleted ? <CheckCircle /> : <RadioButtonUnchecked />}
        onClick={toggleComplete}
        size="small"
      >
        {isCompleted ? "Đã hoàn thành ✓" : "Đánh dấu hoàn thành"}
      </Button>

      {isCompleted && (
        <Chip
          label="Hoàn thành"
          color="success"
          size="small"
          sx={{ ml: 1 }}
        />
      )}
    </Box>
  );
}

export default ProgressTracker;
export { getProgress, saveProgress, STORAGE_KEY };
