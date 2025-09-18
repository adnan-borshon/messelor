package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "meal_food_item")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MealFoodItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer meal_food_id;
    @ManyToOne
    @JoinColumn(name = "meal_log_id")
    private MealLog meal_log;
    @ManyToOne
    @JoinColumn(name = "food_item_id")
    private FoodItem food_item;
    private Double quantity;
    private String unit;
    private Double calories_consumed;
    private Double protein_consumed;
    private Double carbs_consumed;
    private Double fat_consumed;
    private Double fiber_consumed;
}
