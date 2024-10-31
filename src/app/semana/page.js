"use client";

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import styled from 'styled-components';
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
  overflow-y: auto;
  
  /* Melhorando a aparência da scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 4px;
  }
`;

const Task = styled.div`
  background-color: #6ca6a3;
  color: white;
  padding: 2px 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #5a8e8b;
  }
  
  /* Adicionando estilo quando arrastando */
  &:active {
    transform: scale(1.02);
  }
`;

const DivDrag = styled.div`
  margin-top: 20px;
  font-family: "Jost", sans-serif;
`;

const Tituloh3 = styled.h3`
  color: #9c325c;
  font-family: "Jost", sans-serif;
  margin-left: 10px;
  margin-bottom: 15px;
`;

const TaskContent = styled.h4`
  margin: 8px 0;
`;

const TaskDescription = styled.p`
  font-size: 0.9em;
  opacity: 0.9;
`;

const DroppableArea = styled.div`
  min-height: 200px;
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
          id: task.id?.toString() || Math.random().toString(36).substr(2, 9),
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

    // Se não houver destino ou o item for solto no mesmo lugar
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
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
          {Object.keys(tasks).map(columnId => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <Column
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Tituloh3>
                    {columnId.charAt(0).toUpperCase() + columnId.slice(1)}
                  </Tituloh3>
                  <DroppableArea>
                    {tasks[columnId].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Task
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? 0.8 : 1,
                            }}
                          >
                            <TaskContent>{task.content}</TaskContent>
                            <TaskDescription>{task.description}</TaskDescription>
                          </Task>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </DroppableArea>
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