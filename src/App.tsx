import Layout from "./components/Layout/Layout";
import { Header, Home } from "./components";
import { games } from "./assets/games";

const App = () => {
   return (
      <Layout>
         <Header games={games} />
         <Home games={games} />
      </Layout>
   );
};

export default App;
