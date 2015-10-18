var express = require("express");
var http = require("http");
var querystring=require("querystring");
var $ = require("cheerio");
var Q = require("q");
var config = require("./config/config");

var HTTP = "http://";

var logKeys = function(targetObject) {
    for (var i in targetObject) {
        console.log(i);
    }
};

var COOKIE_KEYS = [
    "lastact",
    "ulastactivity",
    "sid",
    "auth",
    "lastcheckfeed",
    "checkfollow",
    "lip"
];

var cookie;
Q.promise(function(resolve, reject) {
    var postData = querystring.stringify(config.loginParam);
    var options = {
      hostname: config.HOST_NAME,
      path: config.LOGIN_URL_PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    };
    console.log("-------------login");
    var chunks = [];
    var req = http.request(options, function(res) {
      res.on('data', function (chunk) {
        console.log("-------------login result");
      });
      res.on('end', function() {
        var newHeaders = {"Cookie": "", "cookie": ""};
        var rules = /[^;]+;/;
        var cookieValueRaw = res.headers["set-cookie"];
        for (var i = 0; i < cookieValueRaw.length; i++) {
                var cookieValue = cookieValueRaw[i];
                var cookieUsefulValue = rules.exec(cookieValue)[0];
                var cookieValueArray = cookieUsefulValue.split("=");
                var cookieValueKey = cookieValueArray[0];
                var cookieValueValue = cookieValueArray[1];
                var hasValue = false;
                newHeaders.Cookie += cookieUsefulValue + " ";
                newHeaders.cookie += cookieUsefulValue + " ";
        }
        newHeaders["cookie"] = newHeaders.cookie.trim();
        console.log(newHeaders);
        resolve(newHeaders);
      });
      req.on('error', function(e) {
        console.log('-------------problem with request: ' + e.message);
      });
    });
    // write data to request body
    req.write(postData);
    req.end();
}).then(function(headers) {
    return Q.promise(function(resolve){
        console.log("-------------Goto module");
        var options = {
          hostname: config.HOST_NAME,
          path: config.TEST_MODULE_PATH,
          method: "GET",
          headers: headers
        };
        console.log(options);
        // return;
        var req = http.request(options, function(res) {
          console.log("-------------Goto module end");
          var chunks = [];
          res.on('data', function (chunk) {
            chunks.push(chunk);
          });
          res.on('end', function() {
            chunks = Buffer.concat(chunks);
            var chunkString = chunks.toString();
            var dataReg = /(name|id)="(formhash|usesig|posttime)" value="([^"]+)"/g;
            var dataParam = {
                formhash: "",
                usesig: "",
                posttime: "",
                subject: "Always tring...",
                message: "Submit success! Yeah!"
            };
            var insurance = 0;
            var keyValues = true;
            while(keyValues && insurance < 5) {
              keyValues = dataReg.exec(chunkString);
              insurance ++;
              dataParam[keyValues[2]] = keyValues[3];
            }
            resolve([headers, dataParam])
            console.log("-------------module end");
          });
        });
        req.end();
    });
}).spread(function(headers, param) {
    console.log("----------Submit begin");
    var postData = querystring.stringify(param);
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    headers['Content-Length'] = postData.length;
    return Q.promise(function(resolve) {
        var options = {
          hostname: config.HOST_NAME,
          path: config.OPEN_NEW_THREAD_PATH,
          method: "POST",
          headers: headers,
          data: param
        };
        console.log(options);
        // return;
        var req = http.request(options, function(res) {
            res.on('data', function (chunk) {
              console.log("-------------submit data");
            });
            res.on('end', function() {
              console.log("-------------submit result");
            });
        });
        req.write(postData);
        req.end();
    });
});



