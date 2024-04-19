"use client";

import { EntryList } from "@/components/EntryList";
import Navbar from "@/components/Navbar";
import NewEntry from "@/components/NewEntry";
import { useThemeSelectorContext } from "@/context/theme-selector-context";
import {
  Box,
  Card,
  CardHeader,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
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
                my: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                bgcolor: "transparent",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={(theme) => ({
                      height: "calc(100vh - 150px)",
                      borderRadius: "25px",
                      backdropFilter: "blur(24px)",
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor:
                        theme.palette.mode === "light"
                          ? "rgba(255, 255, 255, 0.4)"
                          : "rgba(0, 0, 0, 0.4)",
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)"
                          : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
                    })}
                  >
                    <CardHeader title="Pendings" />
                    <NewEntry />
                    <EntryList status="pending" />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={(theme) => ({
                      height: "calc(100vh - 150px)",
                      borderRadius: "25px",
                      backdropFilter: "blur(24px)",
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor:
                        theme.palette.mode === "light"
                          ? "rgba(255, 255, 255, 0.4)"
                          : "rgba(0, 0, 0, 0.4)",
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)"
                          : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
                    })}
                  >
                    <CardHeader title="In Progress" />
                    <EntryList status="in-progress" />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={(theme) => ({
                      height: "calc(100vh - 150px)",
                      borderRadius: "25px",
                      backdropFilter: "blur(24px)",
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor:
                        theme.palette.mode === "light"
                          ? "rgba(255, 255, 255, 0.4)"
                          : "rgba(0, 0, 0, 0.4)",
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)"
                          : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
                    })}
                  >
                    <CardHeader title="Finished" />
                    <EntryList status="finished" />
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}
