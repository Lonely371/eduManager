package com.example.edumanager.student;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.UUID;

@Data
public class Student {
    private final UUID studentID;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final Gender gender;

    public Student(@JsonProperty("studentID") UUID studentID,
                   @JsonProperty("firstName") String firstName,
                   @JsonProperty("lastName") String lastName,
                   @JsonProperty("email") String email,
                   @JsonProperty("gender") Gender gender) {
        this.studentID = studentID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
    }

    enum Gender {
        MALE, FEMALE
    }
}
