package com.dima.niceweb.Notice;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageNavigator {
    private final int pagePerGroup = 10;
    private int pageLimit;
    private int page;
    private int totalPages;
    private int totalGroupCount;
    private int currentGroup;
    private int startPageGroup;
    private int endPageGroup;

    public PageNavigator(int pageLimit, int page, int totalPages) {

        this.pageLimit = pageLimit;
        this.page = page;
        this.totalPages = totalPages;

        totalGroupCount = totalPages / pagePerGroup;
        totalGroupCount += (totalPages % pagePerGroup == 0) ? 0 : 1;

        startPageGroup = ((int) (Math.ceil((double) page / pageLimit)) - 1) * pageLimit + 1;

        endPageGroup = (startPageGroup + pageLimit - 1) < totalPages
                ? (startPageGroup + pageLimit - 1)
                : totalPages;

        if (endPageGroup == 0)
            endPageGroup = 1;

        currentGroup = (page - 1) / pagePerGroup + 1;
    }
}
