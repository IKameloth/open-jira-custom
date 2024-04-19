"use client";

import Navbar from "@/components/Navbar";
import { useThemeSelectorContext } from "@/context/theme-selector-context";
import {
  Box,
  Container,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { SnackbarProvider } from "notistack";

export default function Home() {
  const { mode, toggleTheme } = useThemeSelectorContext();
  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Navbar mode={mode} toggleTheme={toggleTheme} />
        <SnackbarProvider maxSnack={3}>
          <Container maxWidth="lg">
            <Box
              sx={{
                my: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "background.default",
              }}
            >
              <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                Hola mundo!
              </Typography>
            </Box>
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}
