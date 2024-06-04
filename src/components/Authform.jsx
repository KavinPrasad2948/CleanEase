import { useState } from "react";
import { Container, Box, Button, Paper, Grid } from "@mui/material";
import CustomNavbar from "../common/Navbar";
import Footer from "../common/Footer";
import SignInForm from "./LoginForm";
import SignUpForm from "./RegistrationForm";

export default function Authform() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  return (
    <div>
      <CustomNavbar />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box>
            {type === "signIn" ? <SignInForm /> : <SignUpForm />}
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOnClick("signIn")}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleOnClick("signUp")}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}
