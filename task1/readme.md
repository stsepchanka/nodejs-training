# Task 1. Caesar cipher CLI tool

CLI tool that encodes and decodes a text by Caesar cipher.

CLI tool accepts 4 options (short alias and full name):

-s, --shift: a shift  (mandatory)
-i, --input: an input file
-o, --output: an output file
-a, --action: an action encode/decode  (mandatory)

If --input or/and --output are missing stdin and stdout are used.

## Usage example:

```
node task1/my_caesar_cli --action encode --input plain.txt --output decoded.txt -shift 19
```
```
node task1/my_caesar_cli --action decode --input decoded.txt --output plain.txt -shift 19
```
```
node task1/my_caesar_cli -a encode  -s19
```
```
node task1/my_caesar_cli -a decode  -s19
```

