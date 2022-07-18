import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/?gender=female";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState("name");
  const [value, setValue] = useState("kenny");
  const fetchUser = async () => {
    setLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data);
      const pplInfo = data.results[0];
      console.log(pplInfo);
      const { email, phone } = pplInfo;
      const {
        login: { password },
      } = pplInfo;
      const {
        picture: { large: avatar },
      } = pplInfo;
      const { number, name } = pplInfo.location.street;
      const { first, last } = pplInfo.name;
      const { age } = pplInfo.dob;
      const newUser = {
        email,
        phone,
        password,
        avatar,
        age,
        street: `${number}${name}`,
        name: `${first}${last}`,
      };
      setUser(newUser);
      setLoading(false);
      setTag("name");
      setValue(newUser.name);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMouseOver = (e) => {
    if (e.target.classList.contains("icon")) {
      const newTag = e.target.dataset.label;
      setTag(newTag);
      setValue(user[newTag]);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(user && user.avatar) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {tag} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleMouseOver}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleMouseOver}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseOver={handleMouseOver}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleMouseOver}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleMouseOver}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleMouseOver}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={fetchUser}>
            {loading ? "...loading" : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
