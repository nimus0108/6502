var bigDiv = document.getElementsByClassName("user active");
console.log(bigDiv);

function displayFile(name) {
    var programs = new Array();
    programs['colored'] = "\n\
; This program draws my initial.  Pressing different numbers results in\n\
; the initials displaying with different colors.\n\
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
	jmp drawInitials\n\
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

	jmp readKeys
";
program['disassembled'] = "\n\
;\n\
; This program draws my initial.  Pressing different numbers results in\n\
; the initials displaying with different colors.\n\
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
	jmp drawInitials\n\
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
program['functions'] = "
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; Constant values
;
define x 	   $02		; Input "x" parameter
define y	   $04		; Input "y" parameter

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; Addresses
;
define ans_addr	   $01   	; Final answer will be stored at $0001. 
define temp_addr   $02		; Temporary values can be stored at $0002.
define temp_addr_2   $04    ; Temporary values can also be stored at $0004.

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; Main Program
; -- Push x then y onto the stack
; -- Call function e
; -- The pop the result from the stack and store it in ans_addr
LDA #x
PHA 
LDA #y
PHA 
JSR e
PLA ; get result
STA ans_addr
PLA ; throw away x
BRK

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; e(x,y) = a(d(x+1)) + d(y)
; 
e: 
;
; Implement this!
;


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; d(x) = 5x + 7  
;
d: 
;
; Implement this!
;


	

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; a(x) = 2x + 3
;
a:
	;
	; Load the "x" parameter from SP + 3
	TSX
	TXA
	CLC
	ADC #$03
	TAY
	LDA $0100, Y

	; Store "x" to a temp location, then add it back to the accumulator.
	; This effectively gives us 2x
	STA temp_addr
	ADC temp_addr

	; Add 3 to the accumulator, resulting in x+3
	ADC #$03

	; Store the result back on the stack and return.
	STA $0100, Y
	RTS


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; b(x) = a(x+2) + a(x+1)
;
b:
	;
	; Load the "x" parameter from SP + 3
	TSX
	TXA
	CLC
	ADC #$03
	TAY
	LDA $0100, Y

	; Add 1 to the accumulator to get x + 1
	; Push x+1 to the stack as an argument for "a".
	ADC #$01	
	PHA 
	JSR a

	; Leave the result of a(x+1) on the stack for later

	;
	; Load the "x" parameter from SP + 4
	; Why is it now at SP + 4?  Because we left a(x+1) on the stack!
	;
	TSX
	TXA
	CLC
	ADC #$04
	TAY
	LDA $0100, Y

		
	; Add 2 to the accumulator to get x + 2
	; Push x+2 to the stack as an argument for "a".
	ADC #$02   
	PHA 
	JSR a

	;
	; Pop a(x+2) from the stack and store it in a temp location
	;	
	PLA				
	STA temp_addr   

	;
	; Now pop a(x+1) from the stack.  Then add a(x+2) to this value.
	PLA				
	ADC temp_addr

	; Save the final value in a temp address while we calculate where to store it on the stack.
	STA temp_addr

	; The return location is SP + 3
	TSX
	TXA
	CLC
	ADC #$03
	TAY

	; Load the final value from the temp address and write it to the stack.
	LDA temp_addr
	STA $0100, Y

	RTS
"

}
