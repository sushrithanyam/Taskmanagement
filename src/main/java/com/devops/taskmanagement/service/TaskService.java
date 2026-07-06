package com.devops.taskmanagement.service;

import com.devops.taskmanagement.model.Task;
import com.devops.taskmanagement.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task getTaskById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Task addTask(Task task) {
        return repo.save(task);
    }

    public Task updateTask(Long id, Task task) {
        task.setId(id);
        return repo.save(task);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }
}