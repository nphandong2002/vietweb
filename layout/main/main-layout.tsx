import { Box, Stack } from "@mui/material";
import Navbar from "./navbar";
import { heightNav, widthNav } from "./config-navbar";
import SettingDraw from "@/compoments/setting-draw";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SettingDraw />
      <Box component="nav" className="fixed z-40 bottom-0">
        <Stack
          className=" flex-row md:flex-col text-[30px] justify-center border border-r"
          direction={{ xs: "column", sm: "row" }}
          sx={{
            width: { xs: "100vh", md: widthNav },
            height: { xs: heightNav, md: "100vh" },
          }}
        >
          <Navbar />
        </Stack>
      </Box>
      <div className="mx-[var(--header-size)]">
        <main>{children}</main>
      </div>
    </>
  );
}

export default MainLayout;
