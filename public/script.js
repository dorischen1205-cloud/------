/**
 * 前端 JavaScript - 互動邏輯
 * 處理聊天、表單提交、導航等功能
 */

const API_BASE = window.location.origin;

/**
 * 發送聊天消息
 */
async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (!message) return;

  // 添加用戶消息到聊天框
  addMessageToChat(message, 'user');
  input.value = '';

  try {
    // 發送消息到後端 API
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('API 請求失敗');
    }

    const data = await response.json();

    // 添加 AI 回應到聊天框
    addMessageToChat(data.aiResponse, 'ai');
  } catch (error) {
    console.error('錯誤:', error);
    addMessageToChat(
      '抱歉，系統出現錯誤，請稍後再試。',
      'ai'
    );
  }
}

/**
 * 將消息添加到聊天框
 * @param {string} text - 消息文本
 * @param {string} sender - 發送者類型 ('user' 或 'ai')
 */
function addMessageToChat(text, sender) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'ai-message'}`;

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = text;

  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);

  // 自動滾動到最新消息
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * 處理聊天輸入框回車鍵
 * @param {Event} event - 鍵盤事件
 */
function handleChatKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

/**
 * 提交聯絡表單
 */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
      };

      try {
        const response = await fetch(`${API_BASE}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        const messageDiv = document.getElementById('form-message');

        if (response.ok) {
          messageDiv.className = 'form-message success';
          messageDiv.textContent = data.message;
          contactForm.reset();

          // 3 秒後隱藏消息
          setTimeout(() => {
            messageDiv.style.display = 'none';
          }, 3000);
        } else {
          messageDiv.className = 'form-message error';
          messageDiv.textContent = data.error;
        }
      } catch (error) {
        console.error('錯誤:', error);
        const messageDiv = document.getElementById('form-message');
        messageDiv.className = 'form-message error';
        messageDiv.textContent = '提交失敗，請稍後再試。';
      }
    });
  }

  // 導航鏈接平滑滾動
  setupNavigation();
});

/**
 * 設置導航功能
 */
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        scrollTo(href.substring(1));

        // 更新活動狀態
        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // 監聽滾動位置，更新導航
  window.addEventListener('scroll', updateActiveNavLink);
}

/**
 * 更新導航中的活動鏈接
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop - 100 &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => link.classList.remove('active'));
      const activeLink = document.querySelector(
        `.nav-link[href="#${section.id}"]`
      );
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

/**
 * 滾動到指定位置
 * @param {string} id - 目標 ID
 */
function scrollTo(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * 漢堡菜單功能
 */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.style.display =
        navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});
