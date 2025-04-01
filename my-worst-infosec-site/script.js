/*************************************
 * Глобальные настройки
 *************************************/
const BASE_URL = "http://185.251.38.70:3000";
let adminTimeOutMs = 1000; // «Управляемый таймаут»
let currentPrecipitation = null; // "snow" или "rain"
let precipitationInterval = null;

/*************************************
 * Модалки
 *************************************/
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

function closeIfClickedOutside(event, modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  // Если кликнули на сам фон (modal), а не на контент
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
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

  // Перемешиваем порядок ссылок
  const ul = sidebar.querySelector("ul");
  for (let i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[(Math.random() * i) | 0]);
  }
}

/*************************************
 * Стартовые функции страниц
 *************************************/
function initializeLandingPage() {
  positionSidebarRandomly();
  startSnow(); // по умолчанию идёт снег
  openModal("modal-ozonAd"); // Показать рекламу Ozon сразу

  // Убегающий крестик
  const closeAdBtn = document.getElementById("closeAdBtn");
  if (closeAdBtn) {
    closeAdBtn.addEventListener("mouseover", moveCloseAdBtnRandom);
  }
}

function initializeLoginPage() {
  positionSidebarRandomly();
  startSnow();
}

function initializeRegisterPage() {
  positionSidebarRandomly();
  startSnow();
}

function initializeWeatherPage() {
  positionSidebarRandomly();
  startSnow();

  // Проверим "isLoggedIn" в localStorage (упрощённая логика)
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    openModal("modal-auth-required");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }
}

/*************************************
 * Снег / Дождь
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
  if (container) container.innerHTML = "";
  currentPrecipitation = null;
}

// Генерация осадков (снега/дождя) — интенсивная
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

/*************************************
 * Убегающий крестик в рекламе Ozon
 *************************************/
function moveCloseAdBtnRandom(event) {
  const btn = event.target;
  const parent = btn.parentElement; // .ad-content
  if (!parent) return;

  const rect = parent.getBoundingClientRect();
  const maxLeft = rect.width - 30;
  const maxTop = rect.height - 30;

  const randomLeft = Math.floor(Math.random() * maxLeft);
  const randomTop = Math.floor(Math.random() * maxTop);

  btn.style.position = "absolute";
  btn.style.left = randomLeft + "px";
  btn.style.top = randomTop + "px";
}

/*************************************
 * Проверка пароля (только '*','x','u','й', макс 5)
 *************************************/
function checkPasswordValidity(inputEl) {
  const allowedChars = ["*", "x", "u", "й"];
  for (let i = 0; i < inputEl.value.length; i++) {
    const ch = inputEl.value[i];
    if (!allowedChars.includes(ch)) {
      inputEl.value = inputEl.value.slice(0, -1);
      alert(`ОШИБКА!
Символ "${ch}" недопустим.
Допустимые: ${allowedChars.join(", ")}.
Макс. длина: 5.`);
      break;
    }
  }
}

/*************************************
 * Очередь (динамический отсчёт)
 *************************************/
function startQueueCountdown(peopleCount, onFinish) {
  // 4.5 сек на человека
  let totalMs = peopleCount * 4500;

  openModal("modal-queue");
  updateQueueText(peopleCount, totalMs);

  const intervalId = setInterval(() => {
    totalMs -= 1000;
    if (totalMs <= 0) {
      clearInterval(intervalId);
      closeModal("modal-queue");
      onFinish(); // очередь закончилась -> делаем действие
    } else {
      updateQueueText(peopleCount, totalMs);
    }
  }, 1000);
}

function updateQueueText(peopleCount, msLeft) {
  const sec = Math.ceil(msLeft / 1000);
  setText(
    "queueText",
    `Перед вами ${peopleCount} человек.\nПримерное время ожидания: ${sec} секунд.`
  );
}

/*************************************
 * Авторизация (GET /aus/voiti)
 *************************************/
function attemptLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  // Запустим очередь (1..5 человек)
  const peopleInQueue = Math.floor(Math.random() * 5) + 1;
  startQueueCountdown(peopleInQueue, () => {
    // После очереди - adminTimeOutMs задержка
    setTimeout(() => {
      fetch(
        `${BASE_URL}/aus/voiti?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      )
        .then(async (res) => {
          if (!res.ok) {
            // Сервер может кинуть 401 или другую ошибку
            const errText = await res.text();
            throw new Error(errText);
          }
          return res.json();
        })
        .then((data) => {
          // Успех: ставим localStorage isLoggedIn
          localStorage.setItem("isLoggedIn", "true");
          setText(
            "loginResultText",
            `Успешно: ${data.message} (userId=${data.userId})`
          );
          openModal("modal-login-result");
        })
        .catch((err) => {
          // Ошибка
          setText("loginResultText", `Ошибка входа: ${err.message}`);
          openModal("modal-login-result");
        });
    }, adminTimeOutMs);
  });
}

/*************************************
 * Регистрация (GET /aus/zaregastrirovatsya)
 *************************************/
function attemptRegister() {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  const peopleInQueue = Math.floor(Math.random() * 5) + 1;
  startQueueCountdown(peopleInQueue, () => {
    setTimeout(() => {
      // Делаем запрос на публичный эндпоинт регистрации
      fetch(
        `${BASE_URL}/aus/zaregastrirovatsya?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      )
        .then(async (res) => {
          if (!res.ok) {
            const errText = await res.text();
            throw new Error(errText);
          }
          return res.json();
        })
        .then((data) => {
          setText(
            "registerResultText",
            `Регистрация успешна: ID=${data.id}, Email=${data.email}`
          );
          openModal("modal-register-result");
          // Через 2 сек -> на логин
          setTimeout(() => {
            closeModal("modal-register-result");
            window.location.href = "login.html";
          }, 2000);
        })
        .catch((err) => {
          setText("registerResultText", `Ошибка регистрации: ${err.message}`);
          openModal("modal-register-result");
        });
    }, adminTimeOutMs);
  });
}

/*************************************
 * Погода (GET /pogoda/moya-pogoda)
 *************************************/
function fetchWeatherData() {
  const weatherTextEl = document.getElementById("weatherDataText");
  if (weatherTextEl) weatherTextEl.textContent = "Загружаем...";

  fetch(`${BASE_URL}/pogoda/moya-pogoda`)
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }
      return res.json();
    })
    .then((data) => {
      weatherTextEl.textContent = JSON.stringify(data, null, 2);
    })
    .catch((err) => {
      weatherTextEl.textContent = "Ошибка: " + err.message;
    });
}

/*************************************
 * CRUD по пользователям (полностью)
 *************************************/
function loadAllUsers() {
  fetch(`${BASE_URL}/polzovateli/vse-dannie`)
    .then((res) => res.json())
    .then((users) => {
      const usersEl = document.getElementById("usersTable");
      usersEl.textContent = JSON.stringify(users, null, 2);
    })
    .catch((err) => {
      alert("Ошибка загрузки пользователей: " + err.message);
    });
}

function addUser() {
  const email = document.getElementById("addUserEmail").value.trim();
  const password = document.getElementById("addUserPassword").value.trim();
  if (!email || !password) {
    alert("Заполните email и password");
    return;
  }

  // POST /polzovateli/dobavit?email=...&password=...
  fetch(
    `${BASE_URL}/polzovateli/dobavit?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`,
    {
      method: "POST",
    }
  )
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text());
      }
      return res.json();
    })
    .then((data) => {
      alert(`Пользователь добавлен: ${JSON.stringify(data)}`);
      loadAllUsers(); // обновим список
    })
    .catch((err) => {
      alert("Ошибка добавления: " + err.message);
    });
}

function updateUser() {
  const id = document.getElementById("updateUserId").value.trim();
  const email = document.getElementById("updateUserEmail").value.trim();
  const password = document.getElementById("updateUserPassword").value.trim();
  if (!id || !email || !password) {
    alert("Заполните id, email, password");
    return;
  }

  // PUT /polzovateli/izmenit?id=...&email=...&password=...
  fetch(
    `${BASE_URL}/polzovateli/izmenit?id=${id}&email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`,
    {
      method: "PUT",
    }
  )
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text());
      }
      return res.json();
    })
    .then((data) => {
      alert(`Пользователь изменён: ${JSON.stringify(data)}`);
      loadAllUsers();
    })
    .catch((err) => {
      alert("Ошибка изменения: " + err.message);
    });
}

function deleteUser() {
  const id = document.getElementById("deleteUserId").value.trim();
  if (!id) {
    alert("Укажите ID");
    return;
  }

  // DELETE /polzovateli/udalit?id=...
  fetch(`${BASE_URL}/polzovateli/udalit?id=${id}`, {
    method: "DELETE",
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text());
      }
      return res.json();
    })
    .then((data) => {
      alert(`Пользователь удалён: ${JSON.stringify(data)}`);
      loadAllUsers();
    })
    .catch((err) => {
      alert("Ошибка удаления: " + err.message);
    });
}

/*************************************
 * Выгрузка БД (txt) - GET /exploiti/dostat-vsu-bazu-dannih
 *************************************/
function downloadDbTxt() {
  fetch(`${BASE_URL}/exploiti/dostat-vsu-bazu-dannih`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text());
      }
      return res.text(); // приходит текст, хоть и содержимое JSON
    })
    .then((textData) => {
      // Создадим Blob
      const blob = new Blob([textData], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "database_dump.txt";
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch((err) => {
      alert("Ошибка выгрузки БД: " + err.message);
    });
}
