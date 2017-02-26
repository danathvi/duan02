var clock = require('clock');
var inteval = require('setinterval-plus');
var schedule=require('node-schedule');
var pmx = require('pmx').init();
//var pm2 = require('..');

var str2json=require('string-to-json');
var gcm = require('node-gcm');
var express = require('express');
var timesyncServer = require('timesync/server');
var firebase = require('firebase');
var request = require('request');
//var watchdog = require("./lib/watchdog.js");
const redis = require('redis');
//const client = redis.createClient();

var rule=new schedule.RecurrenceRule();
var express = require("express");
var app = express();

var storage = require('node-persist');
var mqtt = require('mqtt'),url = require('url');
var mqttClient = mqtt.connect("http://iot.eclipse.org:1883")
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var mqtt = require('mqtt'),url = require('url');
var port = Number(process.env.PORT ||5678);
server.listen(port);
var se=1;
var regTokens=[];

storage.initSync({
    dir : "DANHSACH1",
    ttl : false
	 // cấu hình nơi lưu trữ dữ liệu nằm trong thư mục students
});

//storage.initSync();

io.sockets.on('connection', function (socket) {
	console.log("co nguoi ket noi ne anh vinh oi");
  mqttClient.subscribe("tube");
    mqttClient.publish('tube','co nguoi ket noi server');
  mqttClient.on('connect', function(topic, message){
   	  mqttClient.publish('tube','connect');
   	console.log("mqtt connect");
     });
      mqttClient.on('message', function(topic, message){
   	 console.log("iot : "+topic.toString('utf8'));
     console.log("iot : "+message.toString('utf8'));

   	  });


   	mqttClient.on('offline', function(topic, message){
            client.publish('tube','offline');
   	  });
   	  mqttClient.on('error', function(topic, message){
   	 mqttClient.publish('tube','error');
   	  });
//clien tao thiet bi
socket.on('taothietbi', function (data) {
console.log(themTBSelect(data.tenphong,data.tenthietbi,data.tenbutton,data.trangthaionof,data.wait));
//console.log(getAllThietBi());
 //io.sockets.emit("themmotthietbi","Ban Da Tao Moi 1 Thiet Bi OK");
});
//sua thiet bi

//clien bat tat
socket.on('trangthaithiewtbi', function (data) {
  //   console.log(data.tenphong,data.tenthietbi,data.tenbutton,data.trangthaionof);//hien thi cach 2
//updateTB(data.tenphong,data.tenthietbi,data.tenbutton,data.trangthaionof,data.wait);
//console.log(getAllThietBi());//sai

//console.log("trang thai thiewi bi : "+ data.trangthaionof);
var layjson=[];
//console.log(updateTB(data.tenphong,data.tenthietbi,data.tenbutton,data.trangthaionof,data.wait).length);
 io.sockets.emit("serve_gui_thietbi_onof"
               ,updateTB(data.tenphong,data.tenthietbi,data.tenbutton,data.trangthaionof,data.wait));//sai
                mqttClient.publish('tube',JSON.stringify(updateTB(data.tenphong,data.tenthietbi,data.tenbutton,data.trangthaionof,data.wait)));
});

//clien yeu cau danh sach de hien thi khi khoi dong
socket.on('androidYeuCauGuiDanhSachThietBi', function (data) {
  //console.log(data.tenphong,data.tenthietbi,data.tenbutton,data.trangthaionof,data.wait);
  console.log(data.man);
//console.log(getAllSelectThietBi(data.tenphong,data.tenthietbi,data.tenbutton,data.trangthaionof,data.wait));

//console.log(getAllThietBi());
// getSelectThietBi(data.tenphong);
 //console.log(getAllSelectThietBi());
//console.log(getSelectThietBi(data.tenphong).length);

//io.sockets.emit("serve_gui_thietbi",getAllSelectThietBi(data.tenphong));
});

//end socket
  });





                             //cac ham xu li sql tam


  //lay tat ca danhsach
  /*  function getSelectThietBi(phong){
        var tbs = getAllThietBi();
        var bss=getAllSelectThietBi();

for (var i = 0; i < tbs.length; i++){
  if (tbs[i].tenphong === phong){
    bss.push({
      thietbiten : tbs[i].thietbi
    });
console.log(phong);
  }
}
        storage.setItemSync("Phong",bss);
    }
    */
  //danhsach rthiet bi phong
  function getAllSelectThietBi(phong,thietbi,buton,trangthai,cho){  //tra ve danh sach co chon lua
      var tbs = getAllThietBi();
      var json = {};
      var butajson=[];
    for (var i = 0; i < tbs.length; i++){
      if(tbs[i].tenphong=== phong&&tbs[i].tenbuton===buton){
      json['tenphong']=tbs[i].tenphong;
      json['tenthietbi']=tbs[i].tenthietbi;
      json['tenbuton']=tbs[i].tenbuton;
      json['valuetrangthai']=tbs[i].valuetrangthai;
    //  json['chodao']=tbs[i].chodao;
       var j1=JSON.stringify(json);
       var j2=JSON.parse(j1);
       butajson.push(j2);


      }
else {
  //  tbs.splice(i, 1);
}
    }
    console.log(butajson.length);
 return butajson ;
 }


    function getAllThietBi(){
      var listhietbi = storage.getItemSync('DANHSACH1');

    // Nếu không có sinh viên nào thì trả về một mảng rỗng
    if (typeof listhietbi === "undefined"){
        return [];
    }
     return listhietbi;
  }
    // Ngược lại sẽ trả về danh sách sinh viên
                                                         //========================================================================

    function updateTB(phong,thietbi,buton,trangthai,cho){

    var tbs = getAllThietBi();

    var json = {};
    var butajson=[];
    for (var i = 0; i < tbs.length; i++){
        if (tbs[i].tenphong === phong&&tbs[i].tenbuton === buton){//&&tbs[i].tenthietbi ===thietbi
            tbs[i].valuetrangthai = trangthai;
            //if(cho==='no')tbs[i].chodao='dieu khien thanh cong';
        }

    }

tbs = getAllThietBi();
    for (var i = 0; i < tbs.length; i++){
    if(tbs[i].tenphong === phong&&tbs[i].tenbuton === buton){
    json['tenphong']=tbs[i].tenphong;
    json['tenthietbi']=tbs[i].tenthietbi;
    json['tenbuton']=tbs[i].tenbuton;
    json['valuetrangthai']=tbs[i].valuetrangthai;
  //  json['chodao']=tbs[i].chodao;
     var j1=JSON.stringify(json);
     var j2=JSON.parse(j1);
     butajson.push(j2);


    }

    }

   console.log(butajson.length);
    return butajson;
}
//sua thiet bi

