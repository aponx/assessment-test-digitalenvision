const https = require("https");

const Hookbin = function(hookbin) {
    this.first_name   = hookbin.first_name;
    this.last_name    = hookbin.last_name;
};

Hookbin.send = (dataSend, result) => {
    const data = JSON.stringify({
        message: `Hey, ${dataSend.first_name} ${dataSend.last_name}! it’s your birthday`
    })
    
    const options = {
        hostname: "hookb.in",
        port: 443,
        path: "/Oe7GlM8NwBsqOdYYxmnR",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length
        }
    }
    
    const req = https.request(options, (res) => {
        result("message hookbin : "+res.statusCode);
    });
    
    req.write(data);
    req.end();
};

module.exports = Hookbin;