package com.test.task.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PersonsController {

    @RequestMapping({"/","/home"})
    public String persons(){
        return "persons.html";
    }
}
