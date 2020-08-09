package server.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Data
public class WorkOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 150)
    private String description;

    @Column
    private BigDecimal value;

    @Column
    private ZonedDateTime date;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

}
