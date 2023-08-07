package com.itm94lj.GreetingDemo.logging.aspect;

import com.alibaba.fastjson.JSON;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Aspect
@Component
public class CommonAdvise {

    @Around("com.itm94lj.GreetingDemo.logging.aspect.CommonPointcuts.controllerInvoke()")
    public Object doControllerLogging(ProceedingJoinPoint pjp) throws Throwable{
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        Object    retVal;

        if (null != attributes) {
            HttpServletRequest request = attributes.getRequest();

            Signature signature = pjp.getSignature();
            MethodSignature methodSignature = (MethodSignature) signature;
            Method targetMethod = methodSignature.getMethod();

            Object[] objects = pjp.getArgs();
            List<Object> logArgs = Arrays.stream(objects)
                    .filter( arg -> (!(arg instanceof HttpServletRequest) && !(arg instanceof HttpServletResponse)))
                    .collect(Collectors.toList());

            long       start = System.nanoTime();
            retVal = pjp.proceed();
            long      finish = System.nanoTime();
            double    timeElapsed = (double)(finish - start)/ 1_000_000.0;

            StringBuilder sb = new StringBuilder(1000);

            sb.append("================================================================================\n");
            sb.append("Controller:").append(targetMethod.getDeclaringClass().getName()).append("\n");
            sb.append("Method    :").append(targetMethod.getName()).append("\n");
            sb.append("Params    :").append(JSON.toJSONString(logArgs)).append("\n");
            sb.append("URI       :").append(request.getRequestURI()).append("\n");
            sb.append("URL       :").append(request.getRequestURL()).append("\n");
            sb.append("Return    :").append(JSON.toJSONString(retVal)).append("\n");
            sb.append("Cost      :").append(timeElapsed).append(" milliseconds\n");
            sb.append("================================================================================\n");
            System.out.println(sb);
        } else {
            retVal = pjp.proceed();
        }


        return retVal;
    }
}
