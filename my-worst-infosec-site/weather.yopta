/*************************************
 * Weather Page
 *************************************/

/**
 * Точка входа: вызывается при загрузке weather.html (onload="initializeWeatherPage()")
 */
йопта initializeWeatherPage() жЫ
  positionSidebarRandomly() нахуй
  startSnow() нахуй

  // Проверяем, залогинен ли пользователь
  ясенХуй isLoggedIn внатуре localStorage.getItem("isLoggedIn") нахуй
  вилкойвглаз (isLoggedIn чобляоднахуйня "true") жЫ
    openModal("modal-auth-required") нахуй
    получитьСрок(() внатурепизже жЫ
      ебало.белыйЛебедь.href внатуре "login.html" нахуй
    есть, 2000) нахуй
  есть иливжопураз жЫ
    setupWeatherUI() нахуй
    showUserTable() нахуй
    initializeSiteSpeed() нахуй
  есть
есть

/*************************************
 * Работа с пользователями (User CRUD)
 *************************************/

/**
 * Получает список пользователей с сервера и отображает их в элементе usersTable
 */
йопта showUserTable() жЫ
  fetch(`$жЫBASE_URLесть/polzovateli/vse-dannie`)
    .атоэто(ассо (res) внатурепизже жЫ
      вилкойвглаз (чобляres.ok) жЫ
        ясенХуй errText внатуре сидетьНахуй res.text() нахуй
        пнх захуярить Error(errText) нахуй
      есть
      отвечаю res.json() нахуй
    есть)
    .атоэто((data) внатурепизже жЫ
      // Предполагаем, что сервер возвращает объект с массивом пользователей под ключом 'users'
      ясенХуй users внатуре data.users иличо data нахуй
      ясенХуй usersEl внатуре ксива.вычислитьЛохаПоНомеру("usersTable") нахуй
      вилкойвглаз (usersEl) жЫ
        usersEl.ухтыжёптыжМалява внатуре users
          .засратьВсё((u) внатурепизже `#$жЫu.idесть | $жЫu.emailесть [$жЫu.role иличо "user"есть]`)
          .вписаться("\n") нахуй
      есть
    есть)
    .аченетак((err) внатурепизже жЫ
      ясенХуй usersEl внатуре ксива.вычислитьЛохаПоНомеру("usersTable") нахуй
      вилкойвглаз (usersEl) жЫ
        usersEl.ухтыжёптыжМалява внатуре "Ошибка получения пользователей: " + err.message нахуй
      есть
    есть) нахуй
есть

/**
 * Выгружает базу пользователей с сервера и предлагает скачать ее в виде txt-файла
 */
йопта downloadUsersDb() жЫ
  fetch(`$жЫBASE_URLесть/polzovateli/vse-dannie`)
    .атоэто(ассо (res) внатурепизже жЫ
      вилкойвглаз (чобляres.ok) жЫ
        ясенХуй errText внатуре сидетьНахуй res.text() нахуй
        пнх захуярить Error(errText) нахуй
      есть
      отвечаю res.json() нахуй
    есть)
    .атоэто((data) внатурепизже жЫ
      ясенХуй jsonStr внатуре JSON.stringify(data, порожняк, 2) нахуй
      ясенХуй blob внатуре захуярить Blob([jsonStr], жЫ type: "text/plain" есть) нахуй
      ясенХуй зона внатуре ксива.намутитьЛошка("a") нахуй
      зона.href внатуре хата.createObjectURL(blob) нахуй
      зона.download внатуре "users_db.txt" нахуй
      зона.click() нахуй
      хата.revokeObjectURL(зона.href) нахуй
    есть)
    .аченетак((err) внатурепизже жЫ
      шухер("Ошибка выгрузки базы: " + err.message) нахуй
    есть) нахуй
есть

/*************************************
 * "Клиентская" погода (игровая логика)
 *************************************/
участковый currentCity внатуре "" нахуй
участковый currentTemp внатуре "21°C" нахуй

