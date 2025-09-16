package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vendor")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer vendor_id;
    private String vendor_name;
    @Column(columnDefinition = "text")
    private String address;
    @Enumerated(EnumType.STRING)
    private VendorType vendor_type;
    private LocalDateTime created_at;

    public enum VendorType {
        Grocery, Vegetable, Meat, Dairy, Fish, Other
    }
}
