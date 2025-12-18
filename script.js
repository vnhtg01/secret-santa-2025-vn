const players = document.querySelectorAll(".player");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const result = document.getElementById("result");
const codeInput = document.getElementById("codeInput");

let currentPlayer = "";

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
      Cho xin con beat số 2 diss khứa
      có cái secret cũng nhập sai này coi 😭`;
    result.style.color = "red";
    return;
  }

  result.style.color = "#2ecc71";
  result.innerHTML = `
    <div class="gift-animation">🎁</div>
    🎄 Bạn sẽ tặng quà cho <strong>${data.givesTo}</strong> 🎁<br/>
    <em>${data.message}</em>
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
