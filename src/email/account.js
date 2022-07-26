var postmark = require("postmark");
var serverToken = "eb716a0c-98be-436c-97b1-a9c1130be5a8";
var client = new postmark.ServerClient(serverToken);
 
client.sendEmail({
    "From": "20521631@gm.uit.edu.vn",
    "To": "nguyenngocnam2108@gmail.com",
    "Subject": "Test",
    "TextBody": "Hello from Postmark!"
});