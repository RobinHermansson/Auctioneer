import type { LoginRequest, LoginResponse } from "../types/Types";

const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch('http://localhost:5051/api/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    console.log(JSON.stringify(credentials))
    if (!response.ok) {
      throw new Error("Invalid username or password");
    }
    return response.json();
  }
  export default loginUser;