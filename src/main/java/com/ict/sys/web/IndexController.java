package com.ict.sys.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author tntsl
 * @createDate 2018年2月8日下午3:36:24
 */
@Controller
public class IndexController {

	@RequestMapping({"", "index"})
	public String index() {
		return "index";
	}
}
