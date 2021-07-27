Web API提供开发者自己调用API实现与开关的连接。

## HTTP

    POST /Variation/GetUserVariationResult HTTP/1.1
    Host: api.feature-flags.co
    Content-Type: application/json

    {
        "environmentSecret": "{environment key}",
        "featureFlagKeyName": "{开关 keyName}",
        "ffUserName": "test-user",
        "ffUserEmail": "test-user@xinhuotech.com",
        "ffUserCustomizedProperties": [
            {
                "name":"类别", 
                "value":"机器人"
            }
        ],
        "ffUserKeyId": "test-user@xinhuotech.com"
    }

## Curl

    curl --location --request POST 'https://api.feature-flags.co/Variation/GetUserVariationResult' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "environmentSecret": "{environment key}",
        "featureFlagKeyName": "{开关 keyName}",
        "ffUserName": "test-user",
        "ffUserEmail": "test-user@xinhuotech.com",
        "ffUserCustomizedProperties": [
            {
                "name":"类别", 
                "value":"机器人"
            }
        ],
        "ffUserKeyId": "test-user@xinhuotech.com"
    }'

## Java - OkHttp的Web API调用示例

    OkHttpClient client = new OkHttpClient().newBuilder()
    .build();
    MediaType mediaType = MediaType.parse("application/json");
    RequestBody body = RequestBody.create(mediaType, "{\r\n    \"environmentSecret\": \"{environment key}\",\r\n    \"featureFlagKeyName\": \"{开关 keyName}\",\r\n    \"ffUserName\": \"test-user\",\r\n    \"ffUserEmail\": \"test-user@xinhuotech.com\",\r\n    \"ffUserCustomizedProperties\": [\r\n        {\r\n            \"name\":\"类别\", \r\n            \"value\":\"机器人\"\r\n        }\r\n    ],\r\n    \"ffUserKeyId\": \"test-user@xinhuotech.com\"\r\n}");
    Request request = new Request.Builder()
    .url("https://api.feature-flags.co/Variation/GetUserVariationResult")
    .method("POST", body)
    .addHeader("Content-Type", "application/json")
    .build();
    Response response = client.newCall(request).execute();
