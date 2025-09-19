package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mess_admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mess_admin_id")
    private Integer messAdminId;

    @ManyToOne
    @JoinColumn(name = "mess_id", referencedColumnName = "mess_id", nullable = false)
    private Mess mess;

    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "user_id", nullable = false)
    private User admin;

    @Builder.Default
    @Column(name = "assigned_date")
    private LocalDateTime assignedDate = LocalDateTime.now();
}
