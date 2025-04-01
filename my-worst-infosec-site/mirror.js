function initializeMirrorPage() {
  // Создаём видеоэлемент
  const video = document.createElement("video");
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true; // Для мобильных браузеров

  // Применяем стили, чтобы видео занимало весь фон страницы
  video.style.position = "fixed";
  video.style.top = "0";
  video.style.left = "0";
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "cover";
  video.style.zIndex = "-1"; // Помещаем видео за другим контентом

  // Добавляем видео в body
  document.body.appendChild(video);

  // Проверяем поддержку getUserMedia
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // Привязываем поток к видеоэлементу
        video.srcObject = stream;
      })
      .catch((error) => {
        console.error("Ошибка доступа к камере: ", error);
      });
  } else {
    console.error("Браузер не поддерживает getUserMedia.");
  }
}
