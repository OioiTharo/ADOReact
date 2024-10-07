"use client"; // Torna este componente um Client Component

import React, { useState } from 'react';
import TaskForm from '../../../components/TaskForm';
import Tituloh2 from '../../../components/titulos';
import styled from "styled-components";

const DivAdd = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const AdicionarTarefa = () => {
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]); // Adiciona a nova tarefa à lista de tarefas
    console.log('Tarefa adicionada:', newTask); // Opcional: log da tarefa adicionada
  };

  return (
    <DivAdd>
      <Tituloh2>Adicionar Tarefa</Tituloh2>
      <TaskForm onTaskAdded={handleTaskAdded} />
    </DivAdd>
  );
};

export default AdicionarTarefa;
