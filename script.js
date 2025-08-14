const output = document.getElementById("output");
const startButton = document.getElementById("startButton");

let finalTransScript = "";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
// recognition.continuous = true;
recognition.interimResults = true;

startButton.addEventListener("click", () => {
  finalTransScript = "";
  output.textContent = "";
  recognition.start();
  startButton.textContent = "listening...";
});

recognition.addEventListener("result", (e) => {
  const transScript = Array.from(e.results)
    .map((result) => result[0].transcript)
    .join("");

  if (e.results[0].isFinal) {
    finalTransScript = transScript;
    output.textContent = transScript;
  }
});

recognition.addEventListener("end", () => {
  startButton.textContent = "startButton";
  recognition.start();
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    recognition.stop();
    startButton.textContent = "startButton";
  }
});
