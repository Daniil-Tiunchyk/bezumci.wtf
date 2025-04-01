/*************************************
 * Weather Page
 *************************************/

/**
 * Точка входа: вызывается при загрузке weather.html (onload="initializeWeatherPage()")
 */
function initializeWeatherPage() {
  positionSidebarRandomly();
  startSnow();

  // Проверим, залогинен ли пользователь (упрощённо через localStorage)
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    openModal("modal-auth-required");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } else {
    setupWeatherUI();
    showUserTable(); // Псевдо-CRUD пользователей
  }
}

/*************************************
 * Работа с пользователями (User CRUD)
 *************************************/

/**
 * Получает список пользователей с сервера и отображает их в элементе usersTable
 */
function showUserTable() {
  fetch(`${BASE_URL}/polzovateli/vse-dannie`)
    .then(async (res) => {
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }
      return res.json();
    })
    .then((data) => {
      // Предполагаем, что сервер возвращает объект с массивом пользователей под ключом 'users'
      const users = data.users || data;
      const usersEl = document.getElementById("usersTable");
      if (usersEl) {
        usersEl.textContent = users
          .map((u) => `#${u.id} | ${u.email} [${u.role || "user"}]`)
          .join("\n");
      }
    })
    .catch((err) => {
      const usersEl = document.getElementById("usersTable");
      if (usersEl) {
        usersEl.textContent = "Ошибка получения пользователей: " + err.message;
      }
    });
}

/**
 * Выгружает базу пользователей с сервера и предлагает скачать ее в виде txt-файла
 */
function downloadUsersDb() {
  fetch(`${BASE_URL}/polzovateli/vse-dannie`)
    .then(async (res) => {
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }
      return res.json();
    })
    .then((data) => {
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "users_db.txt";
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch((err) => {
      alert("Ошибка выгрузки базы: " + err.message);
    });
}

/*************************************
 * "Клиентская" погода (игровая логика)
 *************************************/
let currentCity = "";
let currentTemp = "21°C";

function setupWeatherUI() {
  currentCity = getRandomCity();
  currentTemp = "21°C";
  updateWeatherUI();

  // Обработка кнопки "Сохранить" в модалке "Введите правильную погоду"
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
  // Показываем модалку: "Это ваш город?"
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
  // Спрашиваем, верная ли температура
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
      updateWeatherUI();
    };
  }
  if (noBtn) {
    noBtn.onclick = () => {
      closeModal("modal-check-weather");
      // Показываем модалку для ручного ввода
      openModal("modal-enter-weather");
    };
  }
}

function updateWeatherUI() {
  const cityEl = document.getElementById("currentCity");
  const weatherEl = document.getElementById("currentWeather");
  const imgEl = document.getElementById("weatherImage");

  if (cityEl) {
    cityEl.textContent = currentCity;
  }
  if (weatherEl) {
    weatherEl.textContent = currentTemp;
  }

  // Случайная картинка (media/1.jpg..7.jpg)
  const randomIndex = Math.floor(Math.random() * 7) + 1;
  if (imgEl) {
    imgEl.src = `media/${randomIndex}.jpg`;
  }
}

/*************************************
 * Запрос "реальной" погоды с сервера
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
