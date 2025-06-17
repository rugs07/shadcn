import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./container/Home/Homepage";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
