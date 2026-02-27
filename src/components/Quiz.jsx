import { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Alert,
  Paper,
  Chip,
  Stack,
  LinearProgress,
  Collapse,
} from "@mui/material";
import { Quiz as QuizIcon, CheckCircle, Cancel } from "@mui/icons-material";

function Quiz({ questions = [] }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState({});

  if (!questions || questions.length === 0) return null;

  const handleSelect = (qIndex, value) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: parseInt(value) }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowExplanation({});
  };

  const toggleExplanation = (qIndex) => {
    setShowExplanation((prev) => ({ ...prev, [qIndex]: !prev[qIndex] }));
  };

  const correctCount = questions.reduce((count, q, i) => {
    return count + (answers[i] === q.answer ? 1 : 0);
  }, 0);

  const allAnswered = Object.keys(answers).length === questions.length;
  const score = Math.round((correctCount / questions.length) * 100);

  return (
    <Paper elevation={2} sx={{ p: 3, my: 3, borderRadius: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <QuizIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Quiz kiểm tra
        </Typography>
        <Chip
          label={`${questions.length} câu hỏi`}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Stack>

      {submitted && (
        <Box sx={{ mb: 3 }}>
          <Alert
            severity={score >= 70 ? "success" : score >= 40 ? "warning" : "error"}
            sx={{ mb: 1 }}
          >
            Kết quả: {correctCount}/{questions.length} đúng ({score}%)
            {score >= 70
              ? " — Tuyệt vời! 🎉"
              : score >= 40
              ? " — Khá tốt, cố gắng thêm! 💪"
              : " — Cần ôn lại bài! 📖"}
          </Alert>
          <LinearProgress
            variant="determinate"
            value={score}
            color={score >= 70 ? "success" : score >= 40 ? "warning" : "error"}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      )}

      {questions.map((q, qIndex) => {
        const isCorrect = submitted && answers[qIndex] === q.answer;
        const isWrong = submitted && answers[qIndex] !== q.answer;

        return (
          <Box
            key={qIndex}
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 1,
              border: 1,
              borderColor: submitted
                ? isCorrect
                  ? "success.main"
                  : isWrong
                  ? "error.main"
                  : "divider"
                : "divider",
              bgcolor: submitted
                ? isCorrect
                  ? "success.50"
                  : isWrong
                  ? "error.50"
                  : "transparent"
                : "transparent",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <Chip
                label={`${qIndex + 1}`}
                size="small"
                color="primary"
                sx={{ mt: 0.3 }}
              />
              <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
                {q.question}
                {submitted && (
                  isCorrect ? (
                    <CheckCircle
                      color="success"
                      sx={{ ml: 1, fontSize: 20, verticalAlign: "middle" }}
                    />
                  ) : (
                    <Cancel
                      color="error"
                      sx={{ ml: 1, fontSize: 20, verticalAlign: "middle" }}
                    />
                  )
                )}
              </Typography>
            </Stack>

            <RadioGroup
              value={answers[qIndex] !== undefined ? answers[qIndex] : ""}
              onChange={(e) => handleSelect(qIndex, e.target.value)}
              sx={{ ml: 4, mt: 1 }}
            >
              {q.options.map((opt, oIndex) => (
                <FormControlLabel
                  key={oIndex}
                  value={oIndex}
                  control={<Radio size="small" />}
                  label={opt}
                  disabled={submitted}
                  sx={{
                    ...(submitted &&
                      opt === q.answer && {
                        color: "success.main",
                        fontWeight: 600,
                      }),
                  }}
                />
              ))}
            </RadioGroup>

            {submitted && q.explanation && (
              <>
                <Button
                  size="small"
                  onClick={() => toggleExplanation(qIndex)}
                  sx={{ ml: 4, mt: 0.5 }}
                >
                  {showExplanation[qIndex] ? "Ẩn giải thích" : "Xem giải thích"}
                </Button>
                <Collapse in={showExplanation[qIndex]}>
                  <Alert severity="info" sx={{ ml: 4, mt: 1 }}>
                    {q.explanation}
                  </Alert>
                </Collapse>
              </>
            )}
          </Box>
        );
      })}

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!allAnswered || submitted}
        >
          Nộp bài
        </Button>
        {submitted && (
          <Button variant="outlined" onClick={handleReset}>
            Làm lại
          </Button>
        )}
      </Stack>
    </Paper>
  );
}

export default Quiz;
