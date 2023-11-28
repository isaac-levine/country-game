import Nav from "../Nav";
import "./index.css";
import { Link } from "react-router-dom";


function Edit_Profile() {
    return (
        <div>
            <Nav/>
            <hr />
            <div className="profile-main-edit-div">
                <Link to={`/Profile`}><button type="button" className="btn btn-primary float-end" > Save </button> </Link>
                <h1>This will be where users can put a profile picture</h1>
                <h1>Hello USERNAME</h1>
                <div className="bio-section">
                    <h2>A litle bit about me </h2>
                    <textarea className="form-control" rows="5" id="comment" value="whatever the current bio is"></textarea>
                </div>
                <div className="bio-section">
                    <h2>My countries of origin are...</h2>
                    <p>There should be a list of flags here/Search for flags were a user can select</p>
                    <textarea className="form-control" rows="5" id="comment" value="Little story about where they are from/whatever they wish to share on this portion"></textarea>
                </div>
                <div className="bio-section">
                    <h2>I want to travel to ... </h2>
                    <p>There should be a list of flags here/Search for flags were a user can select</p>
                    <textarea className="form-control" rows="5" id="comment" value="Why they want to go there"></textarea>
                </div>
                <div className="bio-section">
                    <h2>I have traveled to ... </h2>
                    <p>each flag gathered from the list will be put a button that can be pressed to be added</p>
                    <p>There should be a list of flags here/Search for flags were a user can select/Remove flags from</p>
                </div>
            </div>
            <Link to={`/Profile`}><button type="button" className="btn btn-danger float-end" > Cancel Edit </button> </Link>
        </div>
    );
}

export default Edit_Profile;