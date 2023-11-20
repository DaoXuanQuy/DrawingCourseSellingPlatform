package vn.fpt.elearning.service.interfaces;

import vn.fpt.elearning.entity.Comment;

public interface ICommentService {
    Comment save(Comment comment);
    Comment getByIdNotNull(String id);
    void deleteById(String id);
}
