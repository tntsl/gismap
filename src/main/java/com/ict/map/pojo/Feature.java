package com.ict.map.pojo;

import java.util.Map;

public class Feature {
	private Geometry geometry;
	private Map<String, String> attributes;
	public Geometry getGeometry() {
		return geometry;
	}
	public void setGeometry(Geometry geometry) {
		this.geometry = geometry;
	}
	public Map<String, String> getAttributes() {
		return attributes;
	}
	public void setAttributes(Map<String, String> attributes) {
		this.attributes = attributes;
	}

}
