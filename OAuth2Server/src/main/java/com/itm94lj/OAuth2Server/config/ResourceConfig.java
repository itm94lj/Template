package com.itm94lj.OAuth2Server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class ResourceConfig  implements WebMvcConfigurer {
    private static final String[] CLASS_PATH_RESOURCE_LOCATIONS =
            {
                    "classpath:/META-INF/resources",
                    "classpath:/resources",
                    "classpath:/static",
                    "classpath:/resources/static",
                    "classpath:/META-INF/resources/static",
            };

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        System.out.println("cmj addResourceHandlers");
        registry.addResourceHandler("/**")
                .addResourceLocations(CLASS_PATH_RESOURCE_LOCATIONS);
    }
}
