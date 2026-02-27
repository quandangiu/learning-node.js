import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Box,
} from "@mui/material";

const muiComponents = {
  h1: ({ children }) => (
    <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mt: 4 }}>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
      {children}
    </Typography>
  ),
  a: ({ href, children }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box component="ol" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body1" sx={{ mb: 0.5, lineHeight: 1.8 }}>
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: "primary.main",
        pl: 2,
        py: 1,
        my: 2,
        bgcolor: "action.hover",
        borderRadius: 1,
        "& p": { mb: 0 },
      }}
    >
      {children}
    </Box>
  ),
  hr: () => <Divider sx={{ my: 3 }} />,
  table: ({ children }) => (
    <TableContainer component={Paper} sx={{ my: 2 }}>
      <Table size="small">{children}</Table>
    </TableContainer>
  ),
  thead: ({ children }) => <TableHead>{children}</TableHead>,
  tbody: ({ children }) => <TableBody>{children}</TableBody>,
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  th: ({ children }) => (
    <TableCell sx={{ fontWeight: 700 }}>{children}</TableCell>
  ),
  td: ({ children }) => <TableCell>{children}</TableCell>,
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <Box
          component="code"
          sx={{
            bgcolor: "action.selected",
            px: 0.8,
            py: 0.2,
            borderRadius: 0.5,
            fontSize: "0.875em",
            fontFamily: "'Fira Code', 'Consolas', monospace",
          }}
        >
          {children}
        </Box>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <Box
      component="pre"
      sx={{
        borderRadius: 2,
        overflow: "auto",
        my: 2,
        fontSize: "0.9em",
        "& code": {
          fontFamily: "'Fira Code', 'Consolas', monospace",
        },
      }}
    >
      {children}
    </Box>
  ),
};

function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <Box sx={{ maxWidth: 900 }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={muiComponents}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}

export default MarkdownRenderer;
