package com.example.messelor.dto;

import lombok.*;
@Data@NoArgsConstructor@AllArgsConstructor
public class MessDto{private String messName;private String messCode;private String description;private String address;private Double monthlyServiceCharge;private Integer maxMembers;private Integer managerId;private Boolean isActive;}
