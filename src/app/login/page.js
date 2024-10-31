"use client";

import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: "Jost", sans-serif;
`;

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 92%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6ca6a3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4a8280;
  }
`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:8080/login' : 'http://localhost:8080/register';
      const response = await axios.post(url, formData);
      console.log(response.data); 
    } catch (error) {
      console.error('Erro ao autenticar:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>{isLogin ? 'Login' : 'Cadastro'}</Title>
        {!isLogin && (
          <Input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        )}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</Button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#6ca6a3', cursor: 'pointer' }}
          >
            {isLogin ? ' Cadastre-se' : ' Faça login'}
          </span>
        </p>
      </Form>
    </Container>
  );
};

export default Auth;
