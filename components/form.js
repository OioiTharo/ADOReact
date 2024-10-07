import styled from "styled-components";


const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px;
    item-align: center;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 30px;
  background-color: #43777a;
  color: white;
  border: none;
  border-radius: 6px;
  width: 320px;
`;

const ErrorMessage = styled.p`
  color: #d95b45;
  margin-top: 10px;
`;

export default function Form ({email, setEmail, password, setPassword, erro, handleSubmit}){
    return (
        <FormContainer onSubmit={handleSubmit}>
            <Input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {erro && <p> {erro} </p>}
            <Button type="submit">Enviar</Button>
        </FormContainer>
    )
}