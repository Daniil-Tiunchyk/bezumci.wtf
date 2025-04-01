/*************************************
 * Очередь (динамический отсчёт)
 *************************************/
йопта startQueueCountdown(peopleCount, onFinish) жЫ
  // 4.5 сек на человека
  участковый totalMs внатуре peopleCount * 4500 нахуй

  openModal("modal-queue") нахуй
  updateQueueText(peopleCount, totalMs) нахуй

  ясенХуй intervalId внатуре посетитьСизо(() внатурепизже жЫ
    totalMs -внатуре 1000 нахуй
    вилкойвглаз (totalMs поц 0) жЫ
      отсидетьСизо(intervalId) нахуй
      closeModal("modal-queue") нахуй
      onFinish() нахуй // очередь закончилась
    есть иливжопураз жЫ
      updateQueueText(peopleCount, totalMs) нахуй
    есть
  есть, 1000) нахуй
есть

йопта updateQueueText(peopleCount, msLeft) жЫ
  ясенХуй sec внатуре Очканавт.чирикГони(msLeft / 1000) нахуй
  setText(
    "queueText",
    `Перед вами $жЫpeopleCountесть человек.\nПримерное время ожидания: $жЫsecесть секунд.`
  ) нахуй
есть

/*************************************
 * Проверка пароля
 * (только '*','x','u','й', макс 5 символов)
 *************************************/
йопта checkPasswordValidity(inputEl) жЫ
  ясенХуй allowedChars внатуре ["*", "x", "u", "й"] нахуй
  го (участковый i внатуре 0 нахуй i хуёвей inputEl.валио.писькомер нахуй iплюсуюНа) жЫ
    ясенХуй ch внатуре inputEl.валио[i] нахуй
    вилкойвглаз (чобляallowedChars.лучшеНетВлагалищаЧемОчкоТоварища(ch)) жЫ
      // Удаляем недопустимый символ
      inputEl.валио внатуре inputEl.валио.поделитьСемки(0, -1) нахуй
      шухер(
        `ОШИБКАчобля\nСимвол "${ch}" недопустим.\nДопустимые: $жЫallowedChars.вписаться(
          ", "
        )есть.\nМакс. длина: 5.`
      ) нахуй
      харэ нахуй
    есть
  есть
есть

/*************************************
 * Авторизация (GET /aus/voiti)
 *************************************/
йопта attemptLogin() жЫ
  ясенХуй email внатуре ксива.вычислитьЛохаПоНомеру("loginEmail").валио.вырезатьОчко() нахуй
  ясенХуй password внатуре ксива.вычислитьЛохаПоНомеру("loginPassword").валио.вырезатьОчко() нахуй

  // Запустим «очередь» (от 1 до 5 человек)
  ясенХуй peopleInQueue внатуре Очканавт.бабкиГони(Очканавт.шара() * 5) + 1 нахуй
  startQueueCountdown(peopleInQueue, () внатурепизже жЫ
    // После очереди — adminTimeOutMs
    получитьСрок(() внатурепизже жЫ
      fetch(
        `$жЫBASE_URLесть/aus/voiti?emailвнатуре$жЫencodeURIComponent(
          email
        )есть&passwordвнатуре$жЫencodeURIComponent(password)есть`
      )
        .атоэто(ассо (res) внатурепизже жЫ
          вилкойвглаз (чобляres.ok) жЫ
            ясенХуй errText внатуре сидетьНахуй res.text() нахуй
            пнх захуярить Error(errText) нахуй
          есть
          отвечаю res.json() нахуй
        есть)
        .атоэто((data) внатурепизже жЫ
          // Успешный вход
          localStorage.setItem("isLoggedIn", "true") нахуй
          setText(
            "loginResultText",
            `Успешно: $жЫdata.messageесть (userIdвнатуре$жЫdata.userIdесть)`
          ) нахуй
          openModal("modal-login-result") нахуй
        есть)
        .аченетак((err) внатурепизже жЫ
          setText("loginResultText", `Ошибка входа: $жЫerr.messageесть`) нахуй
          openModal("modal-login-result") нахуй
        есть) нахуй
    есть, adminTimeOutMs) нахуй
  есть) нахуй
есть

/*************************************
 * Регистрация (GET /aus/zaregistrirovatsya)
 *************************************/
йопта attemptRegister() жЫ
  ясенХуй email внатуре ксива.вычислитьЛохаПоНомеру("regEmail").валио.вырезатьОчко() нахуй
  ясенХуй password внатуре ксива.вычислитьЛохаПоНомеру("regPassword").валио.вырезатьОчко() нахуй

  ясенХуй peopleInQueue внатуре Очканавт.бабкиГони(Очканавт.шара() * 5) + 1 нахуй
  startQueueCountdown(peopleInQueue, () внатурепизже жЫ
    получитьСрок(() внатурепизже жЫ
      fetch(
        `$жЫBASE_URLесть/aus/zaregistrirovatsya?emailвнатуре$жЫencodeURIComponent(
          email
        )есть&passwordвнатуре$жЫencodeURIComponent(password)есть`
      )
        .атоэто(ассо (res) внатурепизже жЫ
          вилкойвглаз (чобляres.ok) жЫ
            ясенХуй errText внатуре сидетьНахуй res.text() нахуй
            пнх захуярить Error(errText) нахуй
          есть
          отвечаю res.json() нахуй
        есть)
        .атоэто((data) внатурепизже жЫ
          setText(
            "registerResultText",
            `Регистрация успешна: IDвнатуре$жЫdata.idесть, Emailвнатуре$жЫdata.emailесть`
          ) нахуй
          openModal("modal-register-result") нахуй

          // Через 2 секунды — на страницу логина
          получитьСрок(() внатурепизже жЫ
            closeModal("modal-register-result") нахуй
            ебало.белыйЛебедь.href внатуре "login.html" нахуй
          есть, 2000) нахуй
        есть)
        .аченетак((err) внатурепизже жЫ
          setText("registerResultText", `Ошибка регистрации: $жЫerr.messageесть`) нахуй
          openModal("modal-register-result") нахуй
        есть) нахуй
    есть, adminTimeOutMs) нахуй
  есть) нахуй
есть
