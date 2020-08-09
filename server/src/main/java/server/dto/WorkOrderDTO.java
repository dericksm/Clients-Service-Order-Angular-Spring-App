package server.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
public class WorkOrderDTO {

    @NotEmpty(message = "{description.required}")
    public String description;

    @NotEmpty(message = "{value.required}")
    public String value;

    @NotEmpty(message = "{date.required}")
    public String date;

    @NotEmpty(message = "{client.required}")
    public String idClient;
}
