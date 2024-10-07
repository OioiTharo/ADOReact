package com.example.gerenciador_tarefas.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Gera getters, setters, toString, equals e hashCode
@NoArgsConstructor // Gera um construtor sem argumentos
@AllArgsConstructor // Gera um construtor com todos os campos
@Document(collection = "tasks")
public class Task {

    @Id
    private String id;
    private String title;
    private String description;
}
