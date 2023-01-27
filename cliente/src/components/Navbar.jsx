import { AppBar, Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Typography sx={{ flexGrow: 1 }}>
            <Link to="/">PERN STACK</Link>
          </Typography>
          <Button variant="contained">NewTask</Button>
        </Container>
      </AppBar>
    </Box>
  );
};
