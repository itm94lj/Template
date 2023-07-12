package com.itm94lj.eureka_server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ServiceInstanceRestController {
    @Autowired
    private DiscoveryClient discoveryClient;

    @RequestMapping("/service-instances/{applicationName}")
    public List<ServiceInstance> serviceInstanceByApplicationName(
            @PathVariable String applicationName
    ) {
        List<ServiceInstance> resultList = this.discoveryClient.getInstances(applicationName);
        System.out.println("ResultList size:[" + resultList.size() + "].");
        return resultList;
    }



}
