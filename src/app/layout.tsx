import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeSelectorProvider } from "@/context/theme-selector-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Jira",
  description: "Open Jira customizable tasks manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeSelectorProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            {children}
          </AppRouterCacheProvider>
        </ThemeSelectorProvider>
      </body>
    </html>
  );
}
