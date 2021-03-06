import axios from "axios";

export async function handleSignUp(data) {
    const response = await axios.post("/auth/signup", {
        email: data.email,
        password: data.password,
    })
    return response;
}

export async function handleLogin(data) {
    
    const response = await axios.post("/auth/login", {
        email: data.email,
        password: data.password,
    });
    
    return response
}

export async function getUsers() {
    const response = await axios.get("/auth/users");
    return response;
}

export async function getUser() {
    const response = await axios.get("/auth/user");
    return response;
}