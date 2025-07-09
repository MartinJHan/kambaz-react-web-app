import Labs from './Labs/index.tsx';
import Kambaz from './Kambaz';
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="Labs/*" element={<Labs />} />
          <Route path="Kambaz/*" element={<Kambaz />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
