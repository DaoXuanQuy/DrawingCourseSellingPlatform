package vn.fpt.elearning.core;


import lombok.RequiredArgsConstructor;
import org.springframework.core.GenericTypeResolver;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@SuppressWarnings("unchecked")
@RequiredArgsConstructor
public class Registry {
    private static final Map<Class<? extends BaseRequestData>, Handler<? extends BaseRequestData, ? extends BaseResponseData>> COMMAND_HANDLER_MAP = new ConcurrentHashMap<>();

    private final List<Handler<? extends BaseRequestData, ? extends BaseResponseData>> requestHandlers;

    @PostConstruct
    public void postConstruct() {
        for (var handler : requestHandlers) {
            var requestTypes = GenericTypeResolver.resolveTypeArguments(handler.getClass(), Handler.class);
            Class<?> commandType = requestTypes[0];
            COMMAND_HANDLER_MAP.put((Class<? extends BaseRequestData>) commandType, handler);
        }
    }

    public <R extends BaseRequestData> Handler<? extends BaseRequestData, ? extends BaseResponseData> getRequestHandler(Class<R> requestCommandClass) {
        Handler<? extends BaseRequestData, ? extends BaseResponseData> requestHandler = COMMAND_HANDLER_MAP.get(requestCommandClass);
        return (requestHandler == null ? UnsupportedRequestHandler.getInstance() : requestHandler);
    }

}