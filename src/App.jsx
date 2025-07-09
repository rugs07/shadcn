import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./container/Home/Homepage";
import { ThemeProvider } from "./components/theme-provider";
import InfiniteScroll from "./container/Infinite/InfiniteScroll";
import InfiniteEffect from "./container/Infinite/InfiniteEffect";
import GsapScrollImg from "./container/Gsap/GsapScrollImg";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route path="/infinite-effect" element={<InfiniteEffect />} />
          <Route path="/gsap" element={<GsapScrollImg />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