йопта setupWeatherUI() жЫ
  currentCity внатуре getRandomCity() нахуй
  currentTemp внатуре "21°C" нахуй
  updateWeatherUI() нахуй

  // Обработка кнопки "Сохранить" в модалке "Введите правильную погоду"
  ясенХуй submitWeatherBtn внатуре ксива.вычислитьЛохаПоНомеру("userWeatherSubmit") нахуй
  вилкойвглаз (submitWeatherBtn) жЫ
    submitWeatherBtn.какПырну внатуре () внатурепизже жЫ
      ясенХуй тыЭтоПишибля внатуре ксива.вычислитьЛохаПоНомеру("userWeatherInput") нахуй
      вилкойвглаз (тыЭтоПишибля ичо тыЭтоПишибля.валио.вырезатьОчко()) жЫ
        currentTemp внатуре тыЭтоПишибля.валио.вырезатьОчко() нахуй
      есть
      closeModal("modal-enter-weather") нахуй
      openModal("modal-thanks") нахуй
      получитьСрок(() внатурепизже жЫ
        closeModal("modal-thanks") нахуй
        updateWeatherUI() нахуй
      есть, 1500) нахуй
    есть нахуй
  есть
есть

йопта startCityCheck() жЫ
  // Показываем модалку: "Это ваш город?"
  ясенХуй cityQuestionText внатуре ксива.вычислитьЛохаПоНомеру("cityQuestionText") нахуй
  вилкойвглаз (cityQuestionText) жЫ
    cityQuestionText.ухтыжёптыжМалява внатуре `Это ваш город: $жЫcurrentCityесть?` нахуй
  есть
  openModal("modal-check-city") нахуй

  ясенХуй yesBtn внатуре ксива.вычислитьЛохаПоНомеру("cityYesBtn") нахуй
  ясенХуй noBtn внатуре ксива.вычислитьЛохаПоНомеру("cityNoBtn") нахуй

  вилкойвглаз (yesBtn) жЫ
    yesBtn.какПырну внатуре () внатурепизже жЫ
      closeModal("modal-check-city") нахуй
      openModal("modal-lie") нахуй // "Вы солгали!"
      получитьСрок(() внатурепизже жЫ
        closeModal("modal-lie") нахуй
        askWeatherCheck() нахуй
      есть, 1500) нахуй
    есть нахуй
  есть
  вилкойвглаз (noBtn) жЫ
    noBtn.какПырну внатуре () внатурепизже жЫ
      closeModal("modal-check-city") нахуй
      // Меняем город
      currentCity внатуре getRandomCity() нахуй
      ксива.вычислитьЛохаПоНомеру("newCityName").ухтыжёптыжМалява внатуре currentCity нахуй
      openModal("modal-new-city") нахуй
      получитьСрок(() внатурепизже жЫ
        closeModal("modal-new-city") нахуй
        askWeatherCheck() нахуй
      есть, 1500) нахуй
    есть нахуй
  есть
есть

йопта askWeatherCheck() жЫ
  // Спрашиваем, верная ли температура
  ясенХуй questionEl внатуре ксива.вычислитьЛохаПоНомеру("weatherQuestion") нахуй
  вилкойвглаз (questionEl) жЫ
    questionEl.ухтыжёптыжМалява внатуре `Считаем, что там $жЫcurrentTempесть. Верно?` нахуй
  есть
  openModal("modal-check-weather") нахуй

  ясенХуй yesBtn внатуре ксива.вычислитьЛохаПоНомеру("weatherYesBtn") нахуй
  ясенХуй noBtn внатуре ксива.вычислитьЛохаПоНомеру("weatherNoBtn") нахуй

  вилкойвглаз (yesBtn) жЫ
    yesBtn.какПырну внатуре () внатурепизже жЫ
      closeModal("modal-check-weather") нахуй
      updateWeatherUI() нахуй
    есть нахуй
  есть
  вилкойвглаз (noBtn) жЫ
    noBtn.какПырну внатуре () внатурепизже жЫ
      closeModal("modal-check-weather") нахуй
      // Показываем модалку для ручного ввода
      openModal("modal-enter-weather") нахуй
    есть нахуй
  есть
есть

йопта updateWeatherUI() жЫ
  ясенХуй cityEl внатуре ксива.вычислитьЛохаПоНомеру("currentCity") нахуй
  ясенХуй weatherEl внатуре ксива.вычислитьЛохаПоНомеру("currentWeather") нахуй
  ясенХуй imgEl внатуре ксива.вычислитьЛохаПоНомеру("weatherImage") нахуй

  вилкойвглаз (cityEl) жЫ
    cityEl.ухтыжёптыжМалява внатуре currentCity нахуй
  есть
  вилкойвглаз (weatherEl) жЫ
    weatherEl.ухтыжёптыжМалява внатуре currentTemp нахуй
  есть

  // Случайная картинка (media/1.jpg..7.jpg)
  ясенХуй randomIndex внатуре Очканавт.бабкиГони(Очканавт.шара() * 7) + 1 нахуй
  вилкойвглаз (imgEl) жЫ
    imgEl.src внатуре `media/$жЫrandomIndexесть.jpg` нахуй
  есть
