package com.ict.base.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

/**
 * @author tntsl
 * @createDate 2018年2月8日下午3:27:52
 */
@ControllerAdvice
public class StaticSourcesController {

	@Autowired
	private ResourceUrlProvider resourceUrlProvider;

	@ModelAttribute("urls")
	public ResourceUrlProvider urls() {
		return this.resourceUrlProvider;
	}
}
