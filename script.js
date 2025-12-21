const players = document.querySelectorAll(".player");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const result = document.getElementById("result");
const codeInput = document.getElementById("codeInput");

let currentPlayer = "";
let secretSantaMapping = {}; // Lưu mapping: giver -> receiver

// Lấy danh sách tất cả người chơi từ HTML
function getAllPlayers() {
  return Array.from(players).map(p => p.dataset.player);
}

// Fisher-Yates shuffle để random mảng
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Tạo perfect matching: mỗi người tặng một người, mỗi người nhận một lần, không ai tự tặng
function createSecretSantaMapping() {
  const allPlayers = getAllPlayers();
  const shuffled = shuffleArray(allPlayers);
  const mapping = {};
  
  // Tạo derangement (hoán vị không có điểm cố định)
  // Tạo một vòng tròn: mỗi người tặng cho người tiếp theo trong mảng đã shuffle
  // Vì đã shuffle trước, nên không ai sẽ tự tặng cho mình
  for (let i = 0; i < shuffled.length; i++) {
    const receiverIndex = (i + 1) % shuffled.length;
    mapping[shuffled[i]] = shuffled[receiverIndex];
  }
  
  // Kiểm tra và sửa nếu có ai tự tặng (trường hợp hiếm khi chỉ có 2 người)
  // Nhưng với 8 người thì không thể xảy ra sau khi shuffle
  for (const giver in mapping) {
    if (giver === mapping[giver]) {
      // Nếu có ai tự tặng (không thể xảy ra với >2 người), swap với người khác
      const otherGiver = Object.keys(mapping).find(k => k !== giver);
      if (otherGiver) {
        [mapping[giver], mapping[otherGiver]] = [mapping[otherGiver], mapping[giver]];
      }
    }
  }
  
  return mapping;
}

// Khởi tạo mapping khi trang load (tạo mới mỗi lần refresh trang)
function initializeSecretSantaMapping() {
  // Mỗi lần refresh trang, tạo mapping mới
  secretSantaMapping = createSecretSantaMapping();
}

// Lấy người nhận cho người tặng
function getReceiver(giver) {
  return secretSantaMapping[giver] || null;
}

// Tạo message động (random mỗi lần)
function generateMessage(giver, receiver) {
  const messages = [
    `${giver} tặng ${receiver}, chúc ${receiver} năm mới phát tài phát lộc! 🧧`,
    `Tặng ${receiver} nhé, món quà nhỏ từ trái tim lớn ❤️`,
    `Tặng ${receiver} nha, Santa đã giao nhiệm vụ cho bạn rồi 🎅`,
    `Tặng ${receiver} đi tí được mời bia 🍻`,
    `Tặng ${receiver} nhé, chúc ${receiver} năm mới an khang thịnh vượng! 🐇`,
    `Tặng ${receiver} món quà nhỏ, chúc ${receiver} luôn hạnh phúc và may mắn! 🌟`,
    `Tặng ${receiver} món quà nhỏ, chúc ${receiver} mọi điều tốt lành! 🎁`,
    `Chúc ${receiver} trường thọ như hạt dẻ ngâm rượu 🍂`,
    `Tặng ${receiver} với tình cảm chân thành, chúc ${receiver} luôn vui vẻ! 😊`,
    `Món quà nhỏ gửi đến ${receiver}, hy vọng ${receiver} sẽ thích! 🎀`
  ];
  
  // Random message mỗi lần
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// Khởi tạo mapping khi trang load
initializeSecretSantaMapping();

players.forEach(p => {
  p.onclick = () => {
    currentPlayer = p.dataset.player;
    modalTitle.textContent = `🎄 Hello ${currentPlayer}`;
    modal.classList.remove("hidden");
    document.getElementById("modal-overlay").classList.remove("hidden");
    result.textContent = "";
    codeInput.value = "";
  };
});

document.getElementById("openGift").onclick = () => {
  const code = codeInput.value.trim();
  const data = SECRET_DATA[code];

  if (!data || data.player !== currentPlayer) {
    result.style.color = "#ff4d6d";
    result.textContent = `
      Đã nói rồi mà, cho xin con beat số 2 diss khứa
      có cái secret cũng nhập sai này coi 😭`;
    result.style.color = "red";
    return;
  }

  // Lấy người nhận từ mapping đã tạo
  const receiver = getReceiver(currentPlayer);
  
  if (!receiver) {
    result.style.color = "#ff4d6d";
    result.textContent = "Có lỗi xảy ra, vui lòng refresh trang và thử lại!";
    return;
  }

  // Tạo message random
  const message = generateMessage(currentPlayer, receiver);

  result.style.color = "#2ecc71";
  result.innerHTML = `
    <div class="gift-animation">🎁</div>
    🎄 Bạn sẽ tặng quà cho <strong>${receiver}</strong> 🎁<br/>
    <em>${message}</em>
  `;
};

document.getElementById("closeModal").onclick = () => {
  modal.classList.add("hidden");
  document.getElementById("modal-overlay").classList.add("hidden");

};

const snowContainer = document.getElementById("snow-container");

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  snowflake.textContent = "❄️";

  snowflake.style.left = Math.random() * 100 + "vw";
  snowflake.style.fontSize = (Math.random() * 10 + 10) + "px";
  snowflake.style.animationDuration =
    (Math.random() * 5 + 5) + "s, " +
    (Math.random() * 3 + 3) + "s";

  snowContainer.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 10000);
}

setInterval(createSnowflake, 300);
