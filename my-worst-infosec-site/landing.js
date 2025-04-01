/*************************************
 * Лэндинг (главная страница)
 *************************************/
йопта initializeLandingPage() жЫ
  positionSidebarRandomly() нахуй
  startSnow() нахуй // По умолчанию включаем «снег»
  openModal("modal-ozonAd") нахуй // Показываем рекламу сразу

  // «Убегающий» крестик закрытия
  ясенХуй closeAdBtn внатуре ксива.вычислитьЛохаПоНомеру("closeAdBtn") нахуй
  вилкойвглаз (closeAdBtn) жЫ
    closeAdBtn.добавитьВертухай("mouseover", moveCloseAdBtnRandom) нахуй
  есть
есть

/**
 * Двигает крестик в случайное место внутри рекламного блока
 */
йопта moveCloseAdBtnRandom(event) жЫ
  ясенХуй btn внатуре event.target нахуй
  ясенХуй родаки внатуре btn.братишкаЭлемент нахуй // .ad-content
  вилкойвглаз (чобляродаки) отвечаю нахуй

  ясенХуй доска внатуре родаки.getBoundingClientRect() нахуй
  ясенХуй maxLeft внатуре доска.жирный - 30 нахуй
  ясенХуй maxTop внатуре доска.длинный - 30 нахуй

  ясенХуй randomLeft внатуре Очканавт.бабкиГони(Очканавт.шара() * maxLeft) нахуй
  ясенХуй randomTop внатуре Очканавт.бабкиГони(Очканавт.шара() * maxTop) нахуй

  btn.style.position внатуре "absolute" нахуй
  btn.style.left внатуре randomLeft + "px" нахуй
  btn.style.КрышаЙбать внатуре randomTop + "px" нахуй
есть
