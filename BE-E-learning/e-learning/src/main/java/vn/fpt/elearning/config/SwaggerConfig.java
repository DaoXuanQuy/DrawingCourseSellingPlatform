package vn.fpt.elearning.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.customizers.GlobalOperationCustomizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Objects;

@Configuration
public class SwaggerConfig {
    @Value("${springdoc.server-url}")
    private String serverApi;

    @Bean
    public OpenAPI configSwagger() {
        final String securitySchemeName = "bearerAuth";
        Server server = new Server();
        server.setUrl(serverApi);
        return new OpenAPI().servers(List.of(server))
//            .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
            .components(new Components()
                .addSecuritySchemes(securitySchemeName,
                    new SecurityScheme()
                        .name(securitySchemeName)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                )
            );
//        List<Server> serverList = new ArrayList<>();
//        serverList.add(new Server().url(serverApi));
//        return new OpenAPI()
//            .info(new Info()
//                .title("E-Learning")
//                .description("Document API")
//                .version("v1"))
//            .servers(serverList)
//            .schemaRequirement("bearerAuth", new SecurityScheme()
//                .type(SecurityScheme.Type.HTTP)
//                .scheme("bearer")
//                .bearerFormat("JWT"));
    }

//    @Bean
//    public GlobalOperationCustomizer operationIdCustomizer() {
//        return (operation, handlerMethod) -> {
//            Class<?> superClazz = handlerMethod.getBeanType().getSuperclass();
//            if (Objects.nonNull(superClazz)) {
//                String beanName = handlerMethod.getBeanType().getSimpleName();
//                operation.setOperationId(String.format("%s_%s", beanName, handlerMethod.getMethod().getName()));
//            }
//            return operation;
//        };
//    }
}
