import styled from "styled-components";

export const HeaderStyle = styled.header`
  background-color: #00b8e2;
  padding: 40px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr;
  grid-gap: 15px;
  align-self: center;
  width: 70%;

  #send-button {
    color: white;
    text-transform: uppercase;
    border: 1px solid white;
    background-color: inherit;
    border-radius: 3px;
    font-weight: 700;
  }

  #send-button:hover{
      background-color: white;
      color: #00b8e2;
      transition: all 0.5s;
      cursor: pointer;
  }

  .input {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    padding-left: 8px;
    border: none;
    border-radius: 2px;
  }
`;
