package com.api.exptracker.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("Could not find the values with the id: " + id);
    }
}

