import { JSX } from "react";
import { Routes, Route } from "react-router-dom";
import Registr from "./pages/Registration";
import Authorization from "./pages/Authorization";
import PrivateRoute from "./components/PrivateRoute";
import AllTodo from "./pages/AllTodo";
import "./App.css";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Routes>
        <Route path="/registr" element={<Registr />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route element={<PrivateRoute />}>
          <Route path="/todo" element={<AllTodo />} />
        </Route>
        <Route path="*" element={<Registr />} />
      </Routes>
    </div>
  );
};

export default App;
