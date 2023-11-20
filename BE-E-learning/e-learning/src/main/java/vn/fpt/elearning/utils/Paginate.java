package vn.fpt.elearning.utils;

import lombok.Data;
import org.springframework.data.domain.Page;

@Data
public class Paginate {
    private int current;
    private int pageSize;
    private int total;
    private int totalPage;

    public Paginate() {

    }

    public Paginate(int current, int pageSize, int total, int totalPage) {
        this.current = current;
        this.pageSize = pageSize;
        this.total = total;
        this.totalPage = totalPage;
    }

    public Paginate(Page<?> page) {
        this.pageSize = page.getPageable().getPageSize();
        this.current = page.getPageable().getPageNumber();
        this.total = (int) page.getTotalElements();
        this.totalPage = page.getTotalPages();
    }

}
