import { useSettingsContext } from "@/context/settings";
import { useNavData } from "./config-navbar";
import { heightNav, widthNav } from "./config-navbar";
import { Box, Stack } from "@mui/material";

function Navbar() {
  const navData = useNavData();
  const setting = useSettingsContext();

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        zIndex: 100,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: { xs: "100vh", md: widthNav },
          height: { xs: heightNav, md: "100vh" },
        }}
      >
        {navData.map((a) => a.title)}
      </Stack>
    </Box>
  );
}

export default Navbar;
