"use client";
import { useUIContext } from "@/context/theme-context";
import { MoveToInbox } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useUIContext();

  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          <ListItem key="item-one">
            <ListItemIcon>
              <MoveToInbox />
            </ListItemIcon>
            <ListItemText primary="item one" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key="item-two">
            <ListItemIcon>
              <MoveToInbox />
            </ListItemIcon>
            <ListItemText primary="item two" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
