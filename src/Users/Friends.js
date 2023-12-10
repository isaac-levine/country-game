import * as client from "./client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Friends() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    useEffect(() => { fetchUsers(); }, []);
    return (
        <div style={{ paddingLeft: 15 }}>
            <h1>User List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                            <Link to={`/users/${user._id}`} style={{textDecoration:'none', color: 'black'}}>
                                {user.username}
                            </Link>
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}

export default Friends;