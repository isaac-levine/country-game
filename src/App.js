import Search from './Search'
import Details from './Details';
import './App.css';
import Profile from './profile/Profile';
import Edit_Profile from './profile/Edit_Profile';
import AnonymousHome from "./Home/anonymous-home";
import LoggedInHome from "./Home/logged-in-home";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";

function App() {
  return (
    <HashRouter>
    <div>
    <Routes>
    <Route path="/"         element={<Navigate to="/welcome"/>}/>
          <Route path="/welcome"    element={<AnonymousHome/>}/>
          <Route path='loggedin'   element={<LoggedInHome/>}/>
          <Route path="/Search/*"    element={<Search/>}/>
          <Route path="/Search/:id"    element={<Details/>}/>
          <Route path="/Profile/*"    element={<Profile/>}/>
          <Route path="/Profile/Edit_Profile/*"    element={<Edit_Profile/>}/>
        </Routes>
      </div>
      </HashRouter>
  );
}

export default App;