import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  PlayArrow,
  RestartAlt,
  ContentCopy,
  Terminal,
} from "@mui/icons-material";

function CodePlayground({ initialCode = "// Viết code ở đây\nconsole.log('Hello Node.js!');\n", height = 300 }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);

    const logs = [];
    const fakeConsole = {
      log: (...args) =>
        logs.push({ type: "log", text: args.map(String).join(" ") }),
      error: (...args) =>
        logs.push({ type: "error", text: args.map(String).join(" ") }),
      warn: (...args) =>
        logs.push({ type: "warn", text: args.map(String).join(" ") }),
      info: (...args) =>
        logs.push({ type: "info", text: args.map(String).join(" ") }),
    };

    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function("console", code);
      fn(fakeConsole);
      if (logs.length === 0) {
        logs.push({ type: "info", text: "(Không có output)" });
      }
    } catch (err) {
      logs.push({ type: "error", text: `❌ ${err.message}` });
    }

    setOutput(logs);
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const getColor = (type) => {
    switch (type) {
      case "error":
        return "error.main";
      case "warn":
        return "warning.main";
      case "info":
        return "info.main";
      default:
        return "text.primary";
    }
  };

  return (
    <Paper elevation={3} sx={{ my: 3, overflow: "hidden", borderRadius: 2 }}>
      {/* Toolbar */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{ px: 2, py: 1, bgcolor: "grey.900" }}
      >
        <Chip
          icon={<Terminal />}
          label="JavaScript Playground"
          size="small"
          color="success"
          variant="outlined"
          sx={{ color: "grey.300" }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Copy code">
          <IconButton size="small" onClick={copyCode} sx={{ color: "grey.400" }}>
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset">
          <IconButton size="small" onClick={resetCode} sx={{ color: "grey.400" }}>
            <RestartAlt fontSize="small" />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          color="success"
          size="small"
          startIcon={<PlayArrow />}
          onClick={runCode}
          disabled={isRunning}
          sx={{ ml: 1 }}
        >
          Chạy
        </Button>
      </Stack>

      {/* Editor */}
      <Editor
        height={height}
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value || "")}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Fira Code', 'Consolas', monospace",
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          tabSize: 2,
          automaticLayout: true,
          wordWrap: "on",
        }}
      />

      {/* Output */}
      {output.length > 0 && (
        <Box
          sx={{
            bgcolor: "grey.900",
            px: 2,
            py: 1.5,
            borderTop: "1px solid",
            borderColor: "grey.800",
            maxHeight: 200,
            overflow: "auto",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "grey.500", mb: 1, display: "block" }}
          >
            Output:
          </Typography>
          {output.map((line, i) => (
            <Typography
              key={i}
              variant="body2"
              sx={{
                color: getColor(line.type),
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.85em",
                whiteSpace: "pre-wrap",
              }}
            >
              {line.text}
            </Typography>
          ))}
        </Box>
      )}
    </Paper>
  );
}

export default CodePlayground;
