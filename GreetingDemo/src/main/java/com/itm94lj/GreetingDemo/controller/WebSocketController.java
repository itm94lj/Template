package com.itm94lj.GreetingDemo.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @MessageMapping("/hello")
    public String wsHello(String message) throws Exception {
        System.out.println("cmj ws message recv:" + message);
        return message;
    }
}
