import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Pages/Home";
import View from "./Component/Pages/Students/View";
import Edit from "./Component/Pages/Students/Edit";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
