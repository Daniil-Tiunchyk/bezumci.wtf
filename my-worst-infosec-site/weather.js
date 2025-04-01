/*************************************
 * Глобальные настройки
 *************************************/
const BASE_URL = "http://185.251.38.70:3000"; // Пример
let currentPrecipitation = null; // "snow" или "rain"
let precipitationInterval = null;

// Город/температура по умолчанию (логика "проверить город")
let currentCity = "";
let currentTemp = "21°C";

/*************************************
 * Инициализация страницы
 *************************************/
function initializeWeatherPage() {
  positionSidebarRandomly();
  startSnow(); // по умолчанию идёт снег

  // Проверим авторизацию:
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    openModal("modal-auth-required");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } else {
    // Если авторизован, подготавливаем погоду
    setupWeatherUI();
    showUserTableFake(); // Псевдо-CRUD
  }
}

/*************************************
 * Псевдо-CRUD пользователей (фейк)
 *************************************/
function downloadFakeDB() {
  // В демо делаем просто фейковый JSON -> txt
  const fakeUsers = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Eve", role: "guest" },
  ];
  const jsonStr = JSON.stringify(fakeUsers, null, 2);

  const blob = new Blob([jsonStr], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "fake_users_db.txt";
  link.click();
  URL.revokeObjectURL(link.href);
}

function showUserTableFake() {
  const fakeUsers = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Eve", role: "guest" },
  ];

  const usersEl = document.getElementById("usersTable");
  if (usersEl) {
    usersEl.textContent = fakeUsers
      .map((u) => `#${u.id} | ${u.name} [${u.role}]`)
      .join("\n");
  }
}

/*************************************
 * Логика погоды (клиентская)
 *************************************/
function setupWeatherUI() {
  // Ставим рандомный город
  currentCity = getRandomCity();
  currentTemp = "21°C";
  updateWeatherUI();

  // Привязываем кнопку "Сохранить" в модалке "Введите правильную погоду"
  const submitWeatherBtn = document.getElementById("userWeatherSubmit");
  if (submitWeatherBtn) {
    submitWeatherBtn.onclick = () => {
      const input = document.getElementById("userWeatherInput");
      if (input && input.value.trim()) {
        currentTemp = input.value.trim();
      }
      closeModal("modal-enter-weather");
      openModal("modal-thanks");
      setTimeout(() => {
        closeModal("modal-thanks");
        updateWeatherUI();
      }, 1500);
    };
  }
}

function startCityCheck() {
  // Спрашиваем "Это ваш город?" через модалку
  const cityQuestionText = document.getElementById("cityQuestionText");
  if (cityQuestionText) {
    cityQuestionText.textContent = `Это ваш город: ${currentCity}?`;
  }
  openModal("modal-check-city");

  const yesBtn = document.getElementById("cityYesBtn");
  const noBtn = document.getElementById("cityNoBtn");

  if (yesBtn) {
    yesBtn.onclick = () => {
      closeModal("modal-check-city");
      openModal("modal-lie"); // "Вы солгали!"
      setTimeout(() => {
        closeModal("modal-lie");
        askWeatherCheck();
      }, 1500);
    };
  }
  if (noBtn) {
    noBtn.onclick = () => {
      closeModal("modal-check-city");
      // Меняем город
      currentCity = getRandomCity();
      document.getElementById("newCityName").textContent = currentCity;
      openModal("modal-new-city");
      setTimeout(() => {
        closeModal("modal-new-city");
        askWeatherCheck();
      }, 1500);
    };
  }
}

function askWeatherCheck() {
  // Спрашиваем: "Это верная погода?"
  const questionEl = document.getElementById("weatherQuestion");
  if (questionEl) {
    questionEl.textContent = `Считаем, что там ${currentTemp}. Верно?`;
  }
  openModal("modal-check-weather");

  const yesBtn = document.getElementById("weatherYesBtn");
  const noBtn = document.getElementById("weatherNoBtn");

  if (yesBtn) {
    yesBtn.onclick = () => {
      closeModal("modal-check-weather");
      // Ничего не меняем
      updateWeatherUI();
    };
  }
  if (noBtn) {
    noBtn.onclick = () => {
      closeModal("modal-check-weather");
      // Показываем модалку "Введите правильную погоду"
      openModal("modal-enter-weather");
    };
  }
}

function updateWeatherUI() {
  // Обновляем HTML
  const cityEl = document.getElementById("currentCity");
  const weatherEl = document.getElementById("currentWeather");
  const imgEl = document.getElementById("weatherImage");

  if (cityEl) cityEl.textContent = currentCity;
  if (weatherEl) weatherEl.textContent = currentTemp;

  // Случайная картинка (1..7)
  const randomIndex = Math.floor(Math.random() * 7) + 1;
  if (imgEl) {
    imgEl.src = `media/${randomIndex}.jpg`;
  }
}

function getRandomCity() {
  const cities = [
    "Москва",
    "Самара",
    "Новосибирск",
    "Челябинск",
    "Владивосток",
    "Казань",
    "Урюпинск",
    "Воркута",
  ];
  const idx = Math.floor(Math.random() * cities.length);
  return cities[idx];
}

/*************************************
 * Получить "реальную" погоду с сервера
 *************************************/
function fetchServerWeather() {
  const serverInfoEl = document.getElementById("serverWeatherInfo");
  if (serverInfoEl) {
    serverInfoEl.textContent = "Запрашиваем /pogoda/moya-pogoda ...";
  }

  fetch(`${BASE_URL}/pogoda/moya-pogoda`)
    .then(async (res) => {
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      return res.json();
    })
    .then((data) => {
      // Выведем JSON
      if (serverInfoEl) {
        serverInfoEl.textContent = JSON.stringify(data, null, 2);
      }
    })
    .catch((err) => {
      if (serverInfoEl) {
        serverInfoEl.textContent = "Ошибка: " + err.message;
      }
    });
}

/*************************************
 * Модалки
 *************************************/
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "block";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

function closeIfClickedOutside(event, modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  if (event.target === modal) {
    modal.style.display = "none";
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
 * Позиционирование Сайдбара
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

  // Перемешаем ссылки
  const ul = sidebar.querySelector("ul");
  for (let i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[(Math.random() * i) | 0]);
  }
}
