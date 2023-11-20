package vn.fpt.elearning.core;

import org.springframework.stereotype.Component;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;

@Component
@SuppressWarnings("unchecked")
public class SpringBus {
    private final Registry registry;

    public <T extends BaseRequestData, I extends BaseResponseData> I execute(T requestData) {
        Handler<T, I> handler = (Handler<T, I>) registry.getRequestHandler(requestData.getClass());
        if (handler == null || handler instanceof UnsupportedRequestHandler) {
            throw new InternalException(ResponseCode.UNHANDLE_REQUEST);
        }
        return handler.handle(requestData);
    }

    public SpringBus(Registry registry) {
        this.registry = registry;
    }
}
