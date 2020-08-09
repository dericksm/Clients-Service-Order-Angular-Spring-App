package server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import server.entity.Client;
import server.repository.ClientRepository;

@SpringBootApplication
@RestController
public class SellApplication {

    public static void main(String[] args) {
        SpringApplication.run(SellApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(@Autowired ClientRepository repository){
        return args -> {
            Client client = Client.builder().cpf("07088474980").name("Derick").build();
            repository.save(client);
        };
    }
}
