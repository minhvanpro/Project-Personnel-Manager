package com.minhvan.personnel;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000")
//                .allowedMethods("PUT", "DELETE", "GET", "OPTIONS", "POST")
//                .allowedHeaders("Origin", "Accept", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization","Content-Range")
//        ;
        registry.addMapping("/**")
          .allowedOrigins("*")
          .allowedMethods("*")
          .allowedHeaders("*")
          .exposedHeaders("Access-Control-Expose-Headers","Content-Range");
    }

    @Bean
    public ObjectMapper objectMapper(){
        return new ObjectMapper();
    }

}
