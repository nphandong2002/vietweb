import { Badge, Box, Stack, badgeClasses } from "@mui/material";
import { NavbarItemType } from "./types";

function NavbarItem({ icon, title }: NavbarItemType) {
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={true}
      sx={{
        [`& .${badgeClasses.badge}`]: {
          top: 8,
          right: 8,
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          padding: "12px 6px",
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        <Box sx={{ flexShrink: 0, marginRight: 0 }}>{icon}</Box>
        <Box sx={{ ml: 1, display: { xs: "none", md: "block" } }}>{title}</Box>
      </Stack>
    </Badge>
  );
}

export default NavbarItem;
