package com.example.gerenciador_tarefas.controller;

import com.example.gerenciador_tarefas.model.Task;
import com.example.gerenciador_tarefas.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        Task savedTask = taskRepository.save(task);
        return ResponseEntity.ok(savedTask);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable String id) {
        taskRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task task) {
        return taskRepository.findById(id)
            .map(existingTask -> {
                existingTask.setName(task.getName());
                existingTask.setDescription(task.getDescription());
                existingTask.setSemana(task.getSemana()); // Alterado de isSemana() para getSemana()
                Task updatedTask = taskRepository.save(existingTask);
                return ResponseEntity.ok(updatedTask);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
