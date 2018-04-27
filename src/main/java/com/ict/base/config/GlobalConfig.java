package com.ict.base.config;

import java.util.Properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GlobalConfig {

	@Bean
	@ConfigurationProperties(prefix = "ict.global.properties")
	public Properties global() {
		Properties properties = new Properties();
		return properties;
	}
}
