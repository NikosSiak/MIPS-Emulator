import { labels } from "./tmp.js";

const KEYWORDS = new RegExp(['(add\\.[sd]?|add[i]?[u]?|and[i]?|beq|bne|j[r]?|jal|l[ailw]|lbu|lhu|lui|nor|or[i]?',
                            '|slt[i]?[u]?|s[lr]l|s[bchw]|sub[u]?|bc1[tf]?|mult[u]?|div[u]?',
                            '|mfhi|mflo|mfc0|blt|bgt|ble|move|syscall)'].join(''));
const REGISTER = new RegExp(/(zero|at|v[01]|a[0-3]|t[0-9]|s[0-7]|k[01]|[gsf]p|ra)/);
const DECLARATIONS = new RegExp(/data|text|word|ascii[z]?|byte|align|half|space|double|float|extern|kdata|ktext|globl|set|eqv|macro|end_macro|include/);
const LABEL = new RegExp(/([a-zA-Z]\d*)+\s*:/);
const WORD = new RegExp(/([a-zA-Z]\d*)/);


export default function mips() {
    return {
        token: function (stream, state) {
            if (stream.sol())
                stream.eatSpace();
            
            let ch = stream.next();

            if (ch === '#') {
                stream.skipToEnd();
                return "comment";
            }

            if (ch === "'") {
                // todo: parse '\'
                if (stream.skipTo("'")) {
                    stream.next();
                    return "string";
                }
                return "error";
            }

            if (ch === '"') {
                // todo: parse '\'
                if (stream.skipTo('"')) {
                    stream.next();
                    return "string";
                }
                return "error";
            }

            if (ch === '$' && stream.match(REGISTER)) {
                let ch2 = stream.peek();
                if (stream.eol() || ch2 === ',' || ch2 === ')' || ch2 === '#' || ch2 === '"' || ch2 === "'" || ch2.match(/\s/))
                    return "register";
            }

            if (ch === '.' && stream.match(DECLARATIONS)) {
                let ch2 = stream.peek();
                if (stream.eol() || ch2 === ',' || ch2 === '#' || ch2 === '"' || ch2 === "'" || ch2.match(/\s/))
                    return "declaration";
            }

            if (stream.match(LABEL)) {
                labels.add(stream.string.slice(0, -1).trim());
                return "label";
            }

            stream.backUp(1);
            if (stream.match(KEYWORDS)) {
                // todo check if there is anything at the left of the instruction
                let ch2 = stream.peek();
                if (stream.eol() || ch2.match(/\s/) || ch2 === '#' || ch2 === '"' || ch2 === "'")
                return "keyword";
            }
            stream.next();

            if (stream.match(WORD)) {
                return "word";
            }
        }
    };
};
