package com.example.gerenciador_tarefas.repository;

import com.example.gerenciador_tarefas.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
 
}