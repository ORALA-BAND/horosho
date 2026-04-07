// 1. Убираем экран загрузки через 3 секунды
window.onload = () => {
    setTimeout(() => {
        document.getElementById('boot-screen').style.display = 'none';
        document.getElementById('startup-sound').play(); // Нужен файл assets/startup.mp3
    }, 3000);
    
    updateTime();
    setInterval(updateTime, 1000);
};

// 2. Живые часы
function updateTime() {
    const now = new Date();
    const timeStr = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').innerText = timeStr;
}

// 3. Открытие папок
const folderContent = {
    'my-computer': '<h3>Донаты</h3><p><a href="#">Россия (СБП)</a></p><p><a href="#">International (PayPal)</a></p>',
    'player': `
    <div class="xp-player-container" style="display: flex; flex-direction: column; gap: 10px;">
        <!-- Обложка и инфо -->
        <div style="display: flex; gap: 15px; align-items: center; background: #fff; padding: 10px; border: 1px inset #808080;">
            <img src="assets/album-cover.jpg" id="current-cover" style="width: 80px; height: 80px; border: 1px solid #000; object-fit: cover;">
            <div>
                <strong id="track-title" style="font-size: 14px;">Выберите трек</strong>
                <p style="font-size: 11px; margin: 5px 0;">Альбом: Название Альбома</p>
                <audio id="main-audio" controls style="height: 30px; width: 180px;"></audio>
            </div>
        </div>

        <!-- Список треков -->
        <div class="playlist" style="background: #fff; border: 1px inset #808080; height: 120px; overflow-y: auto; font-size: 12px;">
            <div class="track-item" onclick="playTrack('track1.mp3', '01. Интро')" style="padding: 5px; cursor: pointer; border-bottom: 1px solid #eee;">01. Интро</div>
            <div class="track-item" onclick="playTrack('track2.mp3', '02. Название трека 2')" style="padding: 5px; cursor: pointer; border-bottom: 1px solid #eee;">02. Название трека 2</div>
            <div class="track-item" onclick="playTrack('track3.mp3', '03. Название трека 3')" style="padding: 5px; cursor: pointer; border-bottom: 1px solid #eee;">03. Название трека 3</div>
        </div>

        <a href="ТВОЯ_ССЫЛКА_ГУГЛ_ДРАЙВ" target="_blank" style="text-align: center; color: blue; font-size: 11px;">Скачать альбом на Google Drive</a>
    </div>`

    'secret': '<p>Введите пароль:</p><input type="password" id="pass"><button onclick="checkPass()">OK</button>',
    'trash': '<h3>Мерч (Корзина)</h3><p>Фото твоих футболок тут.</p>'
};

function openFolder(id) {
    const win = document.getElementById('window-template');
    const body = document.getElementById('window-body');
    const title = document.querySelector('.window-title');
    
    body.innerHTML = folderContent[id];
    title.innerText = id.replace('-', ' ').toUpperCase();
    win.style.display = 'block';
}

function closeWindow() {
    document.getElementById('window-template').style.display = 'none';
}

function checkPass() {
    const val = document.getElementById('pass').value;
    if(val === '1234') { // Твой пароль
        document.getElementById('window-body').innerHTML = '<h4>Секретные фото:</h4><img src="assets/secret.jpg" width="100%">';
    } else {
        alert('Неверный пароль!');
    }
}

function setWallpaper(imgUrl) {
    const desktop = document.querySelector('.desktop');
    desktop.style.backgroundImage = `url(${imgUrl})`;
    // Добавляем уведомление как в Windows
    alert("Обои рабочего стола успешно изменены!");
}

