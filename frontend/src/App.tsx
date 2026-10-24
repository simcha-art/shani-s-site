import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Favorites from "./pages/Favorites";
import ArtProduct from "./pages/ArtProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from "./pages/Protected";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/contact" element={<Contact />}/>
                    <Route path="/gallery" element={<Gallery />}/>
                    <Route path="/gallery/:id" element={<ArtProduct />}/>
                    <Route path="/favorites" element={<Protected><Favorites /></Protected>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                  </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
