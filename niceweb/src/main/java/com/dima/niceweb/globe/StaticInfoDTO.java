package com.dima.niceweb.globe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaticInfoDTO {
    
    private String statId;

    private String statNtn;

    private String statPop;

    private String statCpt;

    private String statLan;

    // export
    private Long exp19;

    private Long exp20;

    private Long exp21;

    private Long exp22;

    private Long exp23;

    // import
    private Long imp19;

    private Long imp20;

    private Long imp21;

    private Long imp22;

    private Long imp23;

    //Balance
    private Long bal19;

    private Long bal20;

    private Long bal21;

    private Long bal22;

    private Long bal23;

    // ECONOMY GROWTH
    private Long gwt19;

    private Long gwt20;

    private Long gwt21;

    private Long gwt22;

    private Long gwt23;

    // GDP
    private Long gdp19;

    private Long gdp20;

    private Long gdp21;

    private Long gdp22;

    private Long gdp23;

    public static StaticInfoDTO toDTO(StaticInfoEntity staticInfoEntity) {
        return StaticInfoDTO.builder()
                .statId(staticInfoEntity.getStatId())
                .statNtn(staticInfoEntity.getStatNtn())
                .statPop(staticInfoEntity.getStatPop())
                .statCpt(staticInfoEntity.getStatCpt())
                .statLan(staticInfoEntity.getStatLan())
                .exp19(staticInfoEntity.getExp19())
                .exp20(staticInfoEntity.getExp20())
                .exp21(staticInfoEntity.getExp21())
                .exp22(staticInfoEntity.getExp22())
                .exp23(staticInfoEntity.getExp23())
                .imp19(staticInfoEntity.getImp19())
                .imp20(staticInfoEntity.getImp20())
                .imp21(staticInfoEntity.getImp21())
                .imp22(staticInfoEntity.getImp22())
                .imp23(staticInfoEntity.getImp23())
                .bal19(staticInfoEntity.getBal19())
                .bal20(staticInfoEntity.getBal20())
                .bal21(staticInfoEntity.getBal21())
                .bal22(staticInfoEntity.getBal22())
                .bal23(staticInfoEntity.getBal23())
                .gwt19(staticInfoEntity.getGwt19())
                .gwt20(staticInfoEntity.getGwt20())
                .gwt21(staticInfoEntity.getGwt21())
                .gwt22(staticInfoEntity.getGwt22())
                .gwt23(staticInfoEntity.getGwt23())
                .gdp19(staticInfoEntity.getGdp19())
                .gdp20(staticInfoEntity.getGdp20())
                .gdp21(staticInfoEntity.getGdp21())
                .gdp22(staticInfoEntity.getGdp22())
                .gdp23(staticInfoEntity.getGdp23())
                .build();
    }
}
