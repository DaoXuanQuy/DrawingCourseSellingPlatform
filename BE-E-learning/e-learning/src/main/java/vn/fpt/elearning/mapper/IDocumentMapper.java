package vn.fpt.elearning.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import vn.fpt.elearning.entity.Document;
import vn.fpt.elearning.model.DocumentDto;

import java.util.List;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING
)
public interface IDocumentMapper {

    DocumentDto toDocumentDto(Document document);
    List<DocumentDto> toListDocumentDto(List<Document> documents);
}
