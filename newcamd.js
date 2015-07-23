var crypto = require('crypto'); /*  lib for DES algorithm used in the Newcamd protocol */
var newcamd = require('net').Socket(); /* lib for TCP connections */
var DES = require('./DES');

/* Newcamd client */

var userKey = new Buffer('0102030405090708091011121314', 'hex');
var initData = new Buffer(14).fill(0);
var loginKey = new Buffer(16).fill(0);

newcamd.connect(15000, 'SERVER URL');
newcamd.on('data', function (msg) {
    initData = msg;
    loginKey = DES.getLoginKey(userKey, initData);
    process.stdout.write("14 BYTES FROM SERVER: ");
    console.log(msg); /* initial 14 bytes messages sent by server */
    process.stdout.write("16 BYTES LOGIN KEY: ");
    console.log(loginKey); /* login key, get by userKey ^ 14 random bytes from server and expanded. See DES.js */
});
