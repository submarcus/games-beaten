import Home from "./components/Home/Home";
import { Routes, Route } from "react-router";

const App = () => {
    return (
        <div className="min-h-screen bg-neutral-950">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};

export default App;
