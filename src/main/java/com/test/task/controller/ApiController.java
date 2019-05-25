package com.test.task.controller;

import com.test.task.model.Person;
import com.test.task.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/persons")
public class ApiController {

    @Autowired
    private PersonRepository personRepository;

    @GetMapping("/get-all")
    public List<Person> getAllPersons(){
        return personRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public Optional<Person> getPersonById(@PathVariable(value = "id") Integer personId) throws ResponseStatusException {
        if(personRepository.existsById(personId))
            return personRepository.findById(personId);
        else throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Персоны с таким id нету");
    }

    @PostMapping("/add")
    public Person createPerson(@Valid @RequestBody Person person) throws ResponseStatusException {
        if(person.getId() != null){
            if(personRepository.existsById(person.getId()))
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Персона с таким id уже есть");
        }
        return personRepository.save(person);
    }

    @PostMapping("/update")
    public Person updatePerson(@Valid @RequestBody Person person)  throws ResponseStatusException {

        if(!personRepository.existsById(person.getId()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Персоны с таким id нет");
        return personRepository.save(person);
    }

    @GetMapping("/delete/{id}")
    public void deletePersonById(@PathVariable(value = "id") Integer personId) throws ResponseStatusException {

        if(personRepository.existsById(personId))
            personRepository.deleteById(personId);
         else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Персоны с таким id нет");
    }

    @PostMapping("/array")
    public List<Person> operateWithArray(@RequestBody Integer[] array) {

        List<Person> result = new ArrayList<>();

        ExecutorService executor = Executors.newFixedThreadPool(array.length);
        for(int id : array) {
            executor.execute(() -> {
                if (personRepository.existsById(id)) {
                    Person person = personRepository.findById(id).get();
                    person.setComment("Обработано [" + LocalDate.now() + "]");
                    person.setUpdateDate(OffsetDateTime.now());
                    personRepository.save(person);
                    result.add(person);
                }
            });
        }
        executor.shutdown();
        while (!executor.isTerminated()) {
        }
        return result;
    }
}
