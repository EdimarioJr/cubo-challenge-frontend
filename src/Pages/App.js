import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import UsersTable from "../Components/UsersTable/UsersTable";
import { GlobalStyle, Container } from "../globalStyle";
import styled from "styled-components";
import axios from "axios";
import Chart from "react-google-charts";

const Main = styled.section`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-self: center;
  margin-top: 50px;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [formSubmit, setFormSubmit] = useState({});
  const [dataChart,setDataChart] = useState([])

  useEffect(() => {
    (async function () {
      let newUsers = await axios.get(process.env.REACT_APP_API_URL);
      console.log(newUsers);
      let newData = newUsers.data.map((user) => {
        const { first_name, last_name, participation } = user;
        return [
          `${first_name} ${last_name}`, participation
        ]
      });
      setDataChart(newData)
      setUsers(newUsers.data);
    })();
  }, [formSubmit]);

  return (
    <>
      <GlobalStyle />
      <Header submit={setFormSubmit} />
      <Container>
        <Main>
          <UsersTable users={users} />
          <Chart
            width={"600px"}
            height={"450px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Users", "participation"],
              ...dataChart
            ]}
            options={{
              title: "Users participation",
              pieHole: 0.4,
            }}
            rootProps={{ "data-testid": "3" }}
          />
        </Main>
      </Container>
    </>
  );
}

export default App;
