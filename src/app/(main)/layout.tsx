import ProgressBar from "@/components/progress-bar";
import { SettingsProvider } from "@/context/settings";
import SettingsDrawer from "@/context/settings/drawer/settings-drawer";
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
        <SettingsDrawer />
        <ProgressBar />

        <MainLayout>{children}</MainLayout>
      </ThemeProvider>
    </SettingsProvider>
  );
}

export default MainLayoutPage;
