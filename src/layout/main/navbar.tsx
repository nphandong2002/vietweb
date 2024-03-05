"use client";

import Logo from "@/components/logo";
import { Box, Stack, useTheme } from "@mui/material";
import useNavbar from "./config-navbar";
import NavbarItem from "./navbar-item";
import { NAV } from "../config-layout";

function Navbar() {
  const dataNavbar = useNavbar();
  const theme = useTheme();
  return (
    <Stack
      component="nav"
      sx={{
        position: "fixed",
        zIndex: 9999,
        bottom: 0,
        width: { xs: "100vw", sm: NAV.W_MINI, md: NAV.W_VERTICAL },
        height: { xs: NAV._H, sm: "100vh" },
        justifyItems: "center",
        alignItems: "center",
        borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
        overflow: "auto",
      }}
      direction={{ xs: "row", sm: "column" }}
    >
      <Logo
        sx={{
          my: "1rem",
        }}
      />

      <Stack
        flexGrow={1}
        sx={{ width: 1 }}
        direction={{ xs: "row", sm: "column" }}
        justifyContent={{ xs: "center", sm: "start" }}
        alignItems={{ sm: "center", md: "start" }}
      >
        {dataNavbar.map((nbar) => (
          <NavbarItem key={"nav" + JSON.stringify(nbar.title)} {...nbar} />
        ))}
      </Stack>
    </Stack>
  );
}

export default Navbar;
