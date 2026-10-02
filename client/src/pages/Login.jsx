import { useState } from "react"
import { useNavigate } from "react-router";

export default function Login() {


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                credentials: "include", // always send authentication data—such as cookies, HTTP headers, or TLS certificates—with the request, even if it is going to a different domain (cross-origin).
                // also have these options 1. omit 2. same-origin (default) 3. include
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            }); 

            const data = await response.json();
            console.log(data);

            if(response.ok) {
                navigate("/profile");
            }
            
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="flex flex-col boder-2 border-black bg-gray-400 text-white">

            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={handleChange} name="email" value={formData.email} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange} name="password" value={formData.password} />

            <button type="submit">Login</button>
        </form>
        </>
    )
} 