// import React from "react";
// import { Link } from "react-router-dom";

// function HomePage() {
//   return (
//     <div style={styles.container}>
//       <h1>Welcome to the Habit Tracker Website</h1>
//       <p>Explore our Habit Tracker.</p>
//       <div style={styles.buttonContainer}>
//         <Link to="/login" style={styles.button}>
//           Login
//         </Link>
//         <Link to="/register" style={styles.button}>
//           Register
//         </Link>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//   },
//   buttonContainer: {
//     marginTop: "20px",
//   },
//   button: {
//     display: "inline-block",
//     margin: "10px",
//     padding: "10px 20px",
//     color: "#fff",
//     backgroundColor: "#007bff",
//     border: "none",
//     borderRadius: "5px",
//     textDecoration: "none",
//   },
// };

// export default HomePage;
import React, { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../api";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await updateUser(id, { name: newName });
      loadUsers(); // Refresh users
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      loadUsers(); // Refresh users
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl">User List</h2>
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user._id} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
            <span>{user.name} - {user.email}</span>
            <div>
              <button className="bg-yellow-500 text-white p-1 mx-1" onClick={() => handleUpdate(user._id)}>Edit</button>
              <button className="bg-red-500 text-white p-1" onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
  