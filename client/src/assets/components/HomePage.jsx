import React from 'react'
import { useState, useEffect } from 'react';

const HomePage = () => {
    const [users, setUsers] = useState();

    useEffect(()=>{
      fetch("http://localhost:5000/api/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
    },[])
    
    return (
      users?
      <div>
        <h1>Shopping List</h1>
        <ul>
          {users.map( user => (
            <li key={user.id}>{user.name} {user.email}</li>
          ))}
        </ul>
      </div>
      : <h1>No users?</h1>
    )
}

export default HomePage;