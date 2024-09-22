import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import Example from './components/Sidebar.js';
import LandingPage from './pages/LandingPage.js';
import FormPage from './pages/FormPage.js';

function App() {
  return (
    <Router>
    <div className="App">
      {/* <Example /> */}
      <Routes>
        <Route path="/" element={<LandingPage/>} /> 
        <Route path="/get-started" element={<FormPage />} />  
      </Routes>
    </div>
  </Router>
  );
}

export default App;