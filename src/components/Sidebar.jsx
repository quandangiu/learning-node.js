import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Collapse,
  Box,
  Chip,
} from "@mui/material";
import {
  MenuBook,
  Article,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";
import lessons, { groupByChapter } from "../data/lessons";

export const DRAWER_WIDTH = 280;

function Sidebar({ mobileOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openChapters, setOpenChapters] = useState({});
  const chapters = groupByChapter(lessons);

  const handleToggle = (chapter) => {
    setOpenChapters((prev) => ({ ...prev, [chapter]: !prev[chapter] }));
  };

  const handleLessonClick = (lesson) => {
    navigate(`/lesson/${lesson.id}`);
    if (onClose) onClose();
  };

  const difficultyColor = (diff) => {
    switch (diff) {
      case "Newbie":
        return "success";
      case "Intermediate":
        return "warning";
      case "Senior":
        return "error";
      default:
        return "default";
    }
  };

  const drawerContent = (
    <Box>
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          📚 Lộ trình học
        </Typography>
      </Box>
      <Divider />
      <List>
        {Object.entries(chapters).map(([chapterName, chapterLessons]) => (
          <Box key={chapterName}>
            <ListItemButton onClick={() => handleToggle(chapterName)}>
              <ListItemIcon>
                <MenuBook color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={chapterName}
                primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
              />
              {openChapters[chapterName] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openChapters[chapterName]} timeout="auto">
              <List disablePadding>
                {chapterLessons.map((lesson) => (
                  <ListItemButton
                    key={lesson.id}
                    sx={{ pl: 4 }}
                    onClick={() => handleLessonClick(lesson)}
                    selected={location.pathname === `/lesson/${lesson.id}`}
                  >
                    <ListItemIcon>
                      <Article fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Bài ${lesson.id}: ${lesson.title}`}
                      primaryTypographyProps={{ fontSize: 13 }}
                    />
                    <Chip
                      label={lesson.difficulty}
                      size="small"
                      color={difficultyColor(lesson.difficulty)}
                      sx={{ fontSize: 10, height: 20 }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Sidebar;
