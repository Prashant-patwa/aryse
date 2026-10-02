import { useNavigate } from "react-router";

export default function Logout() {

    const navigate = useNavigate();

    const handleLogout = async () => {


        const res = await fetch("http://localhost:8080/api/logout",
            {
                method: "POST",
                credentials: "include"
            }
        )

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            navigate("/login");
        }

    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}