import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoteProvider } from "./context/notes/NoteContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <NoteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NoteProvider>
  );
}

export default App;
