import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./container/Home/Homepage";
import { ThemeProvider } from "./components/theme-provider";
import InfiniteScroll from "./container/Infinite/InfiniteScroll";
import InfiniteEffect from "./container/Infinite/InfiniteEffect";
import GsapScrollImg from "./container/Gsap/GsapScrollImg";
import Shader from "./container/Shaders/Shader";
import ShaderExample from "./container/Shaders/ShaderExample";
import ToDo from "./container/ToDo/ToDo";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route path="/infinite-effect" element={<InfiniteEffect />} />
          <Route path="/gsap" element={<GsapScrollImg />} />
          <Route path="/shader" element={<Shader />} />
          <Route path="/shader1" element={<ShaderExample />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
