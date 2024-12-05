let messages = [];

const chatLog = document.getElementById("chat-log");
const message = document.getElementById("message");

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const messageText = message.value;

  const newMessage = { role: "user", content: `${messageText}` };
  messages.push(newMessage);

  message.value = "";

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add("message--sent");
  messageElement.innerHTML = `
    <div class="message__text">${messageText}</div>
  `;

  chatLog.appendChild(messageElement);

  // SERVIDOR LOCAL
  // fetch("http://localhost:3000/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     messages,
  //   }),
  // })
  // SERVIDOR LOCAL
  fetch("https://chatbotbackend.vercel.app/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      let newAssistantMessage = { role: "assistant", content: `${(data.chat_completion, message.content)}` };

      messages.push(newAssistantMessage);

      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.classList.add("message--received");
      messageElement.innerHTML = `
      <div class="message__text">${(data.chat_completion, message.content)}</div>
    `;

      chatLog.appendChild(messageElement);
    });
});

console.log(chatLog);
