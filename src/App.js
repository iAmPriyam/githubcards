import React, { useState } from "react";
import Axios from "axios";
import "./styles.css";

export default function App() {
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  const getUserData = (e) => {
    e.preventDefault();
    Axios.get(`https://api.github.com/users/${username}`)
      .then(({ data }) => {
        console.log(data);
        setUserData(userData.concat([data]));
        console.log(userData);
        setUsername("");
      })
      .catch((error) => console.error(Object.assign([], error)));
  };
  return (
    <div>
      <form>
        <input
          value={username}
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button onClick={getUserData}>Search</button>
      </form>
      <div className="card-grid">
        {userData.map((item, index) => (
          <div className="card">
            <div className="banner">
              <img src={item.avatar_url} />
            </div>
            <div className="user-details">
              <h1>{item.name}</h1>
              <h2>@{item.login}</h2>
            </div>
            <div className="profile">
              <div className="badges">
                <span>Followers</span>
                {item.followers}
              </div>
              <div className="badges">
                <span>Following</span>
                {item.following}
              </div>
              <div className="badges">
                <span>Repositories</span>
                {item.public_repos}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
