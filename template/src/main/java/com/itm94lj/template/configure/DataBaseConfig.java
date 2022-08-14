package com.itm94lj.template.configure;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.sql.DataSource;

@Configuration
public class DataBaseConfig {

    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() {

        return DataSourceBuilder.create()
                .build();
    }
}
