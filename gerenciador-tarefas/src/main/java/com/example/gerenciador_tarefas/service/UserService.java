package com.example.gerenciador_tarefas.service;

import com.example.gerenciador_tarefas.model.User;
import com.example.gerenciador_tarefas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> updateUser(String id, User userDetails) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setUsuario(userDetails.getUsuario());
                    existingUser.setEmail(userDetails.getEmail());
                    existingUser.setSenha(userDetails.getSenha());
                    return userRepository.save(existingUser);
                });
    }

    public boolean deleteUser(String id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return true;
                })
                .orElse(false);
    }
}