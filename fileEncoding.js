const fs = require("node:fs");
const Huffman = require("./huffman");
// Does not support PDFs, only TXT. Start somewhere and end up somewhere else.
const FILE_PATH = "test.txt" 

fs.readFile(FILE_PATH,'utf-8',(err,data) => {
    if (err) {
        console.error("ERROR: reading the file",FILE_PATH,err);
        return;
    }
    let a = new Huffman(data).encodeString()
    file_array = FILE_PATH.split("\\")
    // Output the encoding to a new file.
    // encoding file, so the file name will be file.encoded.txt
    file_array[file_array.length-1] = file_array[file_array.length-1].split(".txt")[0] + ".encoding" + ".bin"
    WRITE_PATH = file_array.join("\\")
    fs.writeFile(WRITE_PATH,a.encodedString,{flag:"w+",encoding:'binary'},(err)=>{
        if (err){
            console.log("ERROR: writing to a file",err);
            return
        }
        console.log("RESULTS: %d% compression",Math.ceil(a.encodedString.length*100/data.length))
        console.log("DONE: writing encoding file..")
    })

    file_array = FILE_PATH.split("\\")
    file_array[file_array.length-1] = file_array[file_array.length-1].split(".txt")[0] + ".huffman_codes" + ".json"
    WRITE_PATH = file_array.join("\\")
    fs.writeFile(WRITE_PATH,JSON.stringify(a.huffmanCodes),{flag:"w+"},(err)=>{
        if (err){
            console.log("ERROR: writing to a file",err);
            return
        }
        console.log("DONE: writing Huffman codes to a file..")
    })
})