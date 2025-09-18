package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "mess_member")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mess_member_id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "mess_id")
    private Mess mess;
    private LocalDate joined_date;
    private LocalDate left_date;
    private Boolean is_active;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
