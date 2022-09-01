import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from './components/SignUp'

function App() {
  return (
    <NoteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NoteProvider>
  );
}

export default App;
