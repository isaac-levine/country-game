import * as client from "./client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BsTrash3Fill, BsPlusCircleFill, BsFillCheckCircleFill, BsPencil } from "react-icons/bs";

function AdminEdit() {
    const [users, setUsers] = useState([]);
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const [user, setUser] = useState({ username: "", password: "", status: "STANDARD" })

    const fetchUser = async () => {
        try {
            const account = await client.account();
            setAccount(account);
        } catch (error) {
            console.log('[error]', error.response);
        }
    };

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        const replace_users = users.filter(user => user._id !== id);
        setUsers(replace_users);
    };

    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchUsers();
    }, []);
    return (

        <div style={{ paddingLeft: 15 }}>
            {!account && (<div> you are not suppose to be here</div>)}
            {account && (
                <div>
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
                            <tr>
                                <td>
                                    <input value={user.username} placeholder="username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                    <input value={user.password} placeholder="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                </td>
                                <td>
                                    <input value={user.firstName} placeholder="First Name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                                </td>
                                <td>
                                    <input value={user.lastName} placeholder="Last Name" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                                </td>
                                <td>
                                    <select value={user.status} onChange={(e) => setUser({ ...user, status: e.target.value })}>
                                        <option value="STANDARD">STANDARD</option>
                                        <option value="PRO">PRO</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </td>
                                <td className="text-nowrap">
                                    <BsFillCheckCircleFill onClick={updateUser}
                                         style={{fontSize : 25}} />
                                </td>
                            </tr>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <Link to={`/Profile/${user._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            {user.username}
                                        </Link>
                                    </td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td> {user.status} </td>
                                    <button className="btn btn-warning me-2">
                                        <BsPencil onClick={() => selectUser(user)} />
                                    </button>
                                    <button onClick={() => deleteUser(user)}>
                                        <BsTrash3Fill />
                                    </button>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminEdit;