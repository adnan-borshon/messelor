package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "food_item")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer food_item_id;
    private String item_name;
    @Column(unique = true)
    private String item_code;
    @Column(columnDefinition = "text")
    private String description;
    private Integer category_id;
    private Double calories_per_100g;
    private Double protein_per_100g;
    private Double carbs_per_100g;
    private Double fat_per_100g;
    private Double fiber_per_100g;
    private Double sugar_per_100g;
    private Double sodium_per_100g;
    private String default_unit;
    private Boolean is_active;
}
