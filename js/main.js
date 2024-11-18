// script.js
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

// textarea 자동 크기 조정
const textarea = document.getElementById('message-input');
textarea.addEventListener('input', autoResize);

function autoResize() {
  this.style.height = 'auto'; // 높이를 초기화해 텍스트 길이에 맞게 조정
  this.style.height = this.scrollHeight + 'px'; // 텍스트 길이에 맞게 높이를 재설정
}

function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  
  if (message === '') return;

  const chatMessages = document.getElementById('chat-messages');

  // Create a new message div
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', 'self');
  messageDiv.innerText = message;

  // Append the new message to chat
  chatMessages.appendChild(messageDiv);

  // Scroll to the bottom of the chat
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Clear the input field and reset height
  messageInput.value = '';
  messageInput.style.height = 'auto'; // 입력창 크기 초기화
}

const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');

// 파일 선택 시 자동으로 목록에 추가
fileInput.addEventListener('change', () => {
  const files = Array.from(fileInput.files); // 선택된 파일 배열

  files.forEach((file) => {
    const listItem = document.createElement('li');
    listItem.textContent = file.name; // 파일 이름 추가
    fileList.appendChild(listItem); // 목록에 추가
  });

  fileInput.value = ''; // 파일 입력 초기화 (같은 파일을 다시 선택할 수 있도록)
});