import styled from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
  }

  span {
    padding: 10px;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    font-size: 16px;
    width: 100%;
  }
`

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  &:hover {
    background-color: #0069d9;
  }
`;