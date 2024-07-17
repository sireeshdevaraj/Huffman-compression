const fs = require("node:fs");
const Huffman = require("./huffman");
const FILE_PATH = "test.encoding.bin"
const huffman_codes = "test.huffman_codes.json"
const DECODING_PATH = "test.decoded.txt" 

fs.readFile(FILE_PATH,"binary",(err,data) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.readFile(huffman_codes,"utf-8",(err,config_data) => {
        if (err) {
            console.error(err);
            return;
        }
    let result = new Huffman(data).decodeString(config_data)
    fs.writeFile(DECODING_PATH,result,{flag: "w+"},(err) => {
        if (err){
            console.log("ERROR: decoding the given data",err)
            return
        }
    })
})
})