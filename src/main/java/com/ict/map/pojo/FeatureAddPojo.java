package com.ict.map.pojo;

import java.util.ArrayList;
import java.util.List;


public class FeatureAddPojo {
    private String f = "json";
    private List<Feature> features = new ArrayList<>();

    public String getF() {
        return f;
    }

    public void setF(String f) {
        this.f = f;
    }

    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }

}
