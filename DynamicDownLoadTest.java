package com.newsTest.weixin;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class DynamicDownLoadTest {
	public static String getSrcContent(String urls){
		//windows下casperjs位置
		String casperPath = "G:/study/screeshot/node_modules/casperjs/bin/";
		String imgRelativePath = "static";
		String worksAbsolutePath = "D:/workspace/myeclipse2014/article/src/main/webapp/opusres/D38BDD5EAC2F42BD91ADFCFD58FA7B20";
		String worksId = "D38BDD5EAC2F42BD91ADFCFD58FA7B20";
		String worksAccessPath = "http://onepage.loudcloud.cn/article/opusres";
		String url = "http://onepage.loudcloud.cn/article/opusres/15E6D5D4E8EE490A88434DC432A70FA3/index.html";
		String scriptFile = "G:/study/screeshot/casperjsReplaceStyle.js";
		String htmlName = "index-wx";
		
		Runtime rt = Runtime.getRuntime();
		Process process = null;
		String cmd = casperPath + "casperjs.exe "+scriptFile+" "+url+ " "+ htmlName +" "+ worksAbsolutePath +" "+ worksAbsolutePath +"/"+imgRelativePath +" "+ worksAccessPath+"/"+imgRelativePath;
		try {
			process = rt.exec(cmd);
		} catch (IOException e) {
			// TODO 这里写异常处理的代码
			e.printStackTrace();
		}
		InputStream is = process.getInputStream();
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		StringBuffer sbf = new StringBuffer();
		String tmp = "";
		try {
			while((tmp = br.readLine())!=null){  
			    sbf.append(tmp);  
			}
		} catch (IOException e) {
			// TODO 这里写异常处理的代码
			e.printStackTrace();
		}
		
		return sbf.toString();
	}
	
	public static void main(String[] args){
		String src = DynamicDownLoadTest.getSrcContent("http://onepage.loudcloud.cn/article/opusres/15E6D5D4E8EE490A88434DC432A70FA3/index.html?t=0.5180855805519968");
		System.out.println(src);
	}

}
