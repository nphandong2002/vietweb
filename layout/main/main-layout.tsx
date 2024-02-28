import { Box } from '@mui/material';
import Navbar from './navbar';
import { heightNav, widthNav } from './config-navbar';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="bottom-0 fixed z-50">
        <Box
          className="flex flex-row md:flex-col w-screen text-[30px] justify-center  border border-r"
          sx={{
            height: { sx: heightNav, md: '100vh' },
            width: { md: widthNav },
          }}
        >
          <Navbar />
        </Box>
      </nav>
      <div className="mx-[var(--header-size)]">
        <main>{children}</main>
      </div>
    </>
  );
}

export default MainLayout;
