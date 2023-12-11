import Search from './Search'
import Details from './Details';
import './App.css';
import Profile from './Profile/Profile';
import Edit_Profile from './Profile/Edit_Profile';
import AnonymousHome from "./Home/anonymous-home";
import LoggedInHome from "./Home/logged-in-home";
import Play from './Play';
import Nav from './Nav';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";

function App() {
  return (
    <HashRouter>
    <div>
    <Nav/>
    <Routes>
    <Route path="/"         element={<Navigate to="/welcome"/>}/>
          <Route path="/welcome"    element={<AnonymousHome/>}/>
          <Route path='loggedin'   element={<LoggedInHome/>}/>
          <Route path="/Search"    element={<Search/>}/>
          <Route path="/Search/:searchWord"    element={<Search/>}/>
          <Route path="/Details/:id"    element={<Details/>}/>
          <Route path="/Profile/*"    element={<Profile/>}/>
          <Route path="/Profile/Edit_Profile/*"    element={<Edit_Profile/>}/>
          <Route path = "/Play" element = {<Play/>}/>
        </Routes>
      </div>
      </HashRouter>
  );
}

export default App;