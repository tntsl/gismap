package com.ict.base.utils;

import java.io.IOException;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;

public class FeatureUtils {

	/**
	 * 查找已给定参数结尾的属性文件属性值并默认返回第一个匹配结果
	 * 
	 * @param global
	 * @param ctype
	 * @return
	 * @throws Exception
	 */
	public static String getProperty(Properties global, String sufix, String... parameters) throws Exception {
		Set<Object> keySet = global.keySet();
		for (Iterator<Object> it = keySet.iterator(); it.hasNext();) {
			Object key = it.next();
			if (key instanceof String) {
				String keyStr = (String) key;
				if (keyStr.endsWith(sufix)) {
					if (parameters != null && parameters.length > 0) {
						boolean checkResult = checkMatchs(keyStr, parameters);
						if (checkResult) {
							return global.getProperty(keyStr);
						} else {
							throw new Exception("没有找到匹配的结果。。。");
						}
					} else {
						return global.getProperty(keyStr);
					}
				}
			}
		}
		throw new Exception("没有找到匹配的结果。。。");
	}

	public static boolean checkMatchs(String stringToMatch, String[] parameters) {
		for (int i = 0; i < parameters.length; i++) {
			if (stringToMatch.indexOf(parameters[i]) == -1) {
				return false;
			}
		}
		return true;
	}
	/**
	 * 添加数据到空间数据库
	 *
	 * @param layer
	 * @return
	 * @throws IOException
	 */
	public static String addFeature(String layerUrl, String features) throws IOException {
		String featureUrl = layerUrl + "/addFeatures";
		return HttpUtils.sendPostRequest(featureUrl, features);
	}
}
