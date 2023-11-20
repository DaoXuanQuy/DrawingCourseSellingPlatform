package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.District;
import vn.fpt.elearning.entity.Province;
import vn.fpt.elearning.entity.Ward;
import vn.fpt.elearning.repository.WardRepository;
import vn.fpt.elearning.repository.DistrictReposiory;
import vn.fpt.elearning.repository.ProvinceRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final ProvinceRepository provinceRepository;
    private final DistrictReposiory districtReposiory;
    private final WardRepository wardRepository;

    public List<Province> getListProvinces() {
        return provinceRepository.findAll();
    }

    public List<District> getListDistrictsByProvinceId(Long provinceId) {
        return districtReposiory.findAllByProvinceId(provinceId);
    }

    public List<Ward> getListWardsByDistrictId(Long districtId) {
        return wardRepository.findAllByDistrictId(districtId);
    }

    public Province findProvinceById(Long id) {
        return provinceRepository.findById(id).orElse(null);
    }

    public District findDistrictById(Long id) {
        return districtReposiory.findById(id).orElse(null);
    }

    public Ward findWardById(Long id) {
        return wardRepository.findById(id).orElse(null);
    }

}
