import { useState } from "react"


export default function Signup() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // fetch(url, configuration-Object)
            const response = await fetch("http://localhost:8080/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(formData)  
            })

            const data = await response.json();
            console.log(data);

        } catch (e) {
            console.log(e);
        }

    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col border-2 border-black"
            >

                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={handleChange} name="username" value={formData.username} autoComplete="username" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={handleChange} name="email" value={formData.email} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handleChange} name="password" value={formData.password} autoComplete="new-password" />

                <input type="checkbox" id="terms" />
                <label htmlFor="terms">I accept terms & conditions</label>

                <button type="submit">Create Account</button>

            </form>


        </>
    )
}

// user chala jaayega url se backend par

// if your design locates button somewhere else so give <form> an id and on button place the id on <button form="id">