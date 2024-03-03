import { SettingsProvider } from "@/context/setting";
import ThemeProvider from "@/context/theme";
import MainLayout from "@/layout/main";

function MainLayoutPage({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider
      defaultSettings={{
        theme: {
          mode: "light",
          font: "Inter",
          color: "default",
        },
      }}
    >
      <ThemeProvider>
        <MainLayout>{children}</MainLayout>
      </ThemeProvider>
    </SettingsProvider>
  );
}

export default MainLayoutPage;
