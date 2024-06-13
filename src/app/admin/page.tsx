"use client";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, CssBaseline } from "@mui/material";
import { GetAllUser } from "@/apis/GetAllUser";
import { setAuth } from "@/store/reducers";
import Loading from "@/components/loading";
import AddUserModal from "@/components/addUserModal";
import { TableUser } from "@/components/tableUser";

function MainPage() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Fetched token from localStorage:", token);

    if (token) {
      if (token !== auth.accessToken) {
        console.log("Setting auth token from localStorage to Redux state");
        dispatch(setAuth({ ...auth, accessToken: token }));
      }
    } else if (auth.accessToken) {
      console.log("Setting auth token from Redux state to localStorage");
      localStorage.setItem("accessToken", auth.accessToken);
    }
  }, [auth.accessToken, dispatch, auth]);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.accessToken) {
        try {
          console.log("Fetching data with accessToken:", auth.accessToken);
          const response = await GetAllUser(auth.accessToken);
          console.log("Fetched data:", response);
          setData(response);
        } catch (error) {
          console.error("Failed to fetch data", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No access token, setting loading to false");
        setLoading(false);
      }
    };

    fetchData();
  }, [auth.accessToken]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <main className="bg-white flex min-h-screen flex-col bg-gray-900 items-center">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 500,
          height: "100%",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <h1 className="text-3xl text-gray-800 text-center mt-10 font-bold">
            EMPLOYEE DATA
          </h1>
          <Button size="small" variant="contained" onClick={handleOpen}>
            Add Data
          </Button>
          {loading ? <Loading /> : <TableUser data={data} />}
          <AddUserModal open={open} handleClose={handleClose} />
        </Container>
      </Box>
    </main>
  );
}

export default MainPage;
