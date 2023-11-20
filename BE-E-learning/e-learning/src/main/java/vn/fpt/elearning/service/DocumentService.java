package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Document;
import vn.fpt.elearning.repository.DocumentRepository;
import vn.fpt.elearning.service.interfaces.IDocumentService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService implements IDocumentService {

    private final DocumentRepository documentRepository;

    @Override
    public Document getDocumentById(String id) {
        return documentRepository.findById(id).orElse(null);
    }

    @Override
    public Document getDocumentByIdAndCreateBy(String id, String userId) {
        return documentRepository.findByIdAndCreatedBy(id, userId);
    }

    @Override
    public Document createDocument(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public Document updateDocument(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public void deleteDocumentById(String id) {
        documentRepository.deleteById(id);
    }

    @Override
    public List<Document> getByLessonId(String lessonId) {
        return documentRepository.findAllByLessonId(lessonId);
    }

    @Override
    public List<Document> getDocumentForStudent(String lessonId, String userId) {
        return documentRepository.findDocumentForStudent(lessonId, userId);
    }

}
