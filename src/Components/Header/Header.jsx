import React, { useState } from "react";
import { HeaderStyle, Form } from "./Style";
import axios from "axios";

const Header = (props) => {
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
    // se todos os valores das propriedades do objeto estiverem preenchidos, ou seja, se o usuário preencheu todos os
    // campos no form
    if (Object.values(user).every((element) => element !== "")) {
      await axios
        .get(process.env.REACT_APP_API_URL, {
          params: {
            first_name: user.first_name,
            last_name: user.last_name,
          },
        })
        .then(async (response) => {
          if (response.data.length === 0) {
            await axios
              .post(process.env.REACT_APP_API_URL, user)
              .then((response) => {
                props.submit(!props.flagSubmit);
              });
          } else alert("O usuário já está cadastrado no sistema!");
        });

      setUser({
        first_name: "",
        last_name: "",
        participation: "",
      });
    } else {
      alert("Preencha todos os campos!");
    }
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
