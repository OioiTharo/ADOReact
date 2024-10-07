package com.example.gerenciador_tarefas.service;

import com.example.gerenciador_tarefas.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>(); // Lista de tarefas simulando um banco de dados em memória

    // Retorna todas as tarefas
    public List<Task> getAllTasks() {
        return tasks;
    }

    // Cria uma nova tarefa e a adiciona à lista
    public Task createTask(Task task) {
        tasks.add(task);
        return task; // Retorna a tarefa recém-criada
    }

    // Se necessário, você pode adicionar mais métodos, como deletar ou atualizar uma tarefa
}
