import axios from "axios";

export async function handleLogin(data) {
    console.log(data)
    const response = await axios.post("/auth/login", {
        email: data.email,
        password: data.password,
    });
    return response
}