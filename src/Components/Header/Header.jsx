import React, { useState } from "react";
import { HeaderStyle, Form } from "./Style";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    participation: "",
  });

  const handleInputChange = (event) => {
    const newUser = {
      ...user,
      [event.target.name]: event.target.value,
    };
    setUser(newUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3000", user)
      .then((response) => console.log(response));
  };

  return (
    <>
      <HeaderStyle>
        <Form>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            onChange={handleInputChange}
            name="first_name"
            value={user.first_name}
          />
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            name="last_name"
            onChange={handleInputChange}
            value={user.last_name}
          />
          <input
            type="text"
            className="input"
            placeholder="Participation"
            onChange={handleInputChange}
            name="participation"
            value={user.participation}
          />
          <button id="send-button" onClick={handleSubmit}>
            Send
          </button>
        </Form>
      </HeaderStyle>
    </>
  );
};

export default Header;
