"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Tituloh2 from '../../components/titulos';
import Divs from '../../components/Divs';
import Grafico from '../../components/grafico';

const Tituloh4 = styled.h4`
  color: ${({ completed }) => (completed ? '#fff' : '#9c325c')};
  font-family: "Jost", sans-serif;
  text-align: left; 
  margin-bottom: -10px;
`;

const TaskItem = styled.div`
  border: 0px solid #ccc;
  border-radius: 6px;
  margin: 10px ;
  background-color: ${({ completed }) => (completed ? '#c6d4b8' : '#fff')};
  display: flex;
  align-items: flex-start; 
  width: 100%; 
`;

const TaskCheckbox = styled.input`
  display: none;
`;

const CustomCheckbox = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  border: 2px solid #ccc;
  background-color: ${({ completed }) => (completed ? '#9c325c' : '#fff')};
  transition: background-color 0.3s, border-color 0.3s;
  position: relative;
  margin: 10px;

  ${TaskCheckbox}:checked + & {
    background-color: #9c325c;
  }

  ${TaskCheckbox}:checked + &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 5px;
    height: 5px;
    background-color: #fff;
    border-radius: 1px;
  }
`;

const DivTask = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
`;

const StyledDivTarefas = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  padding: 10px; 
`;

const TaskDescricao = styled.p`
  color: ${({ completed }) => (completed ? '#fff' : '#9c325c')};
  font-family: "Jost", sans-serif;
`;

// Novo estilo para centralizar o título
const TitleContainer = styled.div`
  text-align: center; /* Centraliza o texto */
  width: 100%; /* Ocupa toda a largura */
  margin-bottom: 20px; /* Espaçamento abaixo do título */
`;

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      const filteredTasks = response.data.filter(task => task.semana === false);
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Erro ao buscar as tarefas da API:', error);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Divs>
      <StyledDivTarefas>
        <TitleContainer>
          <Tituloh2>Tarefas do dia</Tituloh2>
        </TitleContainer>
        {tasks.map((task) => (
          <TaskItem key={task.id} completed={task.completed}>
            <label>
              <TaskCheckbox
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
              />
              <CustomCheckbox completed={task.completed} />
            </label>
            <DivTask>
              <Tituloh4 completed={task.completed}>
                {task.name}
              </Tituloh4>
              <TaskDescricao completed={task.completed}>{task.description}</TaskDescricao>
            </DivTask>
          </TaskItem>
        ))}
      </StyledDivTarefas>
      <Grafico tasks={tasks} />
    </Divs>
  );
};

export default Home;
