import "@assets/stylesheets/App.css"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TemplateManager from "./layouts/TemplateManager.tsx";
import HeaderPage from "./components/Header.tsx";
import { UserProvider } from "./context/UserContext.tsx";

function App() {

  return (
    <Router>
      <UserProvider>
        <div className="app">
          <HeaderPage />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<TemplateManager />} />
            </Routes>
          </div>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App
