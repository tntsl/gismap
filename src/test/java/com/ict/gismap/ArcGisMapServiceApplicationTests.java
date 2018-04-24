package com.ict.gismap;

import javax.persistence.EntityManager;

import org.hibernate.SessionFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ArcGisMapServiceApplicationTests {

	@Autowired
	private EntityManager entityManager;
	@Test
	public void contextLoads() {
	}

	@Test
	public void getUsers() {
		SessionFactory sessionFactory = entityManager.getEntityManagerFactory().unwrap(SessionFactory.class);
		sessionFactory.close();
	}

}
