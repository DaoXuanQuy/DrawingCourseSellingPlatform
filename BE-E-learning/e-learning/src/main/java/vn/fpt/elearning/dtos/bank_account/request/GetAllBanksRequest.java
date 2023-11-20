package vn.fpt.elearning.dtos.bank_account.request;


import lombok.*;
import lombok.experimental.Accessors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.entity.Bank;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class GetAllBanksRequest extends BaseRequestData {

    private String name;

    private String code;

    private Boolean napasSupported;

    public Specification<Bank> getSpecification() {
        return (root, query, builder) -> {
            List<Predicate> namePredicates = new ArrayList<>();
            if (StringUtils.isNotBlank(name)) {
                namePredicates.add(builder.like(root.get(Bank.Fields.name), "%" + name.trim() + "%"));
                namePredicates.add(builder.like(root.get(Bank.Fields.shortName), "%" + name.trim() + "%"));
                namePredicates.add(builder.like(root.get(Bank.Fields.commonName), "%" + name.trim() + "%"));
            }
            List<Predicate> codePredicates = new ArrayList<>();
            if (StringUtils.isNotBlank(code)) {
                codePredicates.add(builder.like(root.get(Bank.Fields.napasCode), "%" + code.trim() + "%"));
                codePredicates.add(builder.like(root.get(Bank.Fields.citad), "%" + code.trim() + "%"));
            }

            List<Predicate> filterPredicates = new ArrayList<>();
            if (Objects.nonNull(napasSupported)) {
                filterPredicates.add(builder.equal(root.get(Bank.Fields.napasSupported), napasSupported));
            }

            Predicate nPredicate = !namePredicates.isEmpty()
                ? builder.or(namePredicates.toArray(new Predicate[0]))
                : builder.and();

            Predicate cPredicate = !codePredicates.isEmpty()
                ? builder.or(codePredicates.toArray(new Predicate[0]))
                : builder.and();

            Predicate fPredicate = !filterPredicates.isEmpty()
                ? builder.and(filterPredicates.toArray(new Predicate[0]))
                : builder.and();

            return builder.and(nPredicate, cPredicate, fPredicate);
        };
    }

}
