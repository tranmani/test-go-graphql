import './App.css';
import {gql, useQuery, useMutation } from "@apollo/client";
import { useState } from 'react';

interface User {
    id: number
    name: String
}

const USERS = gql`
    query Users {
        users {
            id
            name
        }
    }
`;

const ADD_USER = gql`
  mutation createUser ($name: String) {
        createUser(input:{name: $name}) {
            name
        }
    }
`;

function AddUser() {
    const [name, setName] = useState("")
    const [addUser, { loading, error }] = useMutation(ADD_USER, {
        refetchQueries: [
          {query: USERS}
        ],
    });

    if (loading) return (<div>Submitting...</div>);
    if (error) return (<div>Submission error! ${error.message}</div>);

    return  (
        <>
            <h3>Add new user</h3>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    addUser({ variables: { name } });
                    setName("");
                }}
            >
                <label>
                    <span>Name: </span>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <button type="submit">Add User</button>
            </form>
        </>
    );
}

function UserList() {
    const {loading, error, data} = useQuery(USERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let users: User[] = [...data.users]

    return (
        <>
            <h3>List users</h3>
            {users.reverse().map((user: User) => (
                <div key={user.id}>
                    <p>
                        <span><b>ID</b></span>: {user.id}
                        <span> | <b>Name</b></span>: {user.name}
                    </p>
                </div>
            ))}
        </>
    );
}

function App() {
    return (
        <div>
            <h2>get fake data from database using Apollo & Graphql</h2>
            <AddUser/>
            <UserList/>
        </div>
    );
}

export default App;