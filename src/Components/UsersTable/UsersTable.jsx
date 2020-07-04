import React from "react";
import styled from "styled-components";
import deleteImg from "../../assets/delete.jpeg";
import axios from "axios";

const Table = styled.table`
  border-collapse: collapse;
  tr,
  th,
  td {
    border: 1px solid #dcdcdc;
    padding: 5px;
    text-align: left;
  }

  .deleteCell {
    background-position: center center;
    background-image: url(${deleteImg});
    background-size: contain;
    cursor: pointer;
    background-repeat: no-repeat;
    width: 30px;
  }
`;

const UsersTable = (props) => {
  const handleDelete = async (event) => {
    const userName = [];
    let parentElement = event.target;
    // loop que sai em busca dos valores first_name e last_name dos elementos irmãos
    for (let i = 0; i < 2; i++) {
      parentElement = parentElement.nextElementSibling;
      userName.push(parentElement.textContent);
    }
    // primeira chamada procura o id desse usuario no banco de dados e a segunda chamada exclui o usuario usando esse id
    await axios
      .get(process.env.REACT_APP_API_URL, {
        params: {
          first_name: userName[0],
          last_name: userName[1],
        },
      })
      .then(async (response) => {
        if (response.data[0]) {
          await axios
            .delete(`${process.env.REACT_APP_API_URL}/${response.data[0]._id}`)
            .then((response) => {
              props.setFlagDelete(!props.flagDelete);
            });
        }
      });
  };

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Participation</th>
          </tr>
          {props.users
            ? props.users.map((user, index) => {
                const { first_name, last_name, participation } = user;
                return (
                  <tr key={index}>
                    <td className="deleteCell" onClick={handleDelete}></td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{participation}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </>
  );
};

export default UsersTable;
