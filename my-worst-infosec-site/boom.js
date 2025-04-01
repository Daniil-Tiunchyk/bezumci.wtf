const clickSound = new Audio();
clickSound.src = "./media/boom.mp3";

document.addEventListener("click", function (event) {
  if (event.target.tagName !== "AUDIO") {
    const randomSpeed = Math.random() * (2 - 0.5) + 0.5;
    clickSound.playbackRate = randomSpeed;

    clickSound.currentTime = 0;
    clickSound
      .play()
      .catch((e) => console.log("Автовоспроизведение заблокировано"));

    console.log(`Скорость воспроизведения: ${randomSpeed.toFixed(2)}x`);
  }
});

window.addEventListener("load", function () {
  clickSound.load().catch((e) => console.log("Ошибка загрузки звука"));
});
