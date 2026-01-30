# Kathryn's Terminal ❤️

A personal, terminal-style web application created as an 8-month anniversary gift. This project simulates a command-line interface where the user can enter various commands to display sweet messages, ASCII art, and other fun responses.

## ✨ Features

*   **Interactive Terminal Interface**: A clean, modern terminal UI built with HTML, CSS, and JavaScript.
*   **Dynamic Command Loading**: Commands and their outputs are fetched from an external `commands.json` file, making them easy to update.
*   **Typing Effect**: Command responses are rendered with an animated typing effect for a more engaging experience.
*   **Command History**: Navigate through previously entered commands using the `ArrowUp` and `ArrowDown` keys.
*   **Built-in Help**: A `help` command dynamically generates a list of all available commands.

## 🚀 How to Run Locally

Because this project fetches a local JSON file (`commands.json`), you'll need to run it from a local web server to avoid browser security restrictions (CORS errors).

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/prasen-shakya/kathryn-terminal.git
    cd kathryn-terminal
    ```

2.  **Start a local web server.**
    If you have Python 3 installed, you can run a simple server:
    ```bash
    python -m http.server
    ```
    Alternatively, you can use a tool like the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code.

3.  **Open the application.**
    Navigate to `http://localhost:8000` (or the address provided by your server) in your web browser.

## 💻 Available Commands

Type any of the following commands into the terminal and press `Enter`:

| Command | Description |
| :--- | :--- |
| `help` | Displays a list of all available commands. |
| `aboutme` | A little about why this project was made. |
| `love` | A message of love. |
| `heart` | Displays ASCII art of a heart. |
| `secret` | A secret message just for you. |
| `anniversary` | A happy 8-month anniversary message. |
| `future` | Thoughts about a future together. |
| `hug` | A virtual hug. |
| `song` | A link to a special song. |
| `showerthoughts`| A sweet thought. |
| `joke` | A (really bad) joke. |
| `foryou` | A message of appreciation. |
| `randomfact` | A cool fact about octopuses. |
| `quote` | A quote about love by Aristotle. |
| `apologies` | An apology for the limited command set. |
| `bear` | Displays ASCII art of a bear. |
| `doggie` | Displays ASCII art of a dog. |
| `clear` | Clears the terminal screen (`cls` works too). |
| `;) ` | A special piece of ASCII art. |

## 📂 Project Structure

*   `index.html`: The main HTML file that provides the structure for the terminal.
*   `style.css`: Contains all the styles for the terminal's appearance, including the layout, colors, and animations.
*   `script.js`: Handles the application's logic, including command input, fetching data from `commands.json`, processing commands, and rendering output.
*   `commands.json`: A JSON file storing all the available commands and their corresponding string outputs.
