import {
  Navbar,
  Welcome,
  Footer,
  Services,
  Transactions,
  Home,
} from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      {/* <Navbar /> */}
      <Home />
      {/* <Welcome /> */}
    </div>
    {/* <Services />
    <Transactions />
    <Footer /> */}
  </div>
);

export default App;
