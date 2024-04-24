package com.dima.niceweb.ovsnews;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;


@Controller
public class APIController {

    @GetMapping("/ovsNews")
    @ResponseBody
    public APIDTO ovsNews() {
        try {
            String result = DataDownload.getOvsNews();
            Gson gson = new Gson();
            APIDTO apiDTO = gson.fromJson(result, APIDTO.class);
            return apiDTO;
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @GetMapping("/showOvsNews")
    public String ShowOvsNews() {

        return "showOvsNews";
    }

    @GetMapping("/showOvsNewsDetail")
    public String showOvsNewsDetail() {

        return "showOvsNewsDetail";
    }
}
