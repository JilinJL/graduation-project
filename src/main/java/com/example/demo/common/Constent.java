package com.example.demo.common;

import lombok.Data;
/*
*
        { value: 'Sentiment', label: '情感分析' },
        { value: 'Recommend', label: '旅游知识库' },
        { value: 'Transform', label: 'AI翻译' },

* */
@Data
public class Constent {

    private String Model1 = "llama2-chinese:13b";
    private String Model2 = "llama2:13b";


    private String Type1 = "请对以下文段进行情感分析并输出一个JSON,包含{analysisLabel: 这段文字的情感标签(至少提供2-4个),analysisScore: 这段文字的情感得分(0.00代表最消极,1.00代表最积极),analysisResult: 这段文字的分析结果(总结分析结果)}(请记住无论如何你都要返回我以上格式的JSON字符串,所有词句全部用引号包裹):";
    private String Type2 = "请翻译以下文字(中英互译):";
    private String Type3 = "请给根据以下内容提供相关旅游信息";

    public String getType(String type){
        switch (type){
            case "Recommend":
                return Type2;
            case "Transform":
                return Type3;
            default:
                return Type1;
        }
    }

}
