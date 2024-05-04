package com.example.demo.controller;


import com.alibaba.fastjson.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import com.example.demo.common.Auth;
import com.example.demo.common.Constent;
import com.example.demo.common.R;
import com.example.demo.common.ResponseEnum;
import com.example.demo.entity.Analysis;
import com.example.demo.entity.Content;
import com.example.demo.entity.ContentDTO;
import com.example.demo.entity.Student;
import com.example.demo.service.AnalysisService;
import com.example.demo.service.ContentService;
import com.example.demo.service.StudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static cn.hutool.json.XML.toJSONObject;

@RestController
@RequestMapping("/api/content")
@Api(tags = "内容信息管理")
//@Controller
public class ContentController {

    Constent constent = new Constent();

    @Autowired
    private ContentService contentService;
    @Autowired
    private AnalysisService analysisService;

    @Auth
    @ResponseBody
    @GetMapping("/getContentByUserId")
    @ApiOperation("根据UserId拿到对应的内容记录")
    public List<Content> getContents(Long userId) {
        List<Content> contentList = contentService.selectByUserId(userId);
        return contentList;
    }

    @ResponseBody
    @PostMapping("/addContent")
    @ApiOperation("新增内容记录")
    public R addContent( ContentDTO contentDTO) throws Exception {

        Content content = new Content();
        content.setContentData(contentDTO.getContentData());
        content.setUserId(contentDTO.getUserId());
        content.setContentTitle(contentDTO.getContentTitle());

        contentService.save(content);
        try {


            //TODO: 调用大模型分析此条记录
            String urlString = "http://localhost:11434/api/chat";

/*            String requestBody = "{ " +
                    "\"model\": \"" + constent.getModel(contentDTO.getModel()) + "\", " +
                    "\"messages\": [{ " +
                    "\"role\": \"user\", " +
                    "\"content\": \"" + constent.getType(contentDTO.getType()) + contentDTO.getContentData().toString() +
                    "\" }] " +
                    "}";*/

            JSONObject requestBody = new JSONObject();
            ArrayList messages = new ArrayList();

            JSONObject assistantMessage = new JSONObject();
            assistantMessage.put("role", "assistant");
            assistantMessage.put("content", constent.getType(contentDTO.getType()));
            messages.add(assistantMessage);

            JSONObject userMessage = new JSONObject();
            userMessage.put("role", "user");
            userMessage.put("content", contentDTO.getContentData().toString());
            messages.add(userMessage);

            requestBody.put("messages",messages); // 直接将messages作为JSONArray对象放入requestBody
            requestBody.put("model", constent.getModel(contentDTO.getModel()));

            System.out.println(requestBody.toJSONString());
            String analysisData = "生成失败";
            try {
                String response = sendPostRequest(urlString, String.valueOf(requestBody));
                analysisData = extractContent(response).replaceAll("\r\n", "");
                System.out.println("-------");
                System.out.println(analysisData);
            } catch (Exception e) {
                e.printStackTrace();
                return R.error(ResponseEnum.INSERT_ERROR);
            }
            return R.ok(analysisData);
        }catch (Exception e){

            return R.error(ResponseEnum.INSERT_ERROR);
        }
    }

    @ResponseBody
    @DeleteMapping("/deleteContent")
    @ApiOperation("删除内容记录")
    public Boolean deleteContent(Long contentId, Long userId){
        return contentService.removeById(contentId,userId);

    }
    public static String sendPostRequest(String urlString, String requestBody) throws Exception {
        // 创建 URL 对象
        URL url = new URL(urlString);
        // 创建 HttpURLConnection 对象
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        // 设置请求方法为 POST
        connection.setRequestMethod("POST");
        // 设置请求头部信息
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        // 启用输出流
        connection.setDoOutput(true);
        // 创建请求体
        byte[] postData = requestBody.getBytes();
        // 发送请求体
        try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
            outputStream.write(postData);
            outputStream.flush();
        }
        // 获取响应代码
        int responseCode = connection.getResponseCode();
        // 读取响应内容
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();
        // 关闭连接
        connection.disconnect();
        // 返回响应内容
        return response.toString();
    }

    public static String extractContent(String input) {
        StringBuilder result = new StringBuilder();

        System.out.println("以下是格式化前的数据");
        System.out.println(input);
        int startIndex = input.indexOf("\"content\"");
        while (startIndex != -1) {
            int valueStartIndex = input.indexOf("\"", startIndex + 10) + 1;
            int valueEndIndex = input.indexOf("\"", valueStartIndex);
            result.append(input.substring(valueStartIndex, valueEndIndex));
            startIndex = input.indexOf("\"content\"", valueEndIndex);
        }

        return result.toString();
    }

    public static Map<String, Object> parseFromSentimentString(String input) {
        // 去除字符串中的换行符
        String cleanedInput = input.replaceAll("\\\\n", "").replaceAll("\\\\", "");

        // 打印清理后的字符串，以进行调试
        System.out.println("Cleaned Input: " + cleanedInput);

        // 提取分析标签
        int labelStartIndex = cleanedInput.indexOf("analysisLabel") + "analysisLabel".length() + 1;
        int labelEndIndex = cleanedInput.indexOf("]", labelStartIndex);
        String analysisLabel = cleanedInput.substring(labelStartIndex + 1, labelEndIndex).trim();

        // 打印提取的分析标签，以进行调试
        System.out.println("Analysis Label: " + analysisLabel);

        // 提取分析分数
        int scoreStartIndex = cleanedInput.indexOf("analysisScore") + "analysisScore".length() + 1;
        int scoreEndIndex = cleanedInput.indexOf(",", scoreStartIndex);
        double analysisScore = Double.parseDouble(cleanedInput.substring(scoreStartIndex, scoreEndIndex).trim());

        // 打印提取的分析分数，以进行调试
        System.out.println("Analysis Score: " + analysisScore);

        // 提取分析结果
        int resultStartIndex = cleanedInput.indexOf("analysisResult") + "analysisResult".length() + 1;
        int resultEndIndex = cleanedInput.lastIndexOf("\\n}");
        String analysisResult = cleanedInput.substring(resultStartIndex, resultEndIndex).trim();

        // 打印提取的分析结果，以进行调试
        System.out.println("Analysis Result: " + analysisResult);

        // 创建并返回Map对象
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("analysisLabel", analysisLabel);
        resultMap.put("analysisScore", analysisScore);
        resultMap.put("analysisResult", analysisResult);

        return resultMap;
    }
}
