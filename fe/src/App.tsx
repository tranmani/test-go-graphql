import "./App.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

interface User {
  id: number;
  name: string;
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
  mutation createUser($name: String) {
    createUser(input: { name: $name }) {
      name
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $name: String) {
    updateUser(input: { id: $id, name: $name }) {
      id
      name
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;

// Add user component
function AddUser() {
  const [name, setName] = useState("");
  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: USERS }],
  });

  if (loading) return <div>Submitting...</div>;
  if (error) return <div>Submission error! ${error.message}</div>;

  return (
    <>
      <h3>Add new user</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser({ variables: { name } });
          setName("");
        }}>
        <label>
          <span>Name: </span>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Add User</button>
      </form>
    </>
  );
}

// User List component
function UserList() {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <span>Loading...</span>;
  if (error) return <p>Error :(</p>;

  let users: User[] = [...data.users];

  return (
    <>
      <h3>List users</h3>
      {users.reverse().map((user: User) => (
        <div key={user.id}>
          <p>
            <span>
              <b>ID</b>
            </span>
            : {user.id}
            <span>
              {" "}
              | <b>Name</b>
            </span>
            : <UserInfo user={user} />
            <DeleteUser id={user.id} />
          </p>
        </div>
      ))}
    </>
  );
}

// User name and update user component
const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);
  const [updateState, setUpdateState] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {updateState ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser({ variables: { id: user.id, name: newUsername } });
              setUpdateState(false);
            }}>
            <label>
              <input type="text" name="name" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            </label>
            <button type="submit">Save</button>
          </form>
        </>
      ) : (
        user.name + " | "
      )}
      {!updateState && (
        <button
          onClick={() => {
            setUpdateState(true);
            setNewUsername(user.name);
          }}>
          Update
        </button>
      )}
    </>
  );
};

// Delete user component
const DeleteUser: React.FC<{ id: number }> = ({ id }) => {
  const [deleteUser, { loading, error }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: USERS }],
  });

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error :(</span>;

  return (
    <>
      <span>
        <button onClick={() => deleteUser({ variables: { id } })}>Delete</button>
      </span>
    </>
  );
};

function App() {
  return (
    <div>
      <h2>Get data from database using Apollo & Graphql</h2>
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;
