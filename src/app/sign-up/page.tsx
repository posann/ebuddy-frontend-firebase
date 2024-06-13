"use client";

import React, { useState } from "react";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
import { signUp } from "@/firebase/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/reducers";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading
  const dispatch = useDispatch();
  const router = useRouter();

  const handleForm = async () => {
    setLoading(true); // Mengatur loading ke true saat proses sign-up dimulai

    const { result, error } = await signUp(email, password);

    if (error) {
      console.log(error);
      alert("Sign up failed");
      setLoading(false); // Mengatur loading kembali ke false jika terjadi error
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
        alert("Sign up successfully");
        setLoading(false); // Mengatur loading kembali ke false setelah sign-up berhasil
        router.push("/admin");
      });
    } else {
      console.log("result is null");
      alert("Sign up failed");
      setLoading(false); // Mengatur loading kembali ke false jika result null
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
          Sign Up
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
        <Button
          color="secondary"
          variant="contained"
          onClick={handleForm}
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
        <Button variant="contained" onClick={() => router.push("/sign-in")}>
          Sign In
        </Button>
      </Box>
    </main>
  );
}

export default Page;
