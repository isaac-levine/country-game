import Search from './Search'
import Home from './Home';
import Details from './Details';
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
          <Route path="/Search/:id"    element={<Details/>}/>
        </Routes>
      </div>
      </HashRouter>
  );
}

export default App;
