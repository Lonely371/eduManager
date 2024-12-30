package com.example.edumanager.student;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Data
@RestController
@RequestMapping("students")
public class StudentController {

    @Autowired
    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() { return studentService.getAllStudents(); }

    @PostMapping
    public void addNewStudent(@RequestBody Student student) {
        studentService.addNewStudent(student);
    }
}
