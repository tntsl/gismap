package com.ict.map.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ict.base.service.BaseService;
import com.ict.map.dao.BookMarkDao;
import com.ict.map.entity.BookMark;

@Service
@Transactional(readOnly = false)
public class BookMarkService extends BaseService {
	@Autowired
	private BookMarkDao bookMarkDao;

	public void modifyBookMarks(List<BookMark> bookMarks) {
		bookMarkDao.createQuery("delete BookMark", null).executeUpdate();
		bookMarkDao.save(bookMarks);
	}

	@Transactional(readOnly = true)
	public List<BookMark> getAllBookMarks() {
		return (List<BookMark>) bookMarkDao.findAll();
	}
}
