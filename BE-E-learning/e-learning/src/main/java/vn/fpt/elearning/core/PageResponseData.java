package vn.fpt.elearning.core;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PageResponseData<T> extends BaseResponseData {
    private List<T> data;
    private int current;
    private int pageSize;
    private long total;
    private int totalPage;

    public PageResponseData(Page<T> page) {
        this.data = page.getContent();
        this.pageSize = page.getPageable().getPageSize();
        this.current = page.getPageable().getPageNumber();
        this.total = page.getTotalElements();
        this.totalPage = page.getTotalPages();
    }

    public PageResponseData(List<T> data, Page<?> page) {
        this.data = data;
        this.pageSize = page.getPageable().getPageSize();
        this.current = page.getPageable().getPageNumber();
        this.total = page.getTotalElements();
        this.totalPage = page.getTotalPages();
    }
}
