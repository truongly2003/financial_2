package com.example.financial.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Lob
    @Column(name = "title", nullable = true)
    private String title;
    @Lob
    @Column(name = "message", nullable = true)
    private String message;

    @ColumnDefault("0")
    @Column(name = "read_status")
    private Boolean readStatus;

    @Lob
    @Column(name = "type", nullable = true)
    private String type;

    @Lob
    @Column(name = "link", nullable = true)
    private String link;

    @Lob
    @Column(name = "created_at", nullable = true)
    private LocalDateTime createdAt;




}