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
    private String Model2 = "qwen";
    private String Model3 = "llama2:13b";


    private String Type1 = "你是一个情感分析助手,你需要对用户输入的文段进行情感分析,尽可能详细地分析用户的输入";
    private String Type2 = "你是一个翻译助手,请翻译以下文字(中英互译)并在回答的开头附上'Transform':";
    private String Type3 = "你是一个旅游推荐助手,请给根据以下内容提供相关旅游信息并在回答的开头附上'Recommend'";

    public String getModel(String model) {
        switch (model){
            case "1":
                return Model1;
            case "2":
                return Model2;
            default:
                return Model3;
        }
    }

    public String getType(String type){
        switch (type){
            case "Recommend":
                return Type3;
            case "Transform":
                return Type2;
            default:
                return Type1;
        }
    }

}
