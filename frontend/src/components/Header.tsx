import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Header() {
    const navigate = useNavigate();
    return (
        <>
        <section className="logo-and-login">
            <Logo />
            <nav className="nav-auth">
                <Link className="nav-auth-btn" to="/login">Login</Link>
                <Link to="Register" className="nav-auth-btn">Register</Link>
            </nav>
        </section>
            <nav className="nav-bar">
                <Link className="navBtn" to="/">Home</Link>
                <Link className="navBtn" to="/about">About</Link>
                <Link className="navBtn" to="/gallery">Gallery</Link>
                <Link className="navBtn" to="/favorites">Favorites</Link>
                <Link className="navBtn" to="/contact">Contact</Link>
            </nav>
        </>
    );
}

export default Header;
