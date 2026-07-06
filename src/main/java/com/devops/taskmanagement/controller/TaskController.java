package com.devops.taskmanagement.controller;

import com.devops.taskmanagement.model.Task;
import com.devops.taskmanagement.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service){
        this.service=service;
    }

    @GetMapping
    public List<Task> getTasks(){
        return service.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable Long id){
        return service.getTaskById(id);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return service.addTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,@RequestBody Task task){
        return service.updateTask(id,task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id){
        service.deleteTask(id);
        return "Task Deleted Successfully";
    }

}