import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./css/Header.css";
import { useContext } from "react";
import { LoggedContext } from "../store/loginContext";


function Header() {
    const {isLogged, updateLogged} = useContext(LoggedContext)
    const navigate = useNavigate()
    updateLogged()
    return (
        <>
            <div className="header-container">
                <section className="logo-and-login">
                    <Logo />
                    <nav className="nav-auth">
                        {isLogged ? (
                            <button
                                className="nav-auth-btn"
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    updateLogged()
                                    navigate("/login")
                                    
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link className="nav-auth-btn" to="/login">
                                Login
                            </Link>
                        )}
                    </nav>
                </section>
                <nav className="nav-bar">
                    <Link className="nav-btn" to="/">
                        Home
                    </Link>
                    <Link className="nav-btn" to="/about">
                        About
                    </Link>
                    <Link className="nav-btn" to="/gallery">
                        Gallery
                    </Link>
                    <Link className="nav-btn" to="/favorites">
                        Favorites
                    </Link>
                    <Link className="nav-btn" to="/contact">
                        Contact
                    </Link>
                </nav>
            </div>
        </>
    );
}

export default Header;
