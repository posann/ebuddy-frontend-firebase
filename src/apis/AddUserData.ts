import { generateRandomString } from "@/constants/random-uid";

export const AddUserData = async (
  name: string,
  email: string,
  age: number,
  token: string
) => {
  try {
    const userId = generateRandomString(7);
    const response = await fetch("http://localhost:8000/api/add-user-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, name, email, age }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
