let a = new Buffer(24);
a.fill(0);  //用0填充
console.log(a);


console.log('--------------------------')


let str = '你好!世界';
let b = new Buffer(str);
console.log(b);
console.log(b.toString());
console.log(b[0]);


console.log('--------------------------')


let arr = [1,2,3,4];
var c = Buffer.from(arr);
console.log(c);
console.log(c.toString());


console.log('--------------------------')


let a2 = new Uint8Array([1, 2, 3, 4]);
let b2 = Buffer.from(a2);
console.log(b2);

console.log('--------------------------')


let b3 = Buffer.alloc(10);
console.log(b3);


console.log('--------------------------')


let b4 = Buffer.allocUnsafe(10);
console.log(b4); 


console.log('--------------------------')


let buf = new Buffer('我等一会还会被转换成字符串!');   
console.log(buf);
let json = JSON.stringify(buf);  //将buffer转换成json
console.log(json);
var str2 = new Buffer(JSON.parse(json).data).toString();
console.log(str2);


console.log('--------------------------')


let StringDecoder = require('string_decoder').StringDecoder;  //该类用于解析string,比toString更完善，最好使用该方式
let decoder = new StringDecoder('utf8');
let euro = new Buffer([0xE2, 0x82]); 
let euro2 = new Buffer([0xAC]);
let euro3 = new Buffer('使用stringdecoder');
console.log(decoder.write(euro)); 
console.log(decoder.write(euro2));
console.log(decoder.write(euro3));
console.log(euro.toString()); //没有被正确转换
console.log(euro2.toString());  //没有被正确转换
console.log(euro3.toString());




