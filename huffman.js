
class Node{ 
    constructor(character,frequency,left=null,right=null){
        this.character = character;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
    }
}

module.exports = class Huffman{
    constructor(text){
        this.text = text;
        this.frequencyTable = {};
        this.result = [];
    }

    
    frequencyCount(){
        let stringArray = this.text.split("");
        for (let i=0;i<stringArray.length;i++){
            if (this.frequencyTable[stringArray[i]]) this.frequencyTable[stringArray[i]]++
            else{
                this.frequencyTable[stringArray[i]] = 1;
            }
        }
        return this.frequencyTable
    }
    
    createHuffmanTree(){
        let heap = [];
        let hashTable = this.frequencyCount();
        let sortedHashTable = Object.entries(hashTable)
                                    .sort((a,b) => a[1] - b[1])
        
        // Create nodes and push it into the heap
        for (let i=0;i<sortedHashTable.length;i++){
            heap.push(new Node(sortedHashTable[i][0],sortedHashTable[i][1]))
        }
        // iterate over and merge nodes.
        while(heap.length > 1){
            let left = heap.shift();
            let right = heap.shift();
            let mergeNode = new Node(left.character + right.character,left.frequency + right.frequency,left,right);
            // Push this back into the array
            heap.push(mergeNode);
            // Sort the array again
            heap.sort((a,b) => {
                return a.frequency - b.frequency;
            })
        }
        return heap[0] // return the constructed huffman tree.
    
    }

    encodeBinaryRepresentation(tree,value = ""){
        if (!tree.left && !tree.right){
            this.result.push([tree.character,value])
        }
        if (tree.left){
            this.encodeBinaryRepresentation(tree.left,value+"0")
        }
        if (tree.right){
            this.encodeBinaryRepresentation(tree.right,value+"1")
        }
        return this.result
    }

    binaryStringToBuffer(binaryString) {
        let codec=""
        for (let i=0;i < binaryString.length; i+=8) {
            
            const byteStr = binaryString.slice(i, i+8);
            const number = parseInt(byteStr,2);
            // transform the binary to a character code
            codec += String.fromCharCode(number);
        }
        return Buffer.from(codec,'binary')//codec
    }

    encodeString(){
        let hashResult = Object.fromEntries(this.encodeBinaryRepresentation(this.createHuffmanTree()))
        let encodedString = ""
        for (let i=0;i<this.text.length;i++){
            if (hashResult[this.text[i]]){
                    encodedString += hashResult[this.text[i]]
            }else{
                return "hash map does not contain some weird value."
            }
        }
        return {
            encodedString: this.binaryStringToBuffer(encodedString),
            huffmanCodes : hashResult
        }
    }

    decodeString(config_data){
        let encodingConfig = JSON.parse(config_data) // We will store the huffman codes in JSON
        let encodedString = this.text.toString('utf-8')// The text we would be getting is a buffer.
        let r = []
        for (const [k,v] of Object.entries(encodingConfig)){
            r.push([v,k])
        }

        encodingConfig = Object.fromEntries(r)// Change the config from (key, value) pair to (value,key) pair
        let result = ""
        let curr = ""
        let t = ""
        
        for (let i=0;i<encodedString.length;i++){
            // Convert the character code to Integer
            let number = encodedString[i].charCodeAt() 
            // Convert the Integer to Binary
            // padStart handles the cases when we have some binaries like`0110` this gets converted to `110` when we decode
            // from character code. so we are slicing the string with 8 bit sequence. so pad the left side with 0.
            t+= number.toString(2).padStart(8,'0') 
        }
        let decodedString = t
        
        for (let i=0;i<decodedString.length;i++){
            curr+=decodedString[i]
            if (encodingConfig[curr]){
                result+= encodingConfig[curr]
                curr=""
            }
        }
        return result
    }

}
