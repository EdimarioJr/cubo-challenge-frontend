import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import UsersTable from "../Components/UsersTable/UsersTable";
import { GlobalStyle, Container } from "../globalStyle";
import styled from "styled-components";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import axios from "axios";

charts(FusionCharts);

const defaultChart = {
  caption: "Users participation Distribution",
  subcaption: "For all users in 2020",
  showpercentvalues: "1",
  defaultcenterlabel: "Participation",
  aligncaptionwithcanvas: "0",
  captionpadding: "0",
  decimals: "1",
  theme: "fusion",
};

const Main = styled.section`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  align-self: center;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [formSubmit, setFormSubmit] = useState({});
  const [dataChart, setDataChart] = useState({
    chart: defaultChart,
    data: [],
  });

  useEffect(() => {
    (async function () {
      let newUsers = await axios.get(process.env.REACT_APP_API_URL);
      let newData = newUsers.map((user) => {
        const { first_name, last_name, participation } = user;
        return {
          label: `${first_name} + ${last_name}`,
          value: participation,
        };
      });
      let newDataChart = {
        ...dataChart,
        data: newData
      }
      setDataChart(newDataChart)
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
        </Main>
      </Container>
    </>
  );
}

export default App;
