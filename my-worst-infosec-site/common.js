/*************************************
 * Общие настройки и функции
 *************************************/
const BASE_URL = "http://185.251.38.70:3000";
let adminTimeOutMs = 1000;

// "snow" или "rain"
let currentPrecipitation = null;
let precipitationInterval = null;

/*************************************
 * Простейшие вспомогательные функции
 *************************************/
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = text;
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "block";
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
  }
}

/**
 * Если клик был за пределами контента — закрываем модалку
 */
function closeIfClickedOutside(event, modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

/*************************************
 * Позиционирование сайдбара
 *************************************/
function positionSidebarRandomly() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const positions = ["top", "bottom", "left", "right"];
  const randomPos = positions[Math.floor(Math.random() * positions.length)];

  sidebar.style.top = "";
  sidebar.style.bottom = "";
  sidebar.style.left = "";
  sidebar.style.right = "";
  sidebar.style.transform = "";

  switch (randomPos) {
    case "top":
      sidebar.style.top = "0px";
      sidebar.style.left = "50%";
      sidebar.style.transform = "translateX(-50%)";
      break;
    case "bottom":
      sidebar.style.bottom = "0px";
      sidebar.style.left = "50%";
      sidebar.style.transform = "translateX(-50%)";
      break;
    case "left":
      sidebar.style.left = "0px";
      sidebar.style.top = "50%";
      sidebar.style.transform = "translateY(-50%)";
      break;
    case "right":
      sidebar.style.right = "0px";
      sidebar.style.top = "50%";
      sidebar.style.transform = "translateY(-50%)";
      break;
  }

  // Перемешиваем порядок ссылок в меню
  const ul = sidebar.querySelector("ul");
  for (let i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[(Math.random() * i) | 0]);
  }
}

/*************************************
 * Снег / Дождь (переключение осадков)
 *************************************/
function togglePrecipitation() {
  if (!currentPrecipitation) {
    startSnow();
  } else if (currentPrecipitation === "snow") {
    stopPrecipitation();
    startRain();
  } else if (currentPrecipitation === "rain") {
    stopPrecipitation();
    startSnow();
  }
}

function startSnow() {
  currentPrecipitation = "snow";
  spawnPrecipitation("❄");
}

function startRain() {
  currentPrecipitation = "rain";
  spawnPrecipitation("💧");
}

function stopPrecipitation() {
  if (precipitationInterval) {
    clearInterval(precipitationInterval);
    precipitationInterval = null;
  }
  const container = document.getElementById("precipitationContainer");
  if (container) {
    container.innerHTML = "";
  }
  currentPrecipitation = null;
}

function spawnPrecipitation(symbol) {
  const container = document.getElementById("precipitationContainer");
  if (!container) return;

  precipitationInterval = setInterval(() => {
    const elem = document.createElement("div");
    elem.textContent = symbol;
    elem.style.position = "absolute";
    elem.style.left = Math.random() * 100 + "%";
    elem.style.top = "-5%";
    elem.style.fontSize = "1.2rem";
    elem.style.opacity = 0.9;

    container.appendChild(elem);

    let fallSpeed = 5 + Math.random() * 4;
    let currentTop = -5;

    const fall = setInterval(() => {
      if (currentTop > 105) {
        clearInterval(fall);
        container.removeChild(elem);
      } else {
        currentTop += fallSpeed;
        elem.style.top = currentTop + "%";
      }
    }, 50);
  }, 100);
}
