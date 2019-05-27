package com.test.task.repository;

import com.test.task.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static javafx.scene.input.KeyCode.T;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {


}
