package com.ict.base.filter;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
public class GlobalPropertiesFilter implements Filter {

	private Properties global;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		req.setAttribute("global", global);
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {

	}

	public Properties getGlobal() {
		return global;
	}

	public void setGlobal(Properties global) {
		this.global = global;
	}

}
