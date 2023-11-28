import Search from './Search'
import AnonymousHome from './Home/anonymous-home';
import LoggedInHome from './Home/logged-in-home';
import Details from './Details';
import Profile from './Profile/Profile';
import Edit_Profile from './Profile/Edit_Profile';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";

function App() {
  return (
    <HashRouter>
    <div>
    <Routes>
          <Route path="/Search/*"    element={<Search/>}/>
          <Route path="/Search/:id"    element={<Details/>}/>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<AnonymousHome />} />
          <Route path="/loggedin" element={<LoggedInHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit_profile" element={<Edit_Profile />} />
        </Routes>
      </div>
      </HashRouter>
  );
}

export default App;
