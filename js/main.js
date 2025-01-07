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

const userButton = document.querySelector('.user');
const loginPopup = document.getElementById('login-popup');
const closeButton = document.querySelector('.close-button');
const loginButton = document.querySelector('.login-button')
const loginInput = document.querySelector('.login-form input#username')

// 팝업 열기
userButton.addEventListener('click', function () {
  loginPopup.classList.remove('hidden');
});

// 팝업 닫기
closeButton.addEventListener('click', function () {
  loginPopup.classList.add('hidden');
});

// 팝업 바깥 클릭 시 닫기
loginPopup.addEventListener('click', function (event) {
  if (event.target === loginPopup) {
    loginPopup.classList.add('hidden');
  }
});

// 사이드바 토글 처리
const sideContainer = document.querySelector('.side-container');
const toggleButton = document.getElementById('toggle-sidebar');
const chatHeader = document.querySelector('.chat-header');

// 사이드바 초기 설정
if (localStorage.getItem('sidebarCollapsed') === 'true') {
  sideContainer.classList.add('collapsed');
  chatHeader.classList.add('collapsed');
}

// 사이드바 상태 저장하여 새로고침 후에도 유지
toggleButton.addEventListener('click', function () {
  const isCollapsed = sideContainer.classList.toggle('collapsed');
  chatHeader.classList.toggle('collapsed');
  localStorage.setItem('sidebarCollapsed', isCollapsed);
});

// 사이드바 list 토글 처리
document.querySelectorAll('.toggle-section-button').forEach((button) => {
  button.addEventListener('click', function (e) {
    const menuHeader = e.target.closest('.menu-header');
    const collapsible = menuHeader.nextElementSibling;

    // 토글 상태 변경
    if (collapsible.classList.contains('expanded')) {
      collapsible.classList.remove('expanded');
      button.querySelector('.material-icons').textContent = 'expand_more';
    } else {
      collapsible.classList.add('expanded');
      button.querySelector('.material-icons').textContent = 'expand_less';
    }
  });
});

// 파일 추가
const fileInput = document.getElementById('file-input');
const addFileButton = document.getElementById('add-file-button');
const fileList = document.querySelector('.file-list');

// 파일 추가 버튼 클릭 시 파일 선택창 열기
addFileButton.addEventListener('click', () => {
  fileInput.click();
});

// 파일 선택 후 리스트에 추가
fileInput.addEventListener('change', () => {
  const files = Array.from(fileInput.files);

  files.forEach((file) => {
    // 중복 파일 처리
    const isDuplicate = Array.from(fileList.children).some(
      (child) => child.firstChild.textContent === file.name
    );
    if (!isDuplicate) {
      const fileItem = document.createElement('div');
      fileItem.classList.add('file-item');

      // 파일 이름 표시
      const fileName = document.createElement('span');
      fileName.textContent = file.name;

      // 삭제 버튼
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => fileItem.remove());

      // 리스트에 추가
      fileItem.appendChild(fileName);
      fileItem.appendChild(deleteButton);
      fileList.appendChild(fileItem);
    }
  });
  // 파일 입력창 초기화
  fileInput.value = '';
});

// 새로운 채팅 추가
const addChatButton = document.querySelector('.add-chat-button');
const chatsListUl = document.querySelector('.chats-list ul');

let chatCount = 1; // 기본 값 설정

addChatButton.addEventListener('click', function () {
  chatCount++; // 새로운 채팅 번호 증가

  const newChat = document.createElement('li');
  newChat.textContent = `Chat ${chatCount}`;

  // chat-more-button 추가
  const moreButton = document.createElement('button');
  moreButton.classList.add('chat-more-button');
  moreButton.innerHTML = '<div class="material-icons">more_horiz</div>';

  // li에 button 추가
  newChat.appendChild(moreButton);

  // chats-list ul에 li 추가
  chatsListUl.appendChild(newChat);
});

const chatsList = document.querySelector('.chats-list');
const popup = document.getElementById('action-popup');
const deleteButton = document.getElementById('delete-chat');
const closePopupButton = document.getElementById('close-popup');
const renameInput = document.getElementById('chat-name');
const saveRenameButton = document.getElementById('save-rename');

let selectedChat = null;

// Add event listener to action buttons
chatsList.addEventListener('click', (e) => {
  if (e.target.closest('.chat-more-button')) {
    selectedChat = e.target.closest('li');
    openPopup();
  }
});

// Open popup
function openPopup() {
  popup.classList.remove('hidden');
}

// Close popup
function closePopup() {
  popup.classList.add('hidden');
  selectedChat = null;
}

closePopupButton.addEventListener('click', closePopup);

// Rename chat
saveRenameButton.addEventListener('click', () => {
  const newName = renameInput.value.trim();
  if (newName && selectedChat) {
    selectedChat.firstChild.textContent = newName + ' ';
    renameInput.value = '';
    closePopup();
  }
});

// Delete chat
deleteButton.addEventListener('click', () => {
  if (selectedChat && confirm(`채팅방을 삭제하시겠습니까?`)) {
    selectedChat.remove();
    closePopup();
  }
});
