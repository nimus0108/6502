var bigDiv = document.getElementsByClassName("user active");
console.log(bigDiv);

function displayFile(name) {
    var programs = new Array();
    programs['colored'] = "\
; This program draws my initial.  Pressing different numbers results in\
; the initials displaying with different colors.\
;\

define ASCII_0      $30	    ; Value for ASCII 0 in hex\

; System variables\
define sysLastKey   $ff\
define current_char $12\
define current_digit $13\

readKeys:\
	lda sysLastKey\
	sta current_char\
	SEC\
	SBC #ASCII_0\
	sta current_digit\
	jmp drawInitials\
	jmp readKeys\

drawInitials:\
	; Left most vertical bar\
	STA $0264\
	STA $0284\
	STA $02A4\
	STA $02C4\
	STA $02E4\
	STA $0304\
	STA $0324\
	STA $0344\
	STA $0364\
	STA $0384\

	; Top Horizontal Section\
	STA $0265\
	STA $0266\
	STA $0267\
	STA $0268\

	; Right vertical bar\
	STA $0289\
	STA $02A9\
	STA $02C9\
	STA $02E9\

	; Bottom Horizontal Section\
	STA $0308\
	STA $0307\
	STA $0306\
	STA $0305\

	; Tail\
	STA $0326\
	STA $0347\
	STA $0368\
	STA $0389\

	jmp readKeys
"
}