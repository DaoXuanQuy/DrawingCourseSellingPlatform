package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Comment;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.repository.CommentRepository;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICommentService;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {
    private final CommentRepository commentRepository;
    @Override
    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Comment getByIdNotNull(String id) {
        return commentRepository.findById(id)
            .orElseThrow(() -> new InternalException(ResponseCode.COMMENT_NOT_FOUND));
    }

    @Override
    public void deleteById(String id) {
        commentRepository.deleteById(id);
    }
}
