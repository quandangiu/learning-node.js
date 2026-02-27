import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Stack,
  Collapse,
  Alert,
} from "@mui/material";
import {
  Code,
  Visibility,
  VisibilityOff,
  Lightbulb,
} from "@mui/icons-material";
import CodePlayground from "./CodePlayground";

function ExerciseBlock({ exercise, index }) {
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  if (!exercise) return null;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        my: 3,
        borderRadius: 2,
        borderLeft: 4,
        borderColor: "secondary.main",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Code color="secondary" />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Bài tập {index}: {exercise.title}
        </Typography>
        <Chip
          label={exercise.difficulty || "Cơ bản"}
          size="small"
          color="secondary"
          variant="outlined"
        />
      </Stack>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {exercise.description}
      </Typography>

      {exercise.requirements && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Yêu cầu:
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            {exercise.requirements.map((req, i) => (
              <Typography component="li" key={i} variant="body2" sx={{ mb: 0.5 }}>
                {req}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      {exercise.expectedOutput && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Output mong đợi:</strong> {exercise.expectedOutput}
          </Typography>
        </Alert>
      )}

      <CodePlayground
        initialCode={exercise.starterCode || "// Viết code ở đây\n"}
        height={250}
      />

      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        {exercise.hint && (
          <Button
            size="small"
            variant="outlined"
            color="warning"
            startIcon={<Lightbulb />}
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? "Ẩn gợi ý" : "Gợi ý"}
          </Button>
        )}
        <Button
          size="small"
          variant="outlined"
          color="success"
          startIcon={showSolution ? <VisibilityOff /> : <Visibility />}
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? "Ẩn lời giải" : "Xem lời giải"}
        </Button>
      </Stack>

      {exercise.hint && (
        <Collapse in={showHint}>
          <Alert severity="warning" sx={{ mt: 1 }}>
            💡 {exercise.hint}
          </Alert>
        </Collapse>
      )}

      <Collapse in={showSolution}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Lời giải tham khảo:
          </Typography>
          <CodePlayground
            initialCode={exercise.solutionCode || "// Chưa có lời giải"}
            height={200}
          />
        </Box>
      </Collapse>
    </Paper>
  );
}

export default ExerciseBlock;
