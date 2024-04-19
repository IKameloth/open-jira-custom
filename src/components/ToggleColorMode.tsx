import { ModeNightRounded, WbSunnyRounded } from "@mui/icons-material";
import { Box, Button, PaletteMode } from "@mui/material";

interface ToggleColorModeProps {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ToggleColorMode = ({ mode, toggleTheme }: ToggleColorModeProps) => {
  return (
    <Box
      border="1px solid"
      borderColor="divider"
      borderRadius="999px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ maxWidth: "32px" }}
    >
      <Button
        variant="text"
        size="small"
        aria-label="toggle-theme"
        sx={{
          minWidth: "32px",
          height: "32px",
          p: "4px",
        }}
        onClick={() => toggleTheme()}
      >
        {mode === "dark" ? (
          <WbSunnyRounded fontSize="small" />
        ) : (
          <ModeNightRounded fontSize="small" />
        )}
      </Button>
    </Box>
  );
};

export default ToggleColorMode;
