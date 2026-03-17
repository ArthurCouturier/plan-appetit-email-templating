import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Preview from "./pages/Preview";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/preview/:templateId" element={<Preview />} />
    </Routes>
  );
}
