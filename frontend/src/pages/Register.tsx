import { useState } from "react";

`   name: string;
    email: string;
    phone: string;
    password: string;
`;

function Register() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [success, setSuccess] = useState<string>("");
    const [err, setErr] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function register() {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, password }),
            });
            if (!res.ok) {
                throw new Error("Registration failed");
            }
            setSuccess("Congratulations! You have successfully registered.");
        } catch (error) {
            if (error instanceof Error) {
                setErr(error.message || "Ooops, Something went wrong");
            }
        } finally {
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setLoading(false);
        }
    }
    return (
        <>
            {loading ? (
                <p>"loading..."</p>
            ) : success ? (
                <p>{success}</p>
            ) : (
                <p>{err}</p>
            )}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    register();
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

                <label htmlFor="email">email</label>
                <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="phone">phone</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                />

                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loading}>{loading ? "loading...": "send"}</button>
            </form>
        </>
    );
}

export default Register;