//them
function themTB(phong,thietbi,buton,trangthai,cho){
    var tbs = getAllThietBi();
    var json = {};
    var butajson=[];
  tbs.push({
        tenphong : phong,
        tenthietbi :thietbi,
        tenbuton :buton,
        valuetrangthai:trangthai,
        //chodao:cho
   });
   var tbs = getAllThietBi();
   for (var i = 0; i < tbs.length; i++){
   if(tbs[i].tenphong=== phong){
   json['tenphong']=tbs[i].tenphong;
   json['tenthietbi']=tbs[i].tenthietbi;
   json['tenbuton']=tbs[i].tenbuton;
   json['valuetrangthai']=tbs[i].valuetrangthai;
  // json['chodao']=tbs[i].chodao;
    var j1=JSON.stringify(json);
    var j2=JSON.parse(j1);
    butajson.push(j2);


   }

   }
   console.log(butajson.length);
   return butajson;
}



function themTBSelect(phong,thietbi,buton,trangthai,cho)
{
    var tbs = getAllThietBi();
    var i=0;
    for ( i = 0; i < tbs.length; i++){

        if ((tbs[i].tenphong === phong)&&(tbs[i].tenbuton === buton)){//&&(tbs[i].tenthietbi ===thietbi)
          //  tbs[i].trangthaitb = trangthai;;
          break;
        }
    }
    if(i<tbs.length)
			updateTB(phong,thietbi,buton,trangthai,cho);//cap nhat
		else
			themTB(phong,thietbi,buton,trangthai,cho);


    storage.setItemSync("DANHSACH1",tbs);
}

function xoaTB(phong,thietbi,buton,trangthai,cho)
{
    var tbs = getAllThietBi();
    var json = {};
    var butajson=[];
    for (var i = 0; i < tbs.length; i++){
        if ((tbs[i].tenphong === phong)&&(tbs[i].tenbuton === buton)){
            tbs.splice(i, 1);
        }
    }
    for (var i = 0; i < tbs.length; i++){
    if(tbs[i].tenphong=== phong){
    json['tenphong']=tbs[i].tenphong;
    //json['tenthietbi']=tbs[i].tenthietbi;
    json['tenbuton']=tbs[i].tenbuton;
    json['valuetrangthai']=tbs[i].valuetrangthai;
  //  json['chodao']=tbs[i].chodao;
     var j1=JSON.stringify(json);
     var j2=JSON.parse(j1);
     butajson.push(j2);


    }

    }
    console.log(butajson.length);
    return butajson;
}

function hienthiTB(data)
{
    var tbs = getAllThietBi();
    tbs.forEach(function(data){
        console.log('Thietbi: ' + data.tenbutton+ ' (' + data.trangthaionof + ')');
    });
}
