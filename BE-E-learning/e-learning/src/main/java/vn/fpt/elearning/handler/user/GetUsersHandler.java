package vn.fpt.elearning.handler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.user.request.GetUsersRequest;
import vn.fpt.elearning.dtos.user.response.GetUsersResponse;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.mapper.IUserMapper;
import vn.fpt.elearning.model.UserResponse;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.service.interfaces.IUserService;
import vn.fpt.elearning.service.specifications.UserSpecification;

import java.util.List;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class GetUsersHandler extends RequestHandler<GetUsersRequest, GetUsersResponse> {
    private final IUserService userService;
    private final UserSpecification userSpecification;
    private final IUserMapper userMapper;

    @Override
    public GetUsersResponse handle(GetUsersRequest request) {
        Specification<User> specification = Specification.where(userSpecification.likeFirstName(request.getFirstName()))
            .and(userSpecification.equalBirthday(request.getBirthday()))
            .and(userSpecification.likeLastName(request.getLastName()))
            .and(userSpecification.equalGender(request.getGender()))
            .and(userSpecification.equalPhone(request.getPhone()))
            .and(userSpecification.likeCity(request.getCity()))
            .and(userSpecification.equalHomeNumber(request.getHomeNumber()))
            .and(userSpecification.likeDistrict(request.getDistrict()))
            .and(userSpecification.likeEmail(request.getEmail())
                .and(userSpecification.likeStreetName(request.getStreetName())))
            .and(userSpecification.likeWards(request.getWards()));
        Page<User> page = userService.getUsers(specification, request.getPageable());
        List<UserResponse> userResponseList = page.getContent().parallelStream().map(UserResponse::new).collect(Collectors.toList());
        return new GetUsersResponse(userResponseList, new Paginate(page));
    }
}
