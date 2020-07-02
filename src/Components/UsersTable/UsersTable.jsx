import React from "react";
import styled from 'styled-components'

const Table = styled.table`
  border-collapse: collapse;
  height: 80%;
  tr,th,td{
    border: 1px solid #dcdcdc;
    padding: 5px;
    text-align: left;
  }

`

const UsersTable = (props) => {
  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th>Nº</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Participation</th>
          </tr>
          {props.users
            ? props.users.map((user, index) => {
                const { first_name, last_name, participation } = user;
                return (
                  <tr key={index}>
                    <td>{index}</td>
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
