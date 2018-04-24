package com.ict.base.config;

import java.util.Properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "ict.global")
public class GlobalConfig {
	private Properties properties = new Properties();

	@Bean
	public Properties global() {
		return properties;
	}
}
