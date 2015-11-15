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
}
