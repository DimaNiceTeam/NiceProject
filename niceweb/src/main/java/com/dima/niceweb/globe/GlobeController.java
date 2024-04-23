package com.dima.niceweb.globe;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class GlobeController {

    @GetMapping("/globeindex")
    public String globeindex() {

        return "globeindex";
    }

    @GetMapping("/chartindex")
    public String chartindex() {
        log.info("도착!");
        return "chartindex";
    }
}