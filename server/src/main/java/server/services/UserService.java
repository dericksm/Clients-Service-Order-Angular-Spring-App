package server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import server.exceptions.UserExistsException;
import server.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        server.entity.User user = repository
                .findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário inexistente."));
        return User.builder().username(user.getUsername()).password(user.getPassword()).roles("USER").build();
    }

    public  server.entity.User save( server.entity.User user) {
        if (repository.existsByUsername(user.getUsername())) {
            throw new UserExistsException(user.getUsername());
        } else {
            return repository.save(user);
        }
    }
}
