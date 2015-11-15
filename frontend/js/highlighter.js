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
			if ($.inArray(container[spanCount].outerText.toUpperCase(), commands)  > -1) {
				text.style.color = "red";
			}
			// Black number
			else if (container[spanCount].outerText == "00") {
				text.style.color = "black";
			}
			// White number
			else if (container[spanCount].outerText == "01") {
				text.style.color = "white";
			}
			// Red number
			else if (container[spanCount].outerText == "02") {
				text.style.color = "red";
			}
			// Cyan number
			else if (container[spanCount].outerText == "03") {
				text.style.color = "cyan";
			}
			// Purple number
			else if (container[spanCount].outerText == "04") {
				text.style.color = "purple";
			}
			// Green number
			else if (container[spanCount].outerText == "05") {
				text.style.color = "green";
			}
			// Blue number
			else if (container[spanCount].outerText == "06") {
				text.style.color = "blue";
			}
			// Yellow number
			else if (container[spanCount].outerText == "07") {
				text.style.color = "yellow";
			}
			// Orange number
			else if (container[spanCount].outerText == "08") {
				text.style.color = "orange";
			}
			// Brown number
			else if (container[spanCount].outerText == "09") {
				text.style.color = "brown";
			}
			// Light red number
			else if (container[spanCount].outerText == "0a") {
				text.style.color = "pink";
			}
			// Dark grey number
			else if (container[spanCount].outerText == "0b") {
				text.style.color = "#4d4d4d";
			}
			// grey number
			else if (container[spanCount].outerText == "0c") {
				text.style.color = "grey";
			}
			// light green number
			else if (container[spanCount].outerText == "0d") {
				text.style.color = "#00e600";
			}
			// light blue number
			else if (container[spanCount].outerText == "0e") {
				text.style.color = "#33adff";
			}
			// light grey number
			else if (container[spanCount].outerText == "0f") {
				text.style.color = "#cccccc";
			}
			
			console.log(text.outerHTML);
		}	
	}
});