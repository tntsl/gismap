package com.ict.base.config;

import java.util.Properties;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ict.base.filter.GlobalPropertiesFilter;

@Configuration
@AutoConfigureAfter(GlobalConfig.class)
public class CustomFilterConfig {

	@Autowired
	private Properties global;

	@Bean
	public FilterRegistrationBean<Filter> resourceRedirectFilter() {
		FilterRegistrationBean<Filter> filterRegistration = new FilterRegistrationBean<>();
		filterRegistration.addUrlPatterns("/*");
		GlobalPropertiesFilter filter = new GlobalPropertiesFilter();
		filter.setGlobal(global);
		filterRegistration.setFilter(filter);
		return filterRegistration;
	}
}
