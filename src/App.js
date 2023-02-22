import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import AllRoute from "./Pages/AllRoute";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoute />
      {/* <Login /> */}
      {/* <Signup /> */}
    </div>
  );
}

export default App;
