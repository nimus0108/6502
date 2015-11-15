$(document).ready(function () {
	window.onkeypress = function(event) {
		var container = document.getElementsByClassName("cm-variable");
		
		var commands = [
			"ADC", "AND", "ASL", "BCC", "BCS", "BEQ",
			"BIT", "BMI", "BNE", "BPL", "BRK", "BVC",
			"BVS", "CLC", "CLD", "CLI", "CLV", "CMP",
			"CPX", "CPY", "DEC", "DEX", "DEY", "EOR",
			"INC", "INX", "INY", "JMP", "JSR", "LDA",
			"LDX", "LDY", "LSR", "NOP", "ORA", "PHA",
			"PHP", "PLA", "PLP", "ROL", "RTI", "RTS",
			"SBC", "SEC", "SED", "SEI", "STA", "STX",
			"STY", "TAX", "TAY", "TSX", "TXA", "TXS",
			"TYA"
		]
		
		for (var spanCount = 0; spanCount < container.length; spanCount++) {
			var text = (container[spanCount]);
			// This is for any of the commands (e.g. PHA)
			if ($.inArray(container[spanCount].outerText.toUpperCase(), commands)  > 0) {
				container[spanCount].style.color = "red";
			}
			// Black number
			else if (container[spanCount].outerText == "#$00") {
				container[spanCount].style.color = "black";
			}
			// White number
			else if (container[spanCount].outerText == "#$01") {
				container[spanCount].style.color = "white";
			}
			// Red number
			else if (container[spanCount].outerText == "#$02") {
				container[spanCount].style.color = "red";
			}
			// Cyan number
			else if (container[spanCount].outerText == "#$03") {
				container[spanCount].style.color = "cyan";
			}
			// Purple number
			else if (container[spanCount].outerText == "#$04") {
				container[spanCount].style.color = "purple";
			}
			// Green number
			else if (container[spanCount].outerText == "#$05") {
				container[spanCount].style.color = "green";
			}
			// Blue number
			else if (container[spanCount].outerText == "#$06") {
				container[spanCount].style.color = "blue";
			}
			// Yellow number
			else if (container[spanCount].outerText == "#$07") {
				container[spanCount].style.color = "yellow";
			}
			// Orange number
			else if (container[spanCount].outerText == "#$08") {
				container[spanCount].style.color = "orange";
			}
			// Brown number
			else if (container[spanCount].outerText == "#$09") {
				container[spanCount].style.color = "brown";
			}
			// Light red number
			else if (container[spanCount].outerText == "#$0a") {
				container[spanCount].style.color = "pink";
			}
			// Dark grey number
			else if (container[spanCount].outerText == "#$0b") {
				container[spanCount].style.color = "#4d4d4d";
			}
			// grey number
			else if (container[spanCount].outerText == "#$0c") {
				container[spanCount].style.color = "grey";
			}
			// light green number
			else if (container[spanCount].outerText == "#$0d") {
				container[spanCount].style.color = "#00e600";
			}
			// light blue number
			else if (container[spanCount].outerText == "#$0e") {
				container[spanCount].style.color = "#33adff";
			}
			// light grey number
			else if (container[spanCount].outerText == "#$0f") {
				container[spanCount].style.color = "#cccccc";
			}
			
			console.log(container[spanCount].outerHTML);
		}	
	}
});