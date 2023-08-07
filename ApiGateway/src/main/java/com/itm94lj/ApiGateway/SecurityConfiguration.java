package com.itm94lj.ApiGateway;

import com.alibaba.fastjson.JSON;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class SecurityConfiguration {
    @Bean
    KeyResolver userKeyResolver() {
        List<String> defaultList = new ArrayList<String>();
        defaultList.add("no-auth");
        return exchange -> Mono.just(exchange.getRequest())
                .map((request) -> {
                    System.out.println("attributes:["+ JSON.toJSONString(request)+"].");
                    String remoteAddr = request.getRemoteAddress().getAddress().toString();
                    System.out.println("Remote address is:"+remoteAddr);
                    return remoteAddr;
                })
                ;

//        return exchange -> exchange.getPrincipal()
//                .map(principal -> principal.getName())
//                .map(name-> {
//                    System.out.println("principal name:["+name+"].");
//                    return name;});
    }

    @Bean
    RedisRateLimiter redisRateLimiter() {
        return new RedisRateLimiter(1000,2000);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r -> r.path("/greeting-service/**")
                        .filters(f -> f.requestRateLimiter(c -> c
//                                        .setRateLimiter(redisRateLimiter())
                                .setKeyResolver(userKeyResolver()))
                                .removeRequestHeader("Cookie")
                        )
                        .uri("lb://greeting-service"))
                .route(r -> r.path("/greeting-oauth2-service/**")
                        .uri("lb://greeting-oauth2-service")
                )
                .build();
    }
//
//    @Bean
//    SecurityWebFilterChain springWebFilterChain(ServerHttpSecurity http) throws Exception {
//
//        return http
//                .csrf(csrf -> csrf.disable())
//                .authorizeExchange(authorizeExchangeSpec ->
//                        authorizeExchangeSpec
//                                .anyExchange()
//                                .authenticated())
//                .cors(cors -> cors.disable())
//                .build();
//    }
}
