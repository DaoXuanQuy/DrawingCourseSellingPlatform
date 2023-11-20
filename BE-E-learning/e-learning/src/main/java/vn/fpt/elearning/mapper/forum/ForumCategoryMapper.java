package vn.fpt.elearning.mapper.forum;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import vn.fpt.elearning.core.converter.*;
import vn.fpt.elearning.dtos.forum.category.request.CreateCategoryRequest;
import vn.fpt.elearning.dtos.forum.category.request.UpdateCategoryRequest;
import vn.fpt.elearning.dtos.forum.category.response.CategoryDetail;
import vn.fpt.elearning.dtos.forum.category.response.CategoryInfo;
import vn.fpt.elearning.entity.forum.ForumCategory;


@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ForumCategoryMapper extends
        FromCreateRequestToEntity<CreateCategoryRequest, ForumCategory>,
        FromUpdateRequestToEntity<UpdateCategoryRequest, ForumCategory>,
        FromEntityToDetail<CategoryDetail, ForumCategory>,
        FromEntityListToInfoList<CategoryInfo, ForumCategory>,
        FromEntityPageToInfoPage<CategoryInfo, ForumCategory>,
        FromEntityPageToDetailPage<CategoryDetail, ForumCategory> {
    @Override
    default CategoryDetail fromEntityToDetail(ForumCategory entity) {
        return null;
    }
}
