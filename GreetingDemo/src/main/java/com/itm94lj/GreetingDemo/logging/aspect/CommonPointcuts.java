package com.itm94lj.GreetingDemo.logging.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CommonPointcuts {

    @Pointcut("execution(public * com.itm94lj.GreetingDemo.controller..*(..))")
    public void controllerInvoke() {}
}
