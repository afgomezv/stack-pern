import {
  AppBar,
  Box,
  Button,
  Container,
  Typography,
  Toolbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "#eee" }}>
                PERN Stack
              </Link>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/task/new")}
            >
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
