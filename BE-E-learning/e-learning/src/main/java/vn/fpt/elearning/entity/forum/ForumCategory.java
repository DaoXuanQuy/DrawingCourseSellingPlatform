package vn.fpt.elearning.entity.forum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.*;
import vn.fpt.elearning.dtos.forum.category.response.CategoryDetail;
import vn.fpt.elearning.dtos.forum.category.response.CategoryInfo;
import vn.fpt.elearning.entity.Auditable;
import vn.fpt.elearning.enums.forum.ForumCategoryStatus;

import javax.persistence.Entity;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.Table;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "forum_category")
@FieldNameConstants
@Accessors(chain = true)
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "findAllList",
                resultSetMapping = "Mapping.CategoryInfo",
                query = "SELECT c.id, c.title, c.description, COALESCE(SUM(t.topic_number), 0) AS topic_number, COALESCE(SUM(t.post_number), 0) AS post_number, c.parent_id " +
                        "FROM forum_category c " +
                        "LEFT JOIN(" +
                        "    SELECT t.category_id AS category_id, COUNT(t.id) AS topic_number, p.post_number" +
                        "    FROM forum_topic t" +
                        "    LEFT JOIN(" +
                        "        SELECT p.topic_id  AS topic_id, COUNT(p.id) AS post_number" +
                        "        FROM forum_post p" +
                        "        GROUP BY p.topic_id" +
                        "    ) AS p ON t.id = p.topic_id" +
                        "    GROUP BY t.category_id, p.post_number" +
                        ") AS t ON c.id = t.category_id " +
                        "WHERE c.status = 'ACTIVE' " +
                        "GROUP BY c.id"
        ),
        @NamedNativeQuery(
                name = "findAllCategoryDetailPaging",
                resultSetMapping = "Mapping.CategoryDetail",
                query = "SELECT c.id, c.title, c.description, COALESCE(SUM(t.topic_number), 0) AS topic_number, COALESCE(SUM(t.post_number), 0) AS post_number, c.parent_id, c.status " +
                        "FROM forum_category c " +
                        "LEFT JOIN(" +
                        "    SELECT t.category_id AS category_id, COUNT(t.id) AS topic_number, p.post_number" +
                        "    FROM forum_topic t" +
                        "    LEFT JOIN(" +
                        "        SELECT p.topic_id  AS topic_id, COUNT(p.id) AS post_number" +
                        "        FROM forum_post p" +
                        "        GROUP BY p.topic_id" +
                        "    ) AS p ON t.id = p.topic_id" +
                        "    GROUP BY t.category_id, p.post_number" +
                        ") AS t ON c.id = t.category_id " +
                        "WHERE 1 = 1" +
                        "   AND (:status IS NULL OR c.status=:status)" +
                        "   AND (:title IS NULL OR :title = '' OR c.title LIKE CONCAT('%', :title, '%'))" +
                        "   AND (c.parent_id=:parentId OR (:parentId is null and c.parent_id is null ) )" +
                        "GROUP BY c.id"
        )
})

@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "Mapping.CategoryInfo",
                classes = @ConstructorResult(
                        targetClass = CategoryInfo.class,
                        columns = {
                                @ColumnResult(name = "id", type = String.class),
                                @ColumnResult(name = "title", type = String.class),
                                @ColumnResult(name = "description", type = String.class),
                                @ColumnResult(name = "topic_number", type = Long.class),
                                @ColumnResult(name = "post_number", type = Long.class),
                                @ColumnResult(name = "parent_id", type = String.class)
                        }
                )
        ),
        @SqlResultSetMapping(
                name = "Mapping.CategoryDetail",
                classes = @ConstructorResult(
                        targetClass = CategoryDetail.class,
                        columns = {
                                @ColumnResult(name = "id", type = String.class),
                                @ColumnResult(name = "title", type = String.class),
                                @ColumnResult(name = "description", type = String.class),
                                @ColumnResult(name = "topic_number", type = Long.class),
                                @ColumnResult(name = "post_number", type = Long.class),
                                @ColumnResult(name = "parent_id", type = String.class),
                                @ColumnResult(name = "status", type = String.class)
                        }
                )
        )
})
public class ForumCategory extends Auditable<String> {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(name = "title", columnDefinition = "VARCHAR(1000)", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ForumCategoryStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private ForumCategory parentCategory;

    @OneToMany(mappedBy = "parentCategory", orphanRemoval = true)
    @Cascade({CascadeType.REMOVE})
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<ForumCategory> subCategories = new ArrayList<>();

    @OneToMany(mappedBy = "category", orphanRemoval = true)
    @Cascade({CascadeType.REMOVE})
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<ForumTopic> topics = new ArrayList<>();
}
