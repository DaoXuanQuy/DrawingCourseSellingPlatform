package vn.fpt.elearning.service.interfaces;

import vn.fpt.elearning.entity.Document;

import java.util.List;

public interface IDocumentService {
    Document getDocumentById(String id);
    Document getDocumentByIdAndCreateBy(String id, String userId);

    Document createDocument(Document document);

    Document updateDocument(Document document);

    void deleteDocumentById(String id);

    List<Document> getByLessonId(String lessonId);

    List<Document> getDocumentForStudent(String lessonId, String userId);

}
