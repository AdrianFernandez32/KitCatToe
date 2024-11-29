import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Game from "./views/Game/Game";
import Register from "./views/Register";
import SignIn from "./views/SignIn";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>
);
