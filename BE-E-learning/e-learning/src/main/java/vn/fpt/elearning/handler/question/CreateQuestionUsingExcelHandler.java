package vn.fpt.elearning.handler.question;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.question.request.CreateQuestionFromExcelRequest;
import vn.fpt.elearning.dtos.question.response.CreateQuestionFromExcelResponse;
import vn.fpt.elearning.service.interfaces.IExamService;
import vn.fpt.elearning.service.interfaces.IQuestionService;

@Component
@RequiredArgsConstructor
@Slf4j
public class CreateQuestionUsingExcelHandler extends RequestHandler<CreateQuestionFromExcelRequest, CreateQuestionFromExcelResponse> {
    private final IQuestionService questionService;
    private final IExamService examService;
    private static final String CONTENT_TYPE_FILE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    @Override
    public CreateQuestionFromExcelResponse handle(CreateQuestionFromExcelRequest request) {
//        log.info("content type file: {}", request.getQuestions().getContentType());
//        if (!Objects.equals(request.getQuestions().getContentType(), CONTENT_TYPE_FILE)) {
//            throw new InternalException(ResponseCode.FILE_QUESTION_INCORRECT_FORMAT);
//        }
//        Exam exam = examService.getExamById(request.getExamId());
//        if (exam == null) {
//            throw new InternalException(ResponseCode.EXAM_NOT_FOUND);
//        }
//        try {
//            XSSFWorkbook data = new XSSFWorkbook(request.getQuestions().getInputStream());
//            XSSFSheet worksheet = data.getSheetAt(0);
//            int totalRow = Math.min(exam.getQuestionTotal() + 1, worksheet.getPhysicalNumberOfRows());
//            for (int i = 1; i <= totalRow; i++) {
//                XSSFRow row = worksheet.getRow(i);
//
//                Question question = new Question();
//                question.setExam(exam);
//                question.setQuestionNo((int) row.getCell(0).getNumericCellValue());
//                question.setQuestionName(row.getCell(1).getStringCellValue());
//                question.setOptionA(row.getCell(2).getStringCellValue());
//                question.setOptionB(row.getCell(3).getStringCellValue());
//                question.setOptionC(row.getCell(4).getStringCellValue());
//                question.setOptionD(row.getCell(5).getStringCellValue());
//                question.setCorrect(row.getCell(6).getStringCellValue());
//                question.setPoint((float) row.getCell(7).getNumericCellValue());
//
//                questionService.createQuestion(question);
//            }
            return new CreateQuestionFromExcelResponse(true);
//        } catch (IOException e) {
//            log.error(e.getMessage());
//            questionService.deleteQuestionByExam(exam);
//            return new CreateQuestionFromExcelResponse(false);
//        }
    }
}
