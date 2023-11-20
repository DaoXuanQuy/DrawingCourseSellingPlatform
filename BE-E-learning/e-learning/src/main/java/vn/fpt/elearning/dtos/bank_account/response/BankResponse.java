package vn.fpt.elearning.dtos.bank_account.response;

import lombok.*;
import lombok.experimental.Accessors;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.entity.Bank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain = true)
public class BankResponse extends BaseResponseData {
    private Long id;

    private String name;

    private String shortName;

    private String commonName;

    private String citad;

    private boolean napasSupported;

    private String napasCode;

    private String benId;

    private String swift;

    private boolean vietQrSupported;

    private String logo;
    private String icon;
    private String code;

    public BankResponse(Bank bank) {
        if (bank == null) {
            return;
        }

        this.id = bank.getId();
        this.name = bank.getName();
        this.shortName = bank.getShortName();
        this.commonName = bank.getCommonName();
        this.citad = bank.getCitad();
        this.napasSupported = bank.isNapasSupported();
        this.napasCode = bank.getNapasCode();
        this.benId = bank.getBenId();
        this.swift = bank.getSwift();
        this.vietQrSupported = bank.isVietQrSupported();
        this.logo = bank.getLogo();
        this.code = bank.getCode();
        this.icon = bank.getIcon();
    }

}

