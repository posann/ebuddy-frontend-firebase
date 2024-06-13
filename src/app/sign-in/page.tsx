"use client";

import { signIn } from "@/firebase/auth";
import { setAuth } from "@/store/reducers";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // state loading
  const dispatch = useDispatch();
  const router = useRouter();

  const handleForm = async () => {
    setLoading(true); // set loading to true

    const { result, error } = await signIn(email, password);

    if (error) {
      console.log(error);
      alert("Sign in failed");
      setLoading(false); // set loading back to false
      return;
    }

    if (result !== null) {
      const user = result.user;
      user.getIdTokenResult().then((idTokenResult) => {
        const accessToken = idTokenResult.token;
        localStorage.setItem("accessToken", accessToken);
        dispatch(
          setAuth({
            email: user.email || "",
            uid: user.uid,
            accessToken: accessToken,
          })
        );
        alert("Sign in successfully");
        setLoading(false); // set loading back to false
        router.push("/admin");
      });
    } else {
      console.log("result is null");
      alert("Sign in failed");
      setLoading(false); // set loading back to false
    }
  };

  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          padding: 2,
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "black", fontWeight: "bold", textAlign: "center" }}
        >
          Sign In
        </Typography>
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleForm} disabled={loading}>
          {loading ? "Loading..." : "Submit"}{" "}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => router.push("/sign-up")}
        >
          Sign Up
        </Button>
      </Box>
    </main>
  );
}

export default Page;
