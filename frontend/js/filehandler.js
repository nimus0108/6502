var bigDiv = document.getElementsByClassName("user active");
console.log(bigDiv);

function displayFile(name) {
	$('li').removeClass('active');
	var e = document.getElementById(name);
	e.parentNode.className += " active";
	
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
programs[0] = "\n\
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

programs[1] = "\n\
LDA #$01\n\
STA $0200\n\
LDA #$05\n\
STA $0201\n\
LDA #$08\n\
STA $0202\n\
"

programs[2] = "\
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


programs[3] = "\n\
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

programs[4] = "\n\
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
    
	programs[10] = "\
	\n\
	;  ___           _        __ ___  __ ___\n\
; / __|_ _  __ _| |_____ / /| __|/  \_  )\n\
; \__ \ ' \/ _` | / / -_) _ \__ \ () / /\n\
; |___/_||_\__,_|_\_\___\___/___/\__/___|\n\
; Change direction: W A S D\n\
define appleL         $00 ; screen location of apple, low byte\n\
define appleH         $01 ; screen location of apple, high byte\n\
define snakeHeadL     $10 ; screen location of snake head, low byte\n\
define snakeHeadH     $11 ; screen location of snake head, high byte\n\
define snakeBodyStart $12 ; start of snake body byte pairs\n\
define snakeDirection $02 ; direction (possible values are below)\n\
define snakeLength    $03 ; snake length, in bytes\n\
; Directions (each using a separate bit)\n\
define movingUp      1\n\
define movingRight   2\n\
define movingDown    4\n\
define movingLeft    8\n\
; ASCII values of keys controlling the snake\n\
define ASCII_w      $77\n\
define ASCII_a      $61\n\
define ASCII_s      $73\n\
define ASCII_d      $64\n\
; System variables\n\
define sysRandom    $fe\n\
define sysLastKey   $ff\n\
  jsr init\n\
  jsr loop\n\
init:\n\
  jsr initSnake\n\
  jsr generateApplePosition\n\
  rts\n\
initSnake:\n\
  lda #movingRight  ;start direction\n\
  sta snakeDirection\n\
  lda #4  ;start length (2 segments)\n\
  sta snakeLength \n\
  lda #$11\n\
  sta snakeHeadL\n\
  lda #$10\n\
  sta snakeBodyStart\n\
  lda #$0f\n\
  sta $14 ; body segment 1\n\
  lda #$04\n\
  sta snakeHeadH\n\
  sta $13 ; body segment 1\n\
  sta $15 ; body segment 2\n\
  rts\n\
generateApplePosition:\n\
  ;load a new random byte into $00\n\
  lda sysRandom\n\
  sta appleL\n\
  ;load a new random number from 2 to 5 into $01\n\
  lda sysRandom\n\
  and #$03 ;mask out lowest 2 bits\n\
  clc\n\
  adc #2\n\
  sta appleH\n\
  rts\n\
loop:\n\
  jsr readKeys\n\
  jsr checkCollision\n\
  jsr updateSnake\n\
  jsr drawApple\n\
  jsr drawSnake\n\
  jsr spinWheels\n\
  jmp loop\n\
readKeys:\n\
  lda sysLastKey \n\
  cmp #ASCII_w\n\
  beq upKey\n\
  cmp #ASCII_d\n\
  beq rightKey\n\
  cmp #ASCII_s\n\
  beq downKey\n\
  cmp #ASCII_a\n\
  beq leftKey\n\
  rts\n\
upKey:\n\
  lda #movingDown\n\
  bit snakeDirection\n\
  bne illegalMove\n\
  lda #movingUp\n\
  sta snakeDirection\n\
  rts\n\
rightKey:\n\
  lda #movingLeft\n\
  bit snakeDirection\n\
  bne illegalMove\n\
  lda #movingRight\n\
  sta snakeDirection\n\
  rts\n\
downKey:\n\
  lda #movingUp\n\
  bit snakeDirection\n\
  bne illegalMove\n\
  lda #movingDown\n\
  sta snakeDirection\n\
  rts\n\
leftKey:\n\
  lda #movingRight\n\
  bit snakeDirection\n\
  bne illegalMove\n\
  lda #movingLeft\n\
  sta snakeDirection\n\
  rts\n\
illegalMove:\n\
  rts\n\
checkCollision:\n\
  jsr checkAppleCollision\n\
  jsr checkSnakeCollision\n\
  rts\n\
checkAppleCollision:\n\
  lda appleL\n\
  cmp snakeHeadL\n\
  bne doneCheckingAppleCollision\n\
  lda appleH\n\
  cmp snakeHeadH\n\
  bne doneCheckingAppleCollision\n\
  ;eat apple\n\
  inc snakeLength\n\
  inc snakeLength ;increase length\n\
  jsr generateApplePosition\n\
doneCheckingAppleCollision:\n\
  rts\n\
checkSnakeCollision:\n\
  ldx #2 ;start with second segment\n\
snakeCollisionLoop:\n\
  lda snakeHeadL,x\n\
  cmp snakeHeadL\n\
  bne continueCollisionLoop\n\
maybeCollided:\n\
  lda snakeHeadH,x\n\
  cmp snakeHeadH\n\
  beq didCollide\n\
continueCollisionLoop:\n\
  inx\n\
  inx\n\
  cpx snakeLength          ;got to last section with no collision\n\
  beq didntCollide\n\
  jmp snakeCollisionLoop\n\
didCollide:\n\
  jmp gameOver\n\
didntCollide:\n\
  rts\n\
updateSnake:\n\
  ldx snakeLength\n\
  dex\n\
  txa\n\
updateloop:\n\
  lda snakeHeadL,x\n\
  sta snakeBodyStart,x\n\
  dex\n\
  bpl updateloop\n\
\n\
  lda snakeDirection\n\
  lsr\n\
  bcs up\n\
  lsr\n\
  bcs right\n\
  lsr\n\
  bcs down\n\
  lsr\n\
  bcs left\n\
up:\n\
  lda snakeHeadL\n\
  sec\n\
  sbc #$20\n\
  sta snakeHeadL\n\
  bcc upup\n\
  rts\n\
upup:\n\
  dec snakeHeadH\n\
  lda #$1\n\
  cmp snakeHeadH\n\
  beq collision\n\
  rts\n\
right:\n\
  inc snakeHeadL\n\
  lda #$1f\n\
  bit snakeHeadL\n\
  beq collision\n\
  rts\n\
down:\n\
  lda snakeHeadL\n\
  clc\n\
  adc #$20\n\
  sta snakeHeadL\n\
  bcs downdown\n\
  rts\n\
downdown:\n\
  inc snakeHeadH\n\
  lda #$6\n\
  cmp snakeHeadH\n\
  beq collision\n\
  rts\n\
left:\n\
  dec snakeHeadL\n\
  lda snakeHeadL\n\
  and #$1f\n\
  cmp #$1f\n\
  beq collision\n\
  rts\n\
collision:\n\
  jmp gameOver\n\
drawApple:\n\
  ldy #0\n\
  lda sysRandom\n\
  sta (appleL),y\n\
  rts\n\
drawSnake:\n\
  ldx snakeLength\n\
  lda #0\n\
  sta (snakeHeadL,x) ; erase end of tail\n\
  ldx #0\n\
  lda #1\n\
  sta (snakeHeadL,x) ; paint head\n\
  rts\n\
spinWheels:\n\
  ldx #0\n\
spinloop:\n\
  nop\n\
  nop\n\
  dex\n\
  bne spinloop\n\
  rts\n\
gameOver:\n\
	";
	
	
	if (name == 'test1' || name == 'jumps' || name == 'adder' || name == 'recursive') {
		$("#code-textarea").val(programs[0]);
	} else if (name == 'testtttt' || name == "haha" || name == "nojoke") {
		$("#code-textarea").val(programs[1]);
	} else if (name == "advanced" || name == "intro") {
		$("#code-textarea").val(programs[2]);
	} else if (name == "snake") {
		$("#code-textarea").val(programs[10]);
	} else if (name == "bathe" || name =="inthe") {
		$("#code-textarea").val(programs[4]);
	} else if (name == "sun" || name == 'fun') {
		$("#code-textarea").val(programs[4]);
	}
}
