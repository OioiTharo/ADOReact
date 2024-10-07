package com.example.gerenciador_tarefas.repository;

import com.example.gerenciador_tarefas.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {
    // Você pode adicionar métodos personalizados aqui, se necessário
}
