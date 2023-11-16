import Search from './Search'
import Home from './Home';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";

function App() {
  return (
    <HashRouter>
    <div>
    <Routes>
    <Route path="/"         element={<Navigate to="/Home"/>}/>
          <Route path="/Home/*"    element={<Home/>}/>
          <Route path="/Search/*"    element={<Search/>}/>
        </Routes>
      </div>
      </HashRouter>
  );
}

export default App;
