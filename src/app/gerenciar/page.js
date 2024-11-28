"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Tituloh2 from '../../../components/titulos';

const Container = styled.div`
  padding: 20px;
  font-family: "Jost", sans-serif;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const TaskCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const TaskInfo = styled.div`
  flex: 1;
`;

const TaskName = styled.h3`
  color: #9c325c;
  margin: 0 0 5px 0;
`;

const TaskDescription = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9em;
`;

const TaskType = styled.span`
  background-color: ${props => props.semana ? '#6ca6a3' : '#9c325c'};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  margin-left: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.delete ? '#ffebee' : '#e3f2fd'};
  }

  i {
    color: ${props => props.delete ? '#e57373' : '#6ca6a3'};
  }
`;

const EditForm = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #9c325c;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  font-family: inherit;
`;

const SaveButton = styled.button`
  background-color: #6ca6a3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #5a8e8b;
  }
`;

const CancelButton = styled(SaveButton)`
  background-color: #9c325c;

  &:hover {
    background-color: #7c1a3c;
  }
`;

const GerenciarTarefas = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    semana: false
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditForm({
      name: task.name,
      description: task.description,
      semana: task.semana
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/tasks/${editingTask.id}`, editForm); // Mudado de _id.$oid para id
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await axios.delete(`http://localhost:8080/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <Container>
      <Tituloh2>Gerenciar Tarefas</Tituloh2>
      
      {editingTask && (
        <EditForm onSubmit={handleUpdate}>
          <FormGroup>
            <Label>Nome da Tarefa</Label>
            <Input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Descrição</Label>
            <TextArea
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Tipo de Tarefa</Label>
            <div>
              <input
                type="checkbox"
                checked={editForm.semana}
                onChange={(e) => setEditForm({ ...editForm, semana: e.target.checked })}
                id="semanaCheck"
              />
              <label htmlFor="semanaCheck"> Tarefa da Semana</label>
            </div>
          </FormGroup>
          
          <div>
            <SaveButton type="submit">Salvar</SaveButton>
            <CancelButton type="button" onClick={handleCancelEdit}>
              Cancelar
            </CancelButton>
          </div>
        </EditForm>
      )}

<TaskList>
        {tasks.map((task) => (
          <TaskCard key={task.id}> {/* Mudado de task._id.$oid para task.id */}
            <TaskInfo>
              <TaskName>
                {task.name}
                <TaskType semana={task.semana}>
                  {task.semana ? 'Semanal' : 'Diária'}
                </TaskType>
              </TaskName>
              <TaskDescription>{task.description}</TaskDescription>
            </TaskInfo>
            <ActionButtons>
              <Button onClick={() => handleEdit(task)}>
                <i className="material-symbols-outlined">edit</i>
              </Button>
              <Button delete onClick={() => handleDelete(task.id)}> {/* Mudado de task._id.$oid para task.id */}
                <i className="material-symbols-outlined">delete</i>
              </Button>
            </ActionButtons>
          </TaskCard>
        ))}
      </TaskList>
    </Container>
  );
};

export default GerenciarTarefas;