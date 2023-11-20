package vn.fpt.elearning.repository.forum;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.fpt.elearning.dtos.forum.category.response.CategoryDetail;
import vn.fpt.elearning.dtos.forum.category.response.CategoryInfo;
import vn.fpt.elearning.entity.forum.ForumCategory;

import java.util.List;

public interface ForumCategoryRepository extends JpaRepository<ForumCategory, String>, JpaSpecificationExecutor<ForumCategory> {

    @Query(name = "findAllList", nativeQuery = true)
    List<CategoryInfo> findAllList();

    @Query(name = "findAllCategoryDetailPaging", nativeQuery = true)
    Page<CategoryDetail> findAllCategoryDetailPaging(@Param("title") String title, @Param("parentId") String parentId, @Param("status") String status, Pageable pageable);
}