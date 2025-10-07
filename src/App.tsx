import { Routes, Route } from "react-router";
import Layout from "./components/Layout/Layout";
import { Header, Home } from "./components";
import Wishlist from "./components/Wishlist/Wishlist";
import { games } from "./assets/games";

const App = () => {
   return (
      <Layout>
         <Header games={games} />
         <Routes>
            <Route path="/" element={<Home games={games} />} />
            <Route path="/wishlist" element={<Wishlist />} />
         </Routes>
      </Layout>
   );
};

export default App;
