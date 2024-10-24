"use client";

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import axios from 'axios';
import Tituloh2 from '../../../components/titulos';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
  width: 30%;
  max-height: 500px;
  margin: 20px;
  overflow-y: scroll;
`;

const Task = styled.div`
  background-color: #6ca6a3;
  color: white;
  padding: 2px 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
`;

const DivDrag = styled.div`
  margin-top: 20px;
  font-family: "Jost", sans-serif;
`;

const Tituloh3 = styled.h3`
  color: #9c325c;
  font-family: "Jost", sans-serif;
  margin-left: 10px;
`;

const Semana = () => {
  const [tasks, setTasks] = useState({
    pendentes: [],
    fazendo: [],
    feitas: [],
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      const filteredTasks = response.data.filter(task => task.semana === true);

      const organizedTasks = {
        pendentes: filteredTasks.map(task => ({
          id: task.id || Math.random().toString(36).substr(2, 9),
          content: task.name,
          description: task.description,
          status: 'pendente',
        })),
        fazendo: [],
        feitas: [],
      };

      setTasks(organizedTasks);
    } catch (error) {
      console.error('Erro ao buscar as tarefas da API:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    const sourceTasks = Array.from(tasks[sourceColumn]);
    const [removedTask] = sourceTasks.splice(source.index, 1);
    const destinationTasks = Array.from(tasks[destinationColumn]);
    destinationTasks.splice(destination.index, 0, removedTask);

    setTasks({
      ...tasks,
      [sourceColumn]: sourceTasks,
      [destinationColumn]: destinationTasks,
    });
  };

  return (
    <DivDrag>
      <Tituloh2>Tarefas da semana</Tituloh2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {Object.keys(tasks).map(column => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                  <Tituloh3>{column.charAt(0).toUpperCase() + column.slice(1)}</Tituloh3>
                  {tasks[column].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <Task ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <h4>{task.content}</h4>
                          <p>{task.description}</p>
                        </Task>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Column>
              )}
            </Droppable>
          ))}
        </Container>
      </DragDropContext>
    </DivDrag>
  );
};

export default Semana;
