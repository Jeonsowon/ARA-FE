  const messageInput = document.getElementById('message-input');
  const sendButton = document.querySelector('.send-button');
  const chatDescription = document.querySelector('.chat-description');
  const chatContent = document.querySelector('.chat-content');
  const chatInput = document.querySelector('.chat-input');
  const chatAction = document.querySelector('.chat-actions');

  // 입력창 내용따라 send 버튼 활성화
  messageInput.addEventListener('input', updateSendButtonState);

  // 초기 상태도 검사 (새로고침하면 내용이 비어있으므로 disabled)
  updateSendButtonState();

  function updateSendButtonState() {
    // 입력값이 비어있는지 확인
    const userMessage = messageInput.value.trim();
    if (userMessage.length === 0) {
      // 비어있으면 버튼 비활성화
      sendButton.disabled = true;
    } else {
      // 내용 있으면 버튼 활성화
      sendButton.disabled = false;
    }
  }

  // 메세지 전송 event 
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  const textarea = messageInput;
  textarea.addEventListener('input', autoResize);

  function autoResize() {
    this.style.height = 'auto'; // 높이를 초기화해 텍스트 길이에 맞게 조정
    this.style.height = this.scrollHeight + 'px'; // 텍스트 길이에 맞게 높이를 재설정
  }

  function sendMessage() {
    const userMessage = messageInput.value.trim();

    chatDescription.classList.add('hide');
    chatAction.classList.add('hide');

    let chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) {
      chatMessages = document.createElement('div');
      chatMessages.id = 'chatMessages';
      chatMessages.classList.add('chat-messages');
      chatContent.appendChild(chatMessages);
    }

    // 입력 값이 비어 있으면 종료
    if (!userMessage) return;

    // 채팅 메시지 요소 생성
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'user-message');
    messageDiv.textContent = userMessage;

    // .chat-messages에 추가
    chatMessages.appendChild(messageDiv);

    // 스크롤을 최신 메시지로
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 입력창 비우고 높이 초기화
    messageInput.value = '';
    updateSendButtonState();
    messageInput.style.height = 'auto'; // 입력창 크기 초기화

    // chat-input 아래로 이동
    chatInput.classList.add('down');
  }



/*
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
*/