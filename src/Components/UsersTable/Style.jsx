import styled from 'styled-components'
import deleteImg from "../../assets/delete.jpeg";


export const Table = styled.table`
  border-collapse: collapse;
  tr,
  th,
  td {
    border: 1px solid #dcdcdc;
    padding: 5px;
    text-align: left;
    text-transform: capitalize;
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
