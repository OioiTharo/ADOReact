"use client"; 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Tituloh2 from '../../components/titulos';
import Divs from '../../components/Divs';
import DivTarefas from '../../components/DivTarefas.js';
import Grafico from '../../components/grafico';

const Tituloh4 = styled.h4`
    color: ${({ completed }) => (completed ? '#fff' : '#9c325c')};
    font-family: "Jost", sans-serif;
    text-align: center;
    
`;

const TaskItem = styled.div`
  border: 0px solid #ccc;
  border-radius: 6px;
  margin: 10px;
  background-color: ${({ completed }) => (completed ? '#c6d4b8' : '#fff')};
  display: flex;
  align-items: center;
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

const Home = () => {
  
  const [tasks, setTasks] = useState([]);

  
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      setTasks([...tasks, ...response.data]); 
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
      <DivTarefas>
      <Tituloh2>Tarefas</Tituloh2>
        {tasks.map((task) => (
          <TaskItem key={task.id} completed={task.completed}>
          <label>
            <TaskCheckbox
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
            />
            <CustomCheckbox />
            </label>
            <div>
              <Tituloh4 completed={task.completed}>
                {task.name}
              </Tituloh4>
              <p>{task.description}</p>
            </div>
          </TaskItem>
        ))}
      </DivTarefas>
      <Grafico tasks={tasks}/>
    </Divs>
  );
};

export default Home;
