package com.itm94lj.template.signin;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
public class SigninController {
    @GetMapping("/user")
    public Principal signin(Principal user)
    {
        System.out.println("signin principal:" + user);
        return user;
    }

    @GetMapping("/logout")
    public void logout()
    {
        System.out.println("logout invoked.");
        return ;
    }

    @Configuration
    @Order(SecurityProperties.BASIC_AUTH_ORDER)
    protected static class SecurityConfituration extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .httpBasic()
                    .and()
                    .authorizeRequests()
                    .antMatchers("/", "/signin", "/user", "/greeting", "/logout").permitAll()
                    .anyRequest().authenticated()
                    .and()
                    .csrf()
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())

            ;
        }
    }

    @Bean
    public UserDetailsService users() {
        User.UserBuilder userBuilder = User.withDefaultPasswordEncoder();
        UserDetails users = userBuilder
                .username("itm94lj@163.com")
                .password("000000")
                .roles("USER")
                .build();
        UserDetails admin = userBuilder
                .username("itm94lj@126.com")
                .password("000000")
                .roles("USER", "ADMIN")
                .build();
        return new InMemoryUserDetailsManager(users, admin);
    }
}
