package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "meal_type")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MealType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer meal_type_id;
    @Column(nullable = false)
    private String type; // Breakfast/Lunch/Dinner
    private String meal_name;
    private Boolean is_active;
}
