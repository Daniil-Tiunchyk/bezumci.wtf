/*************************************
 * Лэндинг (главная страница)
 *************************************/
function initializeLandingPage() {
  positionSidebarRandomly();
  startSnow(); // По умолчанию включаем «снег»
  openModal("modal-ozonAd"); // Показываем рекламу сразу

  // «Убегающий» крестик закрытия
  const closeAdBtn = document.getElementById("closeAdBtn");
  if (closeAdBtn) {
    closeAdBtn.addEventListener("mouseover", moveCloseAdBtnRandom);
  }
}

/**
 * Двигает крестик в случайное место внутри рекламного блока
 */
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
