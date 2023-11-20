package vn.fpt.elearning.handler.ekyc;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.common.Constant;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.ekyc.request.DetectIdCardRequest;
import vn.fpt.elearning.dtos.ekyc.response.DetectIdCardResponse;
import vn.fpt.elearning.entity.Ekyc;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.IEkycMapper;
import vn.fpt.elearning.model.IdCardModel;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.MinIOService;
import vn.fpt.elearning.service.interfaces.IEkycService;

import javax.transaction.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DetectIdCardHandler extends RequestHandler<DetectIdCardRequest, DetectIdCardResponse> {
    private final IEkycService ekycService;
    private final IEkycMapper ekycMapper;
    private final MinIOService minIOService;

    @Override
    @Transactional
    public DetectIdCardResponse handle(DetectIdCardRequest request) {
        MultipartFile imageFront = request.getImageFront();
        MultipartFile imageBack = request.getImageBack();

        IdCardModel idCardModel = ekycService.detectIdCard(imageFront, imageBack);
        Ekyc ekyc = ekycMapper.idCardModelToEkyc(idCardModel);
        log.debug("data detect ekyc: {}", ekyc);

        // upload image to minio
        long timestamp = System.currentTimeMillis();
        String extensionFront = FilenameUtils.getExtension(imageFront.getOriginalFilename());
        String extensionBack = FilenameUtils.getExtension(imageBack.getOriginalFilename());
        String imageFrontUrl = String.format("%s_%s.%s", imageFront.getResource().getFilename(), timestamp, extensionFront);
        String imageBackUrl = String.format("%s_%s.%s", imageBack.getResource().getFilename(), timestamp, extensionBack);

        String objectFront = Constant.getOCRObjectName(imageFrontUrl);
        String objectBack = Constant.getOCRObjectName(imageBackUrl);
        try {
            objectFront = minIOService.uploadFile(objectFront, imageFront.getBytes(), extensionFront, false);
            objectBack = minIOService.uploadFile(objectBack, imageBack.getBytes(), extensionBack, false);
        } catch (Exception ex) {
            log.error("Upload file to minio service error: {}", ex.getMessage());
            throw new InternalException(ResponseCode.UPLOAD_FILE_FAILED);
        }

        Ekyc ekycOld = ekycService.getByUserId(request.getUserId());
        if (ekycOld != null) {
            ekyc.setId(ekycOld.getId());
        }
        ekyc.setFrontUrl(objectFront);
        ekyc.setBackUrl(objectBack);
        Ekyc ekycSave = ekycService.save(ekyc);
        return new DetectIdCardResponse(ekycMapper.toEkycDTO(ekycSave));
    }
}
