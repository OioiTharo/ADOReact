package com.example.gerenciador_tarefas.controller;

import com.example.gerenciador_tarefas.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
            
        // Permitir requisições OPTIONS passar direto
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
            return;
        }

        // Verificar se é uma rota pública
        String path = request.getRequestURI();
        if (isPublicRoute(path, request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Verificar token JWT
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String userId = authService.validateToken(token);
            
            if (userId != null) {
                request.setAttribute("userId", userId);
                filterChain.doFilter(request, response);
                return;
            }
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }

    private boolean isPublicRoute(String path, String method) {
        return path.contains("/api/auth/login") || 
               (path.contains("/api/users") && "POST".equals(method)) ||
               path.contains("/error");
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.contains("/error");
    }
}