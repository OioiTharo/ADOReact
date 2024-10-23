import { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;    
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px;
    align-items: center; /* Corrigido para align-items */
`;

const Input = styled.input`
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 400px;
    font-family: "Jost", sans-serif;
    font-size: 20px;
`;

const TextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 400px;
    font-family: "Jost", sans-serif;
    font-size: 20px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #6ca6a3;
    color: white;
    border: none;
    border-radius: 100px; 
    margin-left: 380px;
`;

const TaskForm = ({ onTaskAdded }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { 
            name: taskName, 
            description: taskDescription  
        };

        try {
            const response = await axios.post('http://localhost:8080/tasks', newTask);
            onTaskAdded(response.data); 
            setTaskName(''); 
            setTaskDescription(''); 
        } catch (error) {
            console.error("Erro ao criar nova tarefa", error);
        }
    };

    return (
        <Container>
            <FormContainer onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Nome da Tarefa"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
                <TextArea
                    placeholder="Descrição da Tarefa...." 
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                />
                <Button type="submit">
                    <i className="material-symbols-outlined">add</i>
                </Button>
            </FormContainer>
        </Container>
    );
};

export default TaskForm;
