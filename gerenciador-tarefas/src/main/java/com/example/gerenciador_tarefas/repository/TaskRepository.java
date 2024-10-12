package com.example.gerenciador_tarefas.repository;

import com.example.gerenciador_tarefas.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface TaskRepository extends MongoRepository<Task, String> {
}
