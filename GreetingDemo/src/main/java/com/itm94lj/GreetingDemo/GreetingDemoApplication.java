package com.itm94lj.GreetingDemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@EntityScan
@SpringBootApplication
public class GreetingDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreetingDemoApplication.class, args);
	}

}
