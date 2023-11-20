package vn.fpt.elearning.service.interfaces;

import vn.fpt.elearning.dtos.course.request.DecreaseProgressRequest;
import vn.fpt.elearning.entity.*;


public interface IProgressService {
    DocumentProgress increaseDocumentProgress(Document document, User user);
    ExamProgress increaseExamProgress(Exam exam, User user);
    void decreaseProgress(DecreaseProgressRequest request);
    boolean existsDocumentProgress(String documentId, String userId);
    boolean existsExamProgress(String examId, String userId);
    int getProgressOfCourse(String courseId, String userId);
}
