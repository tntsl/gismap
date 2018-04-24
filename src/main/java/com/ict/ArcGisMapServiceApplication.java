package com.ict;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class ArcGisMapServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArcGisMapServiceApplication.class, args);
	}
}