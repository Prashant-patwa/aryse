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

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log("Form Submitted Data:", formData);
    };

    return (
        <>
            <h1>Signup Page</h1>

            <form onSubmit={handleSubmit}>

                <label htmlFor="username">Username: </label>
                <input type="text" id="username" onChange={handleChange} name="username" value={formData.username} />

                <label htmlFor="email">Email: </label>
                <input type="email" id="email" onChange={handleChange} name="email" value={formData.email} />

                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={handleChange} name="password" value={formData.password} />

                <button type="submit">Submit</button>

            </form>


        </>
    )
}

// user chala jaayega url se backend par

// if your design locates button somewhere else so give <form> an id and on button place the id on <button form="id">