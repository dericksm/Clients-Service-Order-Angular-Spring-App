package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String name);

    boolean existsByUsername(String username);
}
