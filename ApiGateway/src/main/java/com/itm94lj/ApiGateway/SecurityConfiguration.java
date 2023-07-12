package com.itm94lj.ApiGateway;

import org.springframework.cloud.gateway.filter.factory.TokenRelayGatewayFilterFactory;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.*;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.web.server.SecurityWebFilterChain;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfiguration {
    @Bean
    KeyResolver userKeyResolver() {
        List<String> defaultList = new ArrayList<String>();
        defaultList.add("no-auth");
//        return exchange -> Mono.just(exchange.getRequest())
//                .map((request) -> {
//                    System.out.println("attributes:["+ JSON.toJSONString(request)+"].");
//                    String remoteAddr = request.getRemoteAddress().getAddress().toString();
//                    System.out.println("Remote address is:"+remoteAddr);
//                    return remoteAddr;
//                })
//                ;

        return exchange -> exchange.getPrincipal()
                .map(principal -> principal.getName())
                .map(name-> {
                    System.out.println("principal name:["+name+"].");
                    return name;});
    }

    @Bean
    RedisRateLimiter redisRateLimiter() {
        return new RedisRateLimiter(1,2);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder, TokenRelayGatewayFilterFactory filterFactory) {
        return builder.routes()
                .route(r -> r.path("/greeting**")
                        .filters(f -> f.requestRateLimiter(c -> c.setRateLimiter(redisRateLimiter())
                                .setKeyResolver(userKeyResolver()))
                                .filters(filterFactory.apply())
                                .removeRequestHeader("Cookie")
                        )
                        .uri("lb://greeting-service"))
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