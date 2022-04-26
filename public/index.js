
const http=require("http");
const fs=require("fs");

const requests=require("requests");
 const replacevalue=(temperory,Value)=>{
     let temperature=temperory.replace("{%temperory%}",(Value.main.temp-273).toFixed(2));
      temperature= temperature.replace("{%temp_min%}",(Value.main.temp_min-273).toFixed(2));
      temperature= temperature.replace("{%temp_max%}",(Value.main.temp_max-273).toFixed(2));
      temperature= temperature.replace("{%airpressure%}",Value.main.pressure);
      temperature= temperature.replace("{%humidity%}",Value.main.humidity);
      temperature= temperature.replace("{%weather%}",Value.weather[0].main);
      temperature= temperature.replace("{%location%}",Value.name);
      temperature= temperature.replace("{%country%}",Value.sys.country);


     return temperature;

 }

const homefile=fs.readFileSync('index.html',"utf-8");
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=jabalpur&appid=ce6a0e3aa65f58f2abc73e89a226a02a")
        .on("data",(chunk)=>{
            const objdata=JSON.parse(chunk);
            const value=objdata;
          //  const value=value1-273;
          //  console.log(value.toFixed(2));
               const realtimedata =replacevalue(homefile,value); 
              res.write(realtimedata) ;
              
console.log(realtimedata);
                  })
        .on("end",(err)=>{
            if(err) return console.log("connection closed due to error",err);
        res.end();});
        }
           
    });
server.listen(3000,console.log("listening"));