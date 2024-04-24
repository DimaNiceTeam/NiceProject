package com.dima.niceweb.fraud;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
public class FraudController {

    @GetMapping("/fraud")
    @ResponseBody
    public FraudDTO Fraud() {
            try{
                String result = FraudDownload.getFraud();
                Gson gson = new Gson();
                FraudDTO fraudDTO = gson.fromJson(result, FraudDTO.class);
                return fraudDTO;
            } catch(IOException e) {
                System.out.println(e.getMessage());
            }
        return null;
    }

    @GetMapping("/showFraud")
    public String showFraud() {
        
        return "showFraud";
    }

    @GetMapping("/showFraudDetail")
    public String showFraudDetail() {
        
        return "showFraudDetail";
    }
    
}
