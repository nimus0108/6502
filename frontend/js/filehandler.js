var bigDiv = document.getElementsByClassName("user active");
console.log(bigDiv);

function displayFile(name) {
    var programs = new Array();
    programs['colored'] = "\n\
; This program draws my initial.  Pressing different numbers results in\n\
; the initials displaying with different colors.\n\
;\n\
\
define ASCII_0      $30	    ; Value for ASCII 0 in hex\n\
\
; System variables\n\
define sysLastKey   $ff\n\
define current_char $12\n\
define current_digit $13\n\
\
readKeys:\n\
	lda sysLastKey\n\
	sta current_char\n\
	SEC\n\
	SBC #ASCII_0\n\
	sta current_digit\n\
	jmp drawInitials\n\
	jmp readKeys\n\
\
drawInitials:\n\
	; Left most vertical bar\n\
	STA $0264\n\
	STA $0284\n\
	STA $02A4\n\
	STA $02C4\n\
	STA $02E4\n\
	STA $0304\n\
	STA $0324\n\
	STA $0344\n\
	STA $0364\n\
	STA $0384\n\
\
	; Top Horizontal Section\n\
	STA $0265\n\
	STA $0266\n\
	STA $0267\n\
	STA $0268\n\
\
	; Right vertical bar\n\
	STA $0289\n\
	STA $02A9\n\
	STA $02C9\n\
	STA $02E9\n\
\
	; Bottom Horizontal Section\n\
	STA $0308\n\
	STA $0307\n\
	STA $0306\n\
	STA $0305\n\
\
	; Tail\n\
	STA $0326\n\
	STA $0347\n\
	STA $0368\n\
	STA $0389\n\
\
	jmp readKeys\
";
program['disassembled'] = "\n\
;\n\
; This program draws my initial.  Pressing different numbers results in\n\
; the initials displaying with different colors.\n\
;\n\
\
define ASCII_0      $30	    ; Value for ASCII 0 in hex\n\
\
; System variables\n\
define sysLastKey   $ff\n\
define current_char $12\n\
define current_digit $13\n\
\
readKeys:\n\
	lda sysLastKey\n\
	sta current_char\n\
	SEC\n\
	SBC #ASCII_0\n\
	sta current_digit\n\
	jmp drawInitials\n\
	jmp readKeys\n\
\
drawInitials:\n\
	; Left most vertical bar\n\
	STA $0264\n\
	STA $0284\n\
	STA $02A4\n\
	STA $02C4\n\
	STA $02E4\n\
	STA $0304\n\
	STA $0324\n\
	STA $0344\n\
	STA $0364\n\
	STA $0384\n\
\
	; Top Horizontal Section\n\
	STA $0265\n\
	STA $0266\n\
	STA $0267\n\
	STA $0268\n\
\
	; Right vertical bar\n\
	STA $0289\n\
	STA $02A9\n\
	STA $02C9\n\
	STA $02E9\n\
\
	; Bottom Horizontal Section\n\
	STA $0308\n\
	STA $0307\n\
	STA $0306\n\
	STA $0305\n\
\
	; Tail\n\
	STA $0326\n\
	STA $0347\n\
	STA $0368\n\
	STA $0389\n\
\
	jmp readKeys\n\
";

program['firstprogram'] = "\n\
LDA #$01\n\
STA $0200\n\
LDA #$05\n\
STA $0201\n\
LDA #$08\n\
STA $0202\n\
"

program['functions'] = "\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; Constant values\n\
;\n\
define x 	   $02		; Input \"x\" parameter\n\
define y	   $04		; Input \"y\" parameter\n\
\n\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; Addresses\n\
;\n\
define ans_addr	   $01   	; Final answer will be stored at $0001. \n\
define temp_addr   $02		; Temporary values can be stored at $0002.\n\
define temp_addr_2   $04    ; Temporary values can also be stored at $0004.\n\
\n\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; Main Program\n\
; -- Push x then y onto the stack\n\
; -- Call function e\n\
; -- The pop the result from the stack and store it in ans_addr\n\
LDA #x\n\
PHA \n\
LDA #y\n\
PHA \n\
JSR e\n\
PLA ; get result\n\
STA ans_addr\n\
PLA ; throw away x\n\
BRK\n\
\n\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; e(x,y) = a(d(x+1)) + d(y)\n\
; \n\
e: \n\
;\n\
; Implement this!\n\
;\n\
\n\
\n\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; d(x) = 5x + 7  \n\
;\n\
d: \n\
;\n\
; Implement this!\n\
;\n\
\n\
\n\
	\n\
\n\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; a(x) = 2x + 3\n\
;\n\
a:\n\
	;\n\
	; Load the \"x\" parameter from SP + 3\n\
	TSX\n\
	TXA\n\
	CLC\n\
	ADC #$03\n\
	TAY\n\
	LDA $0100, Y\n\
\n\
	; Store \"x\" to a temp location, then add it back to the accumulator.\n\
	; This effectively gives us 2x\n\
	STA temp_addr\n\
	ADC temp_addr\n\
\n\
	; Add 3 to the accumulator, resulting in x+3\n\
	ADC #$03\n\
\n\
	; Store the result back on the stack and return.\n\
	STA $0100, Y\n\
	RTS\n\
\n\
\n\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; b(x) = a(x+2) + a(x+1)\n\
;\n\
b:\n\
	;\n\
	; Load the \"x\" parameter from SP + 3\n\
	TSX\n\
	TXA\n\
	CLC\n\
	ADC #$03\n\
	TAY\n\
	LDA $0100, Y\n\
\n\
	; Add 1 to the accumulator to get x + 1\n\
	; Push x+1 to the stack as an argument for \"a\".\n\
	ADC #$01	\n\
	PHA \n\
	JSR a\n\
\n\
	; Leave the result of a(x+1) on the stack for later\n\
\n\
	;\n\
	; Load the \"x\" parameter from SP + 4\n\
	; Why is it now at SP + 4?  Because we left a(x+1) on the stack!\n\
	;\n\
	TSX\n\
	TXA\n\
	CLC\n\
	ADC #$04\n\
	TAY\n\
	LDA $0100, Y \n";	


programs['funcions2'] = "\n\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; Constant values\n\
;\n\
define n 	   $05		; Input \"n\" parameter\n\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; Addresses\n\
;\n\
define ans_addr	   $01   	; Final answer will be stored at $0001. \n\
define temp_addr   $02		; Temporary values can be stored at $0002.\n\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; Main Program\n\
; -- Push n then y onto the stack\n\
; -- Call function e\n\
; -- The pop the result from the stack and store it in ans_addr\n\
LDA #n\n\
PHA \n\
JSR f\n\
PLA ; get result\n\
STA ans_addr\n\
BRK\n\
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\n\
; F(n) = 2 * F(n-1) - 3\n\
; F(0) = 4\n\
; \n\
f: \n\
	;\n\
	; Load the \"n\" parameter from SP + 3\n\
	TSX\n\
	TXA\n\
	CLC\n\
	ADC #$03\n\
	TAY\n\
	LDA $0100, Y\n\
	;\n\
	; Check if n=0.  If so, then implement the base case of our recursion.\n\
	;\n\
	CMP #0\n\
	BEQ base_case\n\
	;\n\
	; If acc > 0, \n\
	; then subtract 1 from n and make the recursive call.\n\
	SEC\n\
	SBC #$01\n\
	PHA \n\
	JSR f\n\
	;\n\
	; Pull the result of the subroutine call.  This is the result of f(n-1)\n\
	PLA \n\
	; Double the accumulator  (2 * F(n-1))\n\
	STA temp_addr\n\
	ADC	temp_addr\n\
	; Subtract the 3 from the accumulator to complete the calculation\n\
	SEC\n\
	SBC #$03\n\
	JMP merged_code\n\
base_case:\n\
	; If n=0.... F(0) = 4\n\
	LDA #$04\n\
merged_code:\n\
	; Store the return value in the temp_addr for safe keeping while\n\
	; we calculate the return address.\n\
	STA temp_addr\n\
	;\n\
	; Calculate the address for the return value.\n\
	;\n\
	TSX\n\
	TXA\n\
	CLC\n\
	ADC #$03\n\
	TAY\n\
	;\n\
	; Reload the return value from temp_addr and then write it into the stack\n\
	;\n\
	LDA temp_addr\n\
	STA $0100, Y\n\
	RTS\n\
";   

program['program2'] = "\n\
;\n\
; This program draws my initial.  The difference between this program and \n\
; the first is that this one uses a subroutine.\n\
;\n\
define ASCII_0      $30	    ; Value for ASCII 0 in hex\n\
; System variables\n\
define sysLastKey   $ff\n\
define current_char $12\n\
define current_digit $13\n\
readKeys:\n\
	lda sysLastKey\n\
	sta current_char\n\
	SEC\n\
	SBC #ASCII_0\n\
	sta current_digit\n\
	jsr drawInitials\n\
	jmp readKeys\n\
drawInitials:\n\
	; Left most vertical bar\n\
	STA $0264\n\
	STA $0284\n\
	STA $02A4\n\
	STA $02C4\n\
	STA $02E4\n\
	STA $0304\n\
	STA $0324\n\
	STA $0344\n\
	STA $0364\n\
	STA $0384\n\
	; Top Horizontal Section\n\
	STA $0265\n\
	STA $0266\n\
	STA $0267\n\
	STA $0268\n\
	; Right vertical bar\n\
	STA $0289\n\
	STA $02A9\n\
	STA $02C9\n\
	STA $02E9\n\
	; Bottom Horizontal Section\n\
	STA $0308\n\
	STA $0307\n\
	STA $0306\n\
	STA $0305\n\
	; Tail\n\
	STA $0326\n\
	STA $0347\n\
	STA $0368\n\
	STA $0389\n\
rts\n";
    
}
