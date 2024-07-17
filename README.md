# Huffman Compression

Implementation of Huffman Compression.

The main idea is to create a Huffman tree from the given string and form a binary representation of the string, with highly frequent characters having a shorter encoded binary string, and less frequent characters having a longer string.

Just the construction of Huffman codes will not reduce the file size; rather, it will inflate the file size. Therefore, we need to convert the binary string to something else. We will take the first `8-bit` sequence, convert it into an integer, and then convert the integer into an ASCII value.

After concatenating the complete string, we will create a buffer from the string and store the buffer in a file.

# Compression ratio

```sh
test.txt -> File size: 20MB
test.encoding.bin -> File size: 12MB
Compression ratio: 60%
```
**Future Idea**

I am planning to make a simple, complete web application for general use, and a process manager that listens to a folder and automatically compresses the files we put in it.
