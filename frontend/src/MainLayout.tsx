import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import "./MainLayout.css";

function MainLayout() {
    return (
            <div className="MainLayout">
                <Header />
                <main className="main-part">
                    <Outlet />
                </main>
                <Footer />
            </div>
    );
}

export default MainLayout;
