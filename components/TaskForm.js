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
    align-items: center;
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

const RadioGroup = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const Label = styled.label`
    margin-right: 20px;
    font-family: "Jost", sans-serif;
    font-size: 18px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const CustomRadio = styled.input`
    appearance: none; /* Remove a aparência padrão */
    width: 15px;
    height: 15px;
    border: 2px solid #9c325c;
    border-radius: 50%;
    position: relative;
    margin-right: 10px;
    cursor: pointer;

    &:checked {
        background-color: #9c325c; /* Cor de fundo quando selecionado */
        border-color: #9c325c; /* Cor da borda quando selecionado */
    }

    &:checked::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 5px;
        height: 5px;
        background-color: white; /* Círculo interno branco */
        border-radius: 50%;
    }
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
    const [taskType, setTaskType] = useState('semana');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { 
            name: taskName, 
            description: taskDescription,
            semana: taskType === 'semana'
        };

        try {
            const response = await axios.post('http://localhost:8080/tasks', newTask);
            onTaskAdded(response.data); 
            setTaskName('');
            setTaskDescription('');
            setTaskType('semana');
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
                <RadioGroup>
                    <Label>
                        <CustomRadio
                            type="radio"
                            name="taskType"
                            value="semana"
                            checked={taskType === 'semana'}
                            onChange={(e) => setTaskType(e.target.value)}
                        />
                        Semana
                    </Label>
                    <Label>
                        <CustomRadio
                            type="radio"
                            name="taskType"
                            value="diaria"
                            checked={taskType === 'diaria'}
                            onChange={(e) => setTaskType(e.target.value)}
                        />
                        Diária
                    </Label>
                </RadioGroup>
                <Button type="submit">
                    <i className="material-symbols-outlined">add</i>
                </Button>
            </FormContainer>
        </Container>
    );
};

export default TaskForm;