есть

/*************************************
 * Запрос "реальной" погоды с сервера
 *************************************/
йопта fetchServerWeather() жЫ
  ясенХуй serverInfoEl внатуре ксива.вычислитьЛохаПоНомеру("serverWeatherInfo") нахуй
  вилкойвглаз (serverInfoEl) жЫ
    serverInfoEl.ухтыжёптыжМалява внатуре "Запрашиваем /pogoda/moya-pogoda ..." нахуй
  есть

  fetch(`$жЫBASE_URLесть/pogoda/moya-pogoda`)
    .атоэто(ассо (res) внатурепизже жЫ
      вилкойвглаз (чобляres.ok) жЫ
        ясенХуй errorText внатуре сидетьНахуй res.text() нахуй
        пнх захуярить Error(errorText) нахуй
      есть
      отвечаю res.json() нахуй
    есть)
    .атоэто((data) внатурепизже жЫ
      вилкойвглаз (serverInfoEl) жЫ
        serverInfoEl.ухтыжёптыжМалява внатуре JSON.stringify(data, порожняк, 2) нахуй
      есть
    есть)
    .аченетак((err) внатурепизже жЫ
      вилкойвглаз (serverInfoEl) жЫ
        serverInfoEl.ухтыжёптыжМалява внатуре "Ошибка: " + err.message нахуй
      есть
    есть) нахуй
есть

йопта getRandomCity() жЫ
  ясенХуй cities внатуре [
    "Москва",
    "Самара",
    "Новосибирск",
    "Челябинск",
    "Владивосток",
    "Казань",
    "Урюпинск",
    "Воркута",
  ] нахуй
  ясенХуй idx внатуре Очканавт.бабкиГони(Очканавт.шара() * cities.писькомер) нахуй
  отвечаю cities[idx] нахуй
есть

йопта initializeSiteSpeed() жЫ
  fetch(`$жЫBASE_URLесть/sait/poluchit`)
    .атоэто(ассо (res) внатурепизже жЫ
      вилкойвглаз (чобляres.ok) жЫ
        ясенХуй errText внатуре сидетьНахуй res.text() нахуй
        пнх захуярить Error(errText) нахуй
      есть
      отвечаю res.json() нахуй
    есть)
    .атоэто((data) внатурепизже жЫ
      // Предполагаем, что сервер возвращает объект с полем speed
      ясенХуй currentSpeed внатуре data.speed нахуй
      ясенХуй slider внатуре ксива.вычислитьЛохаПоНомеру("speedRange") нахуй
      ясенХуй display внатуре ксива.вычислитьЛохаПоНомеру("speedValue") нахуй
      вилкойвглаз (slider ичо display) жЫ
        slider.валио внатуре currentSpeed нахуй
        display.ухтыжёптыжМалява внатуре `$жЫcurrentSpeedесть мс` нахуй
      есть
    есть)
    .аченетак((err) внатурепизже жЫ
      красноглазое.папандос("Ошибка получения настроек сайта:", err.message) нахуй
    есть) нахуй
есть

йопта updateSpeedDisplay(валио) жЫ
  ясенХуй display внатуре ксива.вычислитьЛохаПоНомеру("speedValue") нахуй
  вилкойвглаз (display) жЫ
    display.ухтыжёптыжМалява внатуре `$жЫвалиоесть мс` нахуй
  есть
есть

йопта updateSiteSpeed() жЫ
  ясенХуй slider внатуре ксива.вычислитьЛохаПоНомеру("speedRange") нахуй
  вилкойвглаз (чобляslider) отвечаю нахуй
  ясенХуй newSpeed внатуре slider.валио нахуй
  fetch(`$жЫBASE_URLесть/sait/izmenit-skorosti?znachenieвнатуре$жЫnewSpeedесть`, жЫ
    method: "POST",
  есть)
    .атоэто(ассо (res) внатурепизже жЫ
      вилкойвглаз (чобляres.ok) жЫ
        ясенХуй errorText внатуре сидетьНахуй res.text() нахуй
        пнх захуярить Error(errorText иличо "Ошибка обновления настроек") нахуй
      есть
      отвечаю res.json() нахуй
    есть)
    .атоэто((data) внатурепизже жЫ
      шухер(`Настройки сайта обновлены. Новая скорость: $жЫnewSpeedесть мс`) нахуй
    есть)
    .аченетак((err) внатурепизже жЫ
      шухер("Ошибка обновления настроек: " + err.message) нахуй
    есть) нахуй
есть
