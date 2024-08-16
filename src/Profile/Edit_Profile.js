import "./index.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../Users/client";


function Edit_Profile() {
    const [account, setAccount] = useState(null);
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    useEffect(() => {
        fetchAccount();
    }, []);

    const save = async () => {
        await client.updateUser(account);
    };
    return (
        <div>

            <hr />
            {account && (
                < div className="profile-main-edit-div">
                    <Link to={`/Profile`}><button type="button" className="btn btn-primary float-end" onClick={save}> Save </button> </Link>
                    <h1>Editing User: {account.username}</h1>
                    <div className="bio-section">
                        <h2>Change name </h2>
                        <input type="text" className="form-control" id="usr" value={account.firstName} onChange={(e) => setAccount({
                            ...account, firstName: e.target.value
                        })} />
                        <h2>Change password </h2>
                        <input type="text" className="form-control" id="usr" value={account.password} onChange={(e) => setAccount({
                            ...account, password: e.target.value
                        })} />
                        <h2>A litle bit about me </h2>
                        <textarea className="form-control" rows="5" id="comment" value={account.bio} onChange={(e) => setAccount({
                            ...account,
                            bio: e.target.value
                        })}></textarea>
                    </div>
                    <div className="bio-section">
                        <h2>My countries of origin are...</h2>
                        <p>There should be a list of flags here/Search for flags were a user can select</p>
                        <textarea className="form-control" rows="5" id="comment" value={account.origins} onChange={(e) => setAccount({
                            ...account,
                            origins: e.target.value
                        })}></textarea>
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
            )};
            <Link to={`/Profile`}><button type="button" className="btn btn-danger float-end" > Cancel Edit </button> </Link>
        </div >
    );
}

export default Edit_Profile;