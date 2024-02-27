import { Box } from "@mui/material";
import Navbar from "./navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="bottom-0 fixed z-50 w-screen ">
        <Box>
          <div className="flex flex-row md:flex-col text-[30px] justify-center border border-r">
            <Navbar />
          </div>
        </Box>
      </nav>
      <div className="mx-[var(--header-size)]">
        <main>{children}</main>
      </div>
    </>
  );
}

export default MainLayout;
