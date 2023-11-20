package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.course.request.DecreaseProgressRequest;
import vn.fpt.elearning.service.interfaces.IProgressService;

@Component
@RequiredArgsConstructor
public class DecreaseProgressHandler extends RequestHandler<DecreaseProgressRequest, StatusResponse> {
    private final IProgressService progressService;
    @Override
    public StatusResponse handle(DecreaseProgressRequest request) {
        progressService.decreaseProgress(request);
        return new StatusResponse(true);
    }
}
