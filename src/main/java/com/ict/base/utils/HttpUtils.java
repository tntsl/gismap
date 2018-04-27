package com.ict.base.utils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.entity.BasicHttpEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpRequestRetryHandler;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpUtils {
	private static final Logger logger = LoggerFactory.getLogger(HttpUtils.class);
	// 池化管理
	private static PoolingHttpClientConnectionManager poolConnManager = null;
	private static CloseableHttpClient httpClient;
	// 请求器的配置
	private static RequestConfig requestConfig;
	static {
		try {
			System.out.println("初始化HttpClientTest~~~开始");
			SSLContextBuilder builder = new SSLContextBuilder();
			builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(builder.build());
			// 配置同时支持 HTTP 和 HTPPS
			Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create().register("http", PlainConnectionSocketFactory.getSocketFactory())
					.register("https", sslsf).build();
			// 初始化连接管理器
			poolConnManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
			// 将最大连接数增加到200，实际项目最好从配置文件中读取这个值
			poolConnManager.setMaxTotal(20);
			// 设置最大路由
			poolConnManager.setDefaultMaxPerRoute(2);
			// 根据默认超时限制初始化requestConfig
			int socketTimeout = 10000;
			int connectTimeout = 10000;
			int connectionRequestTimeout = 10000;
			requestConfig = RequestConfig.custom().setConnectionRequestTimeout(connectionRequestTimeout).setSocketTimeout(socketTimeout).setConnectTimeout(connectTimeout).build();

			// 初始化httpClient
			httpClient = getHttpClient();

			System.out.println("初始化HttpClientTest~~~结束");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (KeyStoreException e) {
			e.printStackTrace();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		}
	}

	public static CloseableHttpClient getHttpClient() {
		CloseableHttpClient httpClient = HttpClients.custom()
				// 设置连接池管理
				.setConnectionManager(poolConnManager)
				// 设置请求配置
				.setDefaultRequestConfig(requestConfig)
				// 设置重试次数
				.setRetryHandler(new DefaultHttpRequestRetryHandler(0, false)).build();

		if (poolConnManager != null && poolConnManager.getTotalStats() != null) {
			System.out.println("now client pool " + poolConnManager.getTotalStats().toString());
		}

		return httpClient;
	}

	/**
	 * 根据指定URL发送POST请求并打印输出返回内容
	 * 
	 * @param url
	 * @return
	 * @throws IOException
	 */
	public static String sendGetRequest(String url) throws IOException {
		HttpGet get = new HttpGet(url);
		CloseableHttpResponse response = httpClient.execute(get);
		String content = EntityUtils.toString(response.getEntity());
		int statusCode = response.getStatusLine().getStatusCode();
		response.close();
		if (statusCode != 200) {
			logger.error(content);
			return null;
		} else {
			return content;
		}
	}

	/**
	 * 根据指定URL发送POST请求并打印输出返回内容
	 * 
	 * @param url
	 * @throws IOException
	 */
	public static String sendPostRequest(String url, String content) throws IOException {
		HttpPost post = new HttpPost(url);
		BasicHttpEntity entity = new BasicHttpEntity();
		entity.setContent(new ByteArrayInputStream(content.getBytes()));
		post.setEntity(entity);
		try {
			CloseableHttpResponse response = httpClient.execute(post);
			String repContent = EntityUtils.toString(response.getEntity());
			if (response.getStatusLine().getStatusCode() != 200) {
				logger.error(repContent);
			} else {
				return repContent;
			}
			response.close();
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
		return null;
	}

	/**
	 * 根据指定URL，请求文件内容
	 * 
	 * @param url
	 * @return
	 */
	public static String getFileContent(String url) {
		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpGet get = new HttpGet(url);
		try {
			HttpResponse response = httpClient.execute(get);
			String content = EntityUtils.toString(response.getEntity());
			return content;
		} catch (ClientProtocolException e) {
			logger.error(e.getMessage(), e);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		return "";
	}

	static class GetThread extends Thread {
		private CloseableHttpClient httpClient;
		private String url;
		private PoolingHttpClientConnectionManager poolConnManager;

		public GetThread(CloseableHttpClient client, String url, PoolingHttpClientConnectionManager poolConnManager) {
			httpClient = client;
			this.url = url;
			this.poolConnManager = poolConnManager;
		}

		public void run() {
			for (int i = 0; i < 3; i++) {
				HttpGet httpGet = new HttpGet(url);
				CloseableHttpResponse response = null;
				try {
					response = httpClient.execute(httpGet);
					HttpEntity entity = response.getEntity();
					String result = EntityUtils.toString(entity, "utf-8");
					System.out.println(result);
					EntityUtils.consume(entity);
					System.out.println(Thread.currentThread().getName() + " Finished");
					System.out.println("now client pool " + poolConnManager.getTotalStats().toString());
				} catch (IOException e) {
					e.printStackTrace();
				} finally {
					try {
						if (response != null) {
							response.close();
						}
						if (httpGet != null) {
							httpGet.releaseConnection();
						}
					} catch (IOException e) {
						e.printStackTrace();
					}

				}

			}

		}
	}

	public static void main(String[] args) {
		String[] urisToGet = {"https://www.baidu.com", "https://www.baidu.com", "https://www.baidu.com", "https://www.baidu.com", "https://www.baidu.com"};

		GetThread[] threads = new GetThread[urisToGet.length];
		for (int i = 0; i < threads.length; i++) {
			threads[i] = new GetThread(httpClient, urisToGet[i], poolConnManager);
		}

		for (Thread tmp : threads) {
			tmp.start();
		}
	}
}
