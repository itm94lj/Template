package com.itm94lj.OAuth2Server.Controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CustomLoginController {
    @GetMapping("/customLogin")
    public String customLogin(Model model, HttpServletRequest request) {
//        CsrfToken token = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
//        model.addAttribute(token.getParameterName(), token.getToken());
//        System.out.println("customLogin token:["+token.getParameterName()+"] value:p"
//        +token.getToken()+"]");
        return "myLogin";
    }
}
