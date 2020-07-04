import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import UsersTable from "../Components/UsersTable/UsersTable";
import { GlobalStyle, Container } from "../globalStyle";
import { Main } from "./Style";
import axios from "axios";
import Chart from "react-google-charts";

function App() {
  // puxa os usuarios do BD e manda para a tabela e para o gráfico
  const [users, setUsers] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  // flags que avisam a esse componente se os componentes filhos fizeram alterações no BD
  // caso seja true, esse componente é forçado a renderizar novamente, atualizando assim a tabela e gráfico
  const [formSubmit, setFormSubmit] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  useEffect(() => {
    (async function () {
      // setando tabela e grafico cada vez que o Header ou UsersTable avisarem que o usuario fez uma alteração
      let newUsers = await axios.get(process.env.REACT_APP_API_URL);
      let newData = newUsers.data.map((user) => {
        const { first_name, last_name, participation } = user;
        return [`${first_name} ${last_name}`, participation];
      });
      setDataChart(newData);
      setUsers(newUsers.data);
    })();
  }, [formSubmit, deleteItem]);

  return (
    <>
      <GlobalStyle />
      <Header submit={setFormSubmit} flagSubmit={formSubmit} />
      <Container>
        <Main>
          <UsersTable
            users={users}
            flagDelete={deleteItem}
            setFlagDelete={setDeleteItem}
          />
          <Chart
            width={"600px"}
            height={"450px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[["Users", "participation"], ...dataChart]}
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
