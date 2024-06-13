import { BASE_URL } from "@/constants/base-url";
import { GET_ALL_USERS } from "@/constants/users";

export const GetAllUser = async (token: string) => {
  console.log(token);

  try {
    const response = await fetch(`${BASE_URL}${GET_ALL_USERS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
