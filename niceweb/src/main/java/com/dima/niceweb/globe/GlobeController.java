package com.dima.niceweb.globe;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GlobeController {

    @GetMapping("/globeindex")
    public String globeindex() {

        return "globeindex";
    }
}