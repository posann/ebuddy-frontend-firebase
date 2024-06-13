import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { AddUserData } from "@/apis/AddUserData";

interface AddUserModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ open, handleClose }) => {
  const [newUser, setNewUser] = useState({ name: "", age: "", email: "" });
  const [loading, setLoading] = useState(false); // State for loading status

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default behavior
    setLoading(true); // Set loading to true when submitting

    const token = localStorage.getItem("accessToken") || "";
    AddUserData(newUser.name, newUser.email, Number(newUser.age), token)
      .then(() => {
        alert("User added successfully");
        handleClose();
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        alert("Failed to add user");
        console.error("Failed to add user:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading back to false after request completes
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New User</DialogTitle>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Use onSubmit event instead of onClick */}
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newUser.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="age"
            label="Age"
            type="number"
            fullWidth
            value={newUser.age}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Add"}
          </Button>{" "}
          {/* Use type="submit" and disable button during loading */}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserModal;
