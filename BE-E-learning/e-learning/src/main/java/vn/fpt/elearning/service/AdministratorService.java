package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.repository.AdministratorRepository;
import vn.fpt.elearning.service.interfaces.IAdministratorService;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdministratorService implements IAdministratorService {
    private final AdministratorRepository administratorRepository;

    @Override
    public Administrator save(Administrator administrator) {
        return administratorRepository.save(administrator);
    }

    @Override
    public Administrator getByPhone(String phone) {
        return administratorRepository.findByPhone(phone);
    }

    @Override
    public Administrator getById(String id) {
        return administratorRepository.getById(id);
    }

    @Override
    public Page<Administrator> getPageAdmin(Specification<Administrator> specification, Pageable pageable) {
        return administratorRepository.findAll(specification, pageable);
    }
}
