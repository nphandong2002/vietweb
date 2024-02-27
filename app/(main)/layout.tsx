import MainLayout from "@/layout/main";

function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}

export default Layout;
