"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import api from './lib/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
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

const ErrorMessage = styled.div`
  color: #d32f2f;
  text-align: center;
  margin: 10px 0;
  font-size: 14px;
`;

const Auth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    usuario: '',
    email: '',
    senha: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/api/auth/login', {
            email: formData.email,
            senha: formData.senha
        });
        
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            router.push('/');
        }
    } catch (error) {
        console.error('Erro:', error);
        setError(error.response?.data?.message || 'Erro ao fazer login');
    }
};

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      usuario: '',
      email: '',
      senha: ''
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>{isLogin ? 'Login' : 'Cadastro'}</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {!isLogin && (
          <Input
            type="text"
            name="usuario"
            placeholder="Nome de usuário"
            value={formData.usuario}
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
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleInputChange}
          required
        />
        
        <Button type="submit">
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </Button>
        
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <span
            onClick={toggleMode}
            style={{ color: '#6ca6a3', cursor: 'pointer', marginLeft: '5px' }}
          >
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </span>
        </p>
      </Form>
    </Container>
  );
};

export default Auth;