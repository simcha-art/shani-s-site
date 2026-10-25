import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import "./MainLayout.css";
import LoginContext from "./store/loginContext";

function MainLayout() {
    return (
        <>
            <LoginContext>
                <div className="MainLayout">
                    <Header />
                    <main className="main-part">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </LoginContext>
        </>
    );
}

export default MainLayout;
