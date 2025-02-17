document.addEventListener("DOMContentLoaded", function () {
	const inputField = document.getElementById("command");
	const outputDiv = document.getElementById("output");
	const terminal = document.getElementById("terminal");

	let commandHistory = [];
	let historyIndex = -1;
	let commands = {};

	// Auto-scroll to bottom when content loads
	const scrollToBottom = () => {
		terminal.scrollTop = terminal.scrollHeight;
	};

	// Load commands from external file
	fetch("commands.json")
		.then((response) => response.json())
		.then((data) => {
			commands = data;
			appendOutput(
				"💻 Welcome to Kathryn's Terminal! Type 'help' for available commands."
			);
		})
		.catch((error) => {
			appendOutput("❌ Failed to load commands. Please try again later.");
			console.error("Error loading commands:", error);
		});

	// Function to append text to the terminal output
	function appendOutput(text, isCommand = false) {
		const outputLine = document.createElement("div");

		// Replace links in the format text(link)
		text = replaceLinks(text);

		outputLine.innerHTML = isCommand
			? `<span style="color: #4CAF50;">$ ${text}</span>`
			: text;

		outputDiv.appendChild(outputLine);

		// Immediately scroll to the bottom after appending
		scrollToBottom();

		if (!isCommand) {
			typeEffect(outputLine, text); // Apply animated typing effect
		}
	}

	// Function to replace (text(link)) with a clickable link
	function replaceLinks(text) {
		return text.replace(/(\b[A-Za-z0-9 ]+\([^\)]+\))/g, function (match) {
			const parts = match.split("(");
			const name = parts[0].trim();
			const url = parts[1].replace(")", "").trim();
			return `<a style="cursor: pointer" onclick="javascript: window.open('${url}', '_blank');">${name}</a>`;
		});
	}

	// Function to simulate typing effect, with HTML content handling
	function typeEffect(element, text, speed = 1) {
		let i = 0;
		let currentContent = ""; // This will build the string gradually
		let textLength = text.length;

		// Handling content with links
		function type() {
			if (i < textLength) {
				// If the character is a <a> tag, treat it as a single chunk, not character-by-character
				if (text[i] === "<") {
					// Find the closing '>' of the tag
					const tagEndIndex = text.indexOf(">", i) + 1;
					currentContent += text.slice(i, tagEndIndex); // Append the entire tag
					i = tagEndIndex; // Skip over the entire tag
				} else {
					currentContent += text.charAt(i);
					i++;
				}

				element.innerHTML = currentContent; // Set the gradually built string to innerHTML
				setTimeout(type, speed);
				scrollToBottom();
			}
		}
		type();
	}

	inputField.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			if (inputField.value.trim() === "") return;
			const command = inputField.value.trim().toLowerCase();
			inputField.value = "";
			commandHistory.push(command);
			historyIndex = commandHistory.length;
			appendOutput(command, true);

			handleCommand(command);
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			if (historyIndex > 0) {
				historyIndex--;
				inputField.value = commandHistory[historyIndex];
			}
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			if (historyIndex < commandHistory.length - 1) {
				historyIndex++;
				inputField.value = commandHistory[historyIndex];
			} else {
				historyIndex = commandHistory.length;
				inputField.value = "";
			}
		}
	});

	// Handle commands
	function handleCommand(command) {
		const aliases = {
			cls: "clear",
		};

		// Check for alias
		if (aliases[command]) {
			command = aliases[command];
		}

		// If the 'help' command is entered, display dynamic help
		if (command === "help") {
			const helpText = generateHelp(commands);
			appendOutput(helpText);
		} else if (commands[command] !== undefined) {
			if (command === "clear") {
				outputDiv.innerHTML = "";
			} else {
				appendOutput(commands[command]);
			}
		} else {
			appendOutput(
				`⚠️ Command '${command}' not found. Type 'help' to see available commands.`
			);
		}
	}

	// Generate dynamic help text based on available commands
	function generateHelp(commands) {
		let helpText = "✨ **Available Commands:** ✨\n\n";

		// Loop through commands object and add command names to the helpText
		for (const command of Object.keys(commands)) {
			if (command !== "help") {
				// Skip the 'help' command itself
				helpText += `\`${command}\`\n`;
			}
		}

		return helpText;
	}
});
