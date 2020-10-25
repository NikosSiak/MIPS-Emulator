import CodeMirror from "codemirror";
import { labels } from "./tmp.js";

const MIPS_REGISTERS = "$zero $at $v0 $v1 $a0 $a1 $a2 $a3 $t0 $t1 $t2 $t3 $t4 $t5 $t6 $t7 $t8 $t9 $s0 $s1 $s2 $s3 $s4 $s5 $s6 $s7 $k0 $k1 $gp $sp $fp $ra".split(" ");
const INSTRUCTIONS = "aadd addu addi".split(" ");
const Pos = CodeMirror.Pos;

export default function mipsHint(editor, options) {
    let cur = editor.getCursor();
    let token = editor.getTokenAt(cur);
    let found = [];

    console.log(token);

    if (token.type === "comment" || token.type === "string") return;

    if (token.string.startsWith("$")) {
        found = MIPS_REGISTERS.filter(reg => reg.startsWith(token.string));
    }
    else if (token.type === "word") {
        found = INSTRUCTIONS.filter(ins => ins.startsWith(token.string));
        found = [...found, ...[...labels].filter(label => label.startsWith(token.string))]
    }
    
    return {list: found, 
            from: Pos(cur.line, token.start),
            to:   Pos(cur.line, token.end)}
}
