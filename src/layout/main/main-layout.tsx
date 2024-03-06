import { Box } from "@mui/material";
import Navbar from "./navbar";
import { NAV } from "../config-layout";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          ml: { xs: 0, sm: `${NAV.W_MINI}px`, md: `${NAV.W_VERTICAL}px` },
          px: "10px",
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default MainLayout;
