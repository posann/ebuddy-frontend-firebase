"use client";

import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); // Initialize useRouter

  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between p-24">
      <CssBaseline />
      <Box>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 400,
            textAlign: "center",
            gap: 2,
          }}
        >
          <Typography sx={{ fontWeight: "bold", color: "black" }} variant="h4">
            Welcome to Employee Database
          </Typography>
          <Typography sx={{ color: "gray" }} variant="h6">
            Please sign up first to create an account on firebase. To try, you
            can sign in using <br />
            <strong>(email: admin@admin.com, password: admin123)</strong>
          </Typography>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => router.push("/sign-in")}
            >
              SIGN IN
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => router.push("/sign-up")}
            >
              SIGN UP
            </Button>
          </Container>
        </Container>
      </Box>
    </main>
  );
}
