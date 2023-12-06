import Search from './Search'
import Details from './Details';
import './App.css';
import Profile from './profile/Profile';
import Edit_Profile from './profile/Edit_Profile';
import AnonymousHome from "./Home/anonymous-home";
import LoggedInHome from "./Home/logged-in-home";
import Signin from './Users/Signin';
import Signup from './Users/Signup';

import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Nav from './Nav';

function App() {
  return (
    <HashRouter>
    <div>
      <Nav/>
    <Routes>
    <Route path="/"         element={<Navigate to="/welcome"/>}/>
          <Route path="/welcome"    element={<AnonymousHome/>}/>
          <Route path='/loggedin'   element={<LoggedInHome/>}/>
          <Route path="/Search/*"    element={<Search/>}/>
          <Route path="/Search/:id"    element={<Details/>}/>
          <Route path="/Profile/"    element={<Profile/>}/>
          <Route path="/Profile/Edit_Profile/*"    element={<Edit_Profile/>}/>
          <Route path="/login"    element={<Signin/>}/>
          <Route path="/signup"    element={<Signup/>}/>
        </Routes>
      </div>
      </HashRouter>
  );
}

export default App;