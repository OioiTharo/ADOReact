package com.example.gerenciador_tarefas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
public class Task {
    
    @Id
    private String id;
    private String name; 
    private String description;
    private Boolean semana;

    public Task() {
    }

    public Task(String id, String name, String description, Boolean semana) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.semana = semana;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getSemana() {
        return semana;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSemana(Boolean semana) {
        this.semana = semana;
    }
}
