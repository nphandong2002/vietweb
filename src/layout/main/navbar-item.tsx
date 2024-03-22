"use client";

import {
  Badge,
  Box,
  Stack,
  badgeClasses,
  Link,
  useTheme,
  alpha,
} from "@mui/material";
import { NavbarItemType } from "./types";
import { RouterLink } from "@/router/components";
import { useActiveLink } from "@/router/hooks";

function NavbarItem({ icon, title, onClick = () => {}, path }: NavbarItemType) {
  const externalLink = path && path.includes("http");
  const active = path && useActiveLink(path, false);

  const theme = useTheme();
  const activeStyles = {
    color:
      theme.palette.mode === "light"
        ? theme.palette.primary.main
        : theme.palette.primary.light,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  };
  const renderContent = (
    <Badge
      color="error"
      variant="dot"
      invisible={true}
      sx={{
        width: 1,
        [`& .${badgeClasses.badge}`]: {
          top: 8,
          right: 8,
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          padding: "12px 10px",
          borderRadius: "12px",
          justifyContent: { xs: "center", md: "start" },
          alignItems: { xs: "center", md: "start" },
          flexShrink: 0,
          cursor: "pointer",
          width: 1,
          color: theme.palette.text.primary,

          ...(active && activeStyles),
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
          },
        }}
      >
        <Box sx={{ flexShrink: 0, marginRight: 0 }}>{icon}</Box>
        <Box sx={{ ml: 1, display: { xs: "none", md: "block" } }}>{title}</Box>
      </Stack>
    </Badge>
  );
  if (externalLink)
    return (
      <Link
        href={path}
        target="_blank"
        rel="noopener"
        underline="none"
        sx={{
          width: 1,
        }}
      >
        {renderContent}
      </Link>
    );
  return (
    <Link
      href={path || "#"}
      component={RouterLink}
      underline="none"
      sx={{
        width: 1,
      }}
      onClick={() => onClick()}
    >
      {renderContent}
    </Link>
  );
}

export default NavbarItem;
