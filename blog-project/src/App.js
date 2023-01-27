import './App.css';
import React from 'react';
import {BrowserRouter as Router, 
  Route, Routes
} from 'react-router-dom';
import Blog from './components/Blocks/Blog/Blog';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Blog/>}></Route>
          <Route path="*" element={(<h1>Ошибка</h1>)}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
