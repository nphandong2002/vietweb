import { Box } from "@mui/material";
import Navbar from "./navbar";
import { heightNav, widthNav } from "./config-navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box component="nav" className="fixed z-40 bottom-0">
        <Box
          className="flex flex-row md:flex-col text-[30px] justify-center border border-r"
          sx={{
            width: { xs: "100vh", md: widthNav },
            height: { xs: heightNav, md: "100vh" },
          }}
        >
          <Navbar />
        </Box>
      </Box>
      <div className="mx-[var(--header-size)]">
        <main>{children}</main>
      </div>
    </>
  );
}

export default MainLayout;
