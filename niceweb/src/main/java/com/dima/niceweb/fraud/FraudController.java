package com.dima.niceweb.fraud;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FraudController {

    @GetMapping("/showFraud")
    public String showFraud() {

        return "showFraud";
    }

    @GetMapping("/showFraudDetail")
    public String showFraudDetail() {

        return "showFraudDetail";
    }

}
