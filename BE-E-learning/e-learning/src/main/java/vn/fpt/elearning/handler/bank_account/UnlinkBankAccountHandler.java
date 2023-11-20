package vn.fpt.elearning.handler.bank_account;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.bank_account.request.UnlinkBankAccountRequest;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ITeacherService;

@Component
@RequiredArgsConstructor
public class UnlinkBankAccountHandler extends RequestHandler<UnlinkBankAccountRequest, StatusResponse> {

    private final ITeacherService teacherService;

    @Override
    public StatusResponse handle(UnlinkBankAccountRequest request) {
        Teacher teacher = teacherService.getByUserId(request.getUserId());
        if (teacher.checkLinkedAccount()) {
            teacher.setAccountNo(null)
                .setAccountName(null)
                .setBin(null);
            teacherService.save(teacher);
            return new StatusResponse(true);
        }
        throw new InternalException(ResponseCode.BANK_ACCOUNT_NOT_FOUNT);
    }
}
