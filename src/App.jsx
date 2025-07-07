import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./container/Home/Homepage";
import { ThemeProvider } from "./components/theme-provider";
import InfiniteScroll from "./container/Infinite/InfiniteScroll";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
