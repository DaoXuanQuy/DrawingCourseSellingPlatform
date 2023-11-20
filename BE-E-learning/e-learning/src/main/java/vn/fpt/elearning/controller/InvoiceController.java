package vn.fpt.elearning.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.invoice.request.*;
import vn.fpt.elearning.dtos.invoice.response.GetAllInvoiceResponse;
import vn.fpt.elearning.dtos.invoice.response.GetAllWithdrawInvoiceResponse;
import vn.fpt.elearning.enums.PaymentType;
import vn.fpt.elearning.service.course.CourseRegisterStrategy;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.controller.interfaces.IInvoiceController;


import java.util.Map;

@RestController
@RequiredArgsConstructor
public class InvoiceController extends BaseController implements IInvoiceController {
//    private final KPayClient kPayClient;
    private final ICourseService courseService;

//    private <T extends BaseRequestData, I extends BaseResponseData> ResponseEntity<ResponseBase<String>> execute(
//            String clientId,
//            String signature,
//            Long timestamp,
//            String encryptedData,
//            Class<T> requestType) {
//
//        PackedMessage packedMessage = PackedMessage.builder()
//                .clientId(clientId)
//                .timestamp(timestamp)
//                .signature(signature)
//                .encryptedData(encryptedData)
//                .build();
//        T request = kPayClient.getKPayPacker().decode(packedMessage, requestType);
//        request.setClientId(clientId);
//        ResponseEntity<ResponseBase<I>> response = this.execute(request);
//        ResponseBase<I> body = response.getBody();
//        if (body == null) {
//            throw new InternalException(ResponseCode.TRANSACTION_FAILED);
//        }
//        I data = body.getData();
//        PackedMessage packedResponse = kPayClient.getKPayPacker().encode(data);
//        return this.buildResponse(packedResponse);
//    }

//    @Override
//    public ResponseEntity<ResponseBase<String>> notifyInvoice(String clientId, String signature, Long timestamp, EncryptedBodyRequest request) {
//        return this.execute(clientId, signature, timestamp, request.getData(), NotifyKLBPayRequest.class);
//    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> notifyVNPay(Map<String, String> request) {
        CourseRegisterStrategy registerStrategy = courseService.getRegisterStrategy(PaymentType.VNPAY);
        if (registerStrategy.confirm(new NotifyVNPayRequest(request), null)) {
            return ResponseEntity.ok(new ResponseBase<>(new StatusResponse(true)));
        }
        return ResponseEntity.ok(new ResponseBase<>(new StatusResponse(true)));
    }

    @Override
    public ResponseEntity<ResponseBase<GetAllInvoiceResponse>> getAll(GetAllInvoiceRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetAllInvoiceResponse>> teacherGetAll(TeacherGetAllInvoiceRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetAllWithdrawInvoiceResponse>> teacherGetAllWithdrawInvoice(TeacherGetAllWithdrawInvoiceRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetAllWithdrawInvoiceResponse>> cmsGetAllWithdrawInvoice(CmsGetAllWithdrawInvoiceRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetAllInvoiceResponse>> cmsGetAll(CmsGetAllInvoiceRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request);
    }


}
