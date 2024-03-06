"use client";

import { Stack, useTheme } from "@mui/material";

import Logo from "@/components/logo";
import Scrollbar from "@/components/scrollbar";

import { NAV } from "../config-layout";
import NavbarItem from "./navbar-item";
import useNavbar from "./config-navbar";
import { hideScroll } from "@/context/theme/css";

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
        borderRight: (theme) => `dashed 1px ${theme.palette.primary.light}`,
        borderTop: (theme) => `dashed 1px ${theme.palette.primary.light}`,
      }}
    >
      <Stack
        sx={{
          width: { xs: "100vw", sm: NAV.W_MINI, md: NAV.W_VERTICAL },
          height: { xs: NAV._H, sm: "100vh" },
          ...hideScroll.x,
        }}
        direction={{ xs: "row", sm: "column" }}
      >
        <Scrollbar
          sx={{
            height: 1,
            "& .simplebar-content": {
              height: 1,
              display: "flex",
              flexDirection: "column",
            },
          }}
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
        </Scrollbar>
      </Stack>
    </Stack>
  );
}

export default Navbar;
