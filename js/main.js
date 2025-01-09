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

// 메세지 전송
async function sendMessage() {
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

  // 사용자 메시지 요소 생성
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', 'user-message');
  messageDiv.textContent = userMessage;
  chatMessages.appendChild(messageDiv);

  // 입력창 비우고 높이 초기화
  messageInput.value = '';
  updateSendButtonState();
  messageInput.style.height = 'auto';

  // 스크롤을 최신 메시지로
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // chat-input 아래로 이동
  chatInput.classList.add('down');
  
  try {
    const token = localStorage.getItem("token");

    // URL에서 chatroom_id 추출
    const currentPath = window.location.pathname; // 현재 경로: /chatroom=618188db-4240-4bb9-9830-a83272731d48
    const chatroom_id = currentPath.split("=")[1]; // '=' 이후 값 추출
    console.log("chatroom is ", chatroom_id);

    const response = await fetch("http://localhost:8008/chat/new", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
      },
      body: JSON.stringify({ message: userMessage, chatroom_id}),
    });

    const result = await response.json();
    console.log("Chat Response:", result);

    if (response.ok && result.chatroomId) {
      // 채팅방 ID가 있으면 해당 페이지로 이동
      // window.location.href = `http://localhost:5500/chatroom=${result.chatroomId}`;
      // URL 변경 (새로고침 없이)
      const chatroomId = result.chatroomId;
      history.pushState(null, "", `/chatroom=${chatroomId}`);

      // 필요한 경우 새 데이터를 가져와서 화면에 반영
      console.log(`Navigated to chatroom: ${chatroomId}`);
    } else {
      console.error("Failed to get chatroom ID.");
    }
  } catch (error) {
    console.error("Error sending chat message:", error);
  }

  //  // 챗봇 응답 메시지 추가 (지연된 응답으로 표시)
  //  setTimeout(() => {
  //   const botMessage = generateBotResponse(userMessage);
  //   const botMessageDiv = document.createElement('div');
  //   botMessageDiv.classList.add('message', 'bot-message');
  //   botMessageDiv.textContent = botMessage;
  //   chatMessages.appendChild(botMessageDiv);

  //   // 스크롤을 최신 메시지로
  //   chatMessages.scrollTop = chatMessages.scrollHeight;
  // }, 1000); // 1초 딜레이
}

// 챗봇 응답 생성 함수 (TEST)
function generateBotResponse(userMessage) {
  // 간단한 예제: 특정 키워드에 따라 응답 생성
  if (userMessage.toLowerCase().includes('hello')) {
    return 'Hello! How can I assist you today?';
  } else if (userMessage.toLowerCase().includes('bye')) {
    return 'Goodbye! Have a great day!';
  } else {
    return 'I am not sure how to respond to that. Can you elaborate?';
  }
}

const userButton = document.querySelector('.user');
const loginPopup = document.getElementById('login-popup');
const closeButton = document.querySelector('.close-button');
const loginButton = document.querySelector('.login-button')
const loginInput = document.querySelector('.login-form input#userid')

// 로그인 팝업 열기
userButton.addEventListener('click', function () {
  loginPopup.classList.remove('hidden');
});

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".login-button");
  const loginInput = document.querySelector("input#userid");
  const passwordInput = document.querySelector("input#password");

  loginButton.addEventListener("click", async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const userid = loginInput.value.trim();
    const password = passwordInput.value.trim();

    if (!userid || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8008/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid, password }),
        credentials: "include", // 쿠키를 활성화
      });

      const result = await response.json();
      console.log("Server Response:", result); // JSON 응답 확인
      console.log("JWT Token:", result.token); // 토큰 출력 

      if (response.ok) {
        alert(result.message); // "Login successful"
        console.log(`Logged in as: ${result.userid}`);
        console.log("JWT Token:", result.token); // 토큰 출력
        localStorage.setItem("token", result.token);
        loginPopup.classList.add("hidden"); // 팝업 닫기
      } else {
        alert(result.message); // "Invalid userid or password"
      }
    } catch (error) {
      console.error("Error:", error);
      alert("로그인 요청 중 오류가 발생했습니다.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loginPopup = document.getElementById("login-popup");
  const signInPopup = document.getElementById("sign-in-popup");
  const signInButton = document.querySelector(".sign-in-button");
  const closeButtons = document.querySelectorAll(".close-button");
  const signInForm = document.getElementById("sign-in-form");

  // 회원가입 버튼 클릭 시 login-popup 닫고 sign-in-popup 열기
  signInButton.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    loginPopup.classList.add("hidden"); // 로그인 팝업 숨기기
    signInPopup.classList.remove("hidden"); // 회원가입 팝업 표시
  });

  // 닫기 버튼 클릭 시 팝업 닫기
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      loginPopup.classList.add("hidden");
      signInPopup.classList.add("hidden");
    });
  });

  // 회원가입 폼 제출 시 localStorage에 데이터 저장
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const username = document.getElementById("set-username").value.trim();
    const userid = document.getElementById("set-userid").value.trim();
    const password = document.getElementById("set-password").value.trim();

    if (!username || !userid || !password) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 데이터 저장
    localStorage.setItem(userid, JSON.stringify({ username, password }));
    alert("회원가입이 완료되었습니다!");

    // 회원가입 팝업 닫고 로그인 팝업 열기
    signInPopup.classList.add("hidden");
    loginPopup.classList.remove("hidden");
  });

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
  newChat.textContent = `과목 ${chatCount}`;

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
