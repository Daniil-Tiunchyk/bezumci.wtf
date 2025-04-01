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
      onFinish(); // очередь закончилась
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
 * Проверка пароля
 * (только '*','x','u','й', макс 5 символов)
 *************************************/
function checkPasswordValidity(inputEl) {
  const allowedChars = ["*", "x", "u", "й"];
  for (let i = 0; i < inputEl.value.length; i++) {
    const ch = inputEl.value[i];
    if (!allowedChars.includes(ch)) {
      // Удаляем недопустимый символ
      inputEl.value = inputEl.value.slice(0, -1);
      alert(
        `ОШИБКА!\nСимвол "${ch}" недопустим.\nДопустимые: ${allowedChars.join(
          ", "
        )}.\nМакс. длина: 5.`
      );
      break;
    }
  }
}

/*************************************
 * Авторизация (GET /aus/voiti)
 *************************************/
function attemptLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  // Запустим «очередь» (от 1 до 5 человек)
  const peopleInQueue = Math.floor(Math.random() * 5) + 1;
  startQueueCountdown(peopleInQueue, () => {
    // После очереди — adminTimeOutMs
    setTimeout(() => {
      fetch(
        `${BASE_URL}/aus/voiti?email=${encodeURIComponent(
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
          // Успешный вход
          localStorage.setItem("isLoggedIn", "true");
          setText(
            "loginResultText",
            `Успешно: ${data.message} (userId=${data.userId})`
          );
          openModal("modal-login-result");
        })
        .catch((err) => {
          setText("loginResultText", `Ошибка входа: ${err.message}`);
          openModal("modal-login-result");
        });
    }, adminTimeOutMs);
  });
}

/*************************************
 * Регистрация (GET /aus/zaregistrirovatsya)
 *************************************/
function attemptRegister() {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  const peopleInQueue = Math.floor(Math.random() * 5) + 1;
  startQueueCountdown(peopleInQueue, () => {
    setTimeout(() => {
      fetch(
        `${BASE_URL}/aus/zaregistrirovatsya?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      )
        .then((res) => {
          if (res.status === 200) {
            const randomId = Math.floor(Math.random() * 1000000); // Генерация случайного ID
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userId", randomId);
            setText(
              "registerResultText",
              `Регистрация успешна: ID=${randomId}, Email=${email}`
            );
            openModal("modal-register-result");

            // Через 2 секунды — переход на страницу логина
            setTimeout(() => {
              closeModal("modal-register-result");
              window.location.href = "login.html";
            }, 2000);
          } else {
            return res.text().then((text) => {
              throw new Error(text || "Ошибка регистрации");
            });
          }
        })
        .catch((err) => {
          setText("registerResultText", `Ошибка регистрации: ${err.message}`);
          openModal("modal-register-result");
        });
    }, adminTimeOutMs);
  });
}
