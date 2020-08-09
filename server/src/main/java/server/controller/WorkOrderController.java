package server.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import server.dto.WorkOrderDTO;
import server.entity.Client;
import server.entity.WorkOrder;
import server.repository.ClientRepository;
import server.repository.WorkOrderRepository;
import server.server.util.BigDecimalConverter;

import javax.validation.Valid;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/work-orders")
public class WorkOrderController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private WorkOrderRepository workOrderRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkOrder save(@RequestBody @Valid WorkOrderDTO payload){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("YYYY-MM-dd");
        Client client = clientRepository.findById(Integer.parseInt(payload.getIdClient())).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,  "Cliente não encontrado"));
        WorkOrder order = new WorkOrder();
        order.setDescription(payload.getDescription());
        order.setDate(ZonedDateTime.parse(payload.getDate()));
        order.setClient(client);
        order.setValue(BigDecimalConverter.converter(payload.getValue()));

        return workOrderRepository.save(order);
    }

    @GetMapping
    public List<WorkOrder> search(@RequestParam(value = "name", required = false, defaultValue = "") String name, @RequestParam(value = "month", required = false) Integer month) {
        return workOrderRepository.findbyNameAndMonth( "%" + name + "%", month);
    }
}
