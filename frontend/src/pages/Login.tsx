import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string | null>(null);
    async function login() {
        setLoading(true);
        setErr(null);
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password }),
            });
            if (response.status === 404) {
                throw new Error("User not found. Register now")
            }
            if (!response.ok) {
                console.error(`Http Error, Status: ${response.status}`)
                throw new Error(`Something went wrong`);
            }

            const { accessToken } = await response.json();
            localStorage.setItem("token", accessToken);
            navigate("/favorites");
        } catch (error) {
            if (error instanceof Error)
                setErr(error.message || "Something went wrong");
        } finally {
            setLoading(false);
            setName("");
            setPassword("");
        }
    }
    return (
        <>
            {err && <p>{err}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}
            >
                <label htmlFor="name">name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "loading..." : "send"}
                </button>
            </form>
        </>
    );
}

export default Login;
