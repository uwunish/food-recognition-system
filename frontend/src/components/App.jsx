import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Upload from "./Upload";
import Calculate from "./Calculate";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="main-body">
                    <Routes>
                        <Route path="/" element={<Upload />} />
                        <Route path="/calculate" element={<Calculate />} />
                    </Routes>
                </div>
                <Footer className="footer" />
            </div>
        </Router>
    );
}

export default App;
