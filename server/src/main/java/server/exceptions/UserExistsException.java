package server.exceptions;

public class UserExistsException extends RuntimeException {
    public UserExistsException(String error){
        super("Usuário já cadastrado.");
    }
}
