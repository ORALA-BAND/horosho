let currentTrackIndex = 0;

window.onload = () => {
    // 1. Убираем экран загрузки через 3 секунды
    setTimeout(() => {
        const boot = document.getElementById('boot-screen');
        if(boot) boot.style.display = 'none';
        const snd = document.getElementById('startup-sound');
        if(snd) snd.play().catch(() => {});
    }, 3000);

    // 2. Инициализируем плеер
    const audio = document.getElementById('main-audio');
    const tracks = document.querySelectorAll('#actual-playlist .tr-item');

    // Автопереключение на следующий трек
    audio.onended = () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        playTrackByIndex(currentTrackIndex);
    };

    // Вешаем событие клика на каждый из 10 треков
    tracks.forEach((item, index) => {
        item.onclick = () => {
            currentTrackIndex = index;
            playTrackByIndex(index);
        };
    });

    // Запускаем часы
    setInterval(updateTime, 1000);
    updateTime();
};

// Функция воспроизведения
function playTrackByIndex(index) {
    const tracks = document.querySelectorAll('#actual-playlist .tr-item');
    const audio = document.getElementById('main-audio');
    const title = document.getElementById('track-title');
    
    const selected = tracks[index];
    if (!selected) return;

    audio.src = 'assets/' + selected.getAttribute('data-src');
    title.innerText = selected.getAttribute('data-title');
    audio.play();

    // Красивая подсветка активного трека
    tracks.forEach(t => {
        t.style.background = "transparent";
        t.style.color = "#ff00ff";
    });
    selected.style.background = "#ff00ff";
    selected.style.color = "white";
}

// Контент для остальных папок
const folderContent = {
    'my-computer': `
        <div style="color:black; font-size:14px; padding:10px;">
            <p>Система: ORALA XP Music Edition</p>
            <p style="margin:15px 0;"><strong>ПОДДЕРЖКА ПРОЕКТА:</strong></p>
            <p onclick="window.open('ССЫЛКА_РФ')" style="cursor:pointer; color:blue; text-decoration:underline;">> Донат Россия (СБП)</p>
            <p onclick="window.open('ССЫЛКА_ИНТ')" style="cursor:pointer; color:blue; text-decoration:underline; margin-top:10px;">> Support International (PayPal)</p>
        </div>`,
    // Внутри folderContent:
'secret': `
    <div id="lock" style="text-align:center; padding:10px;">
        <p>PASSWORD:</p>
        <input type="password" id="psw" style="width:100px;">
        <button onclick="checkPass()">OK</button>
    </div>
    <div id="sec-files" style="display:none;">
        <div class="photo-grid" id="gallery-root">
            ${Array.from({length: 24}, (_, i) => 
                `<img src="assets/${i+1}.jpg" class="secret-thumb" onclick="openViewer(${i+1})">`
            ).join('')}
        </div>
    </div>`,

// Добавь эти переменные и функции в самый конец script.js:
let currentPhotoIdx = 1;

function openViewer(n) {
    currentPhotoIdx = n;
    document.getElementById('photo-viewer').style.display = 'flex';
    document.getElementById('viewer-img').src = `assets/${n}.jpg`;
}

function closeViewer() {
    document.getElementById('photo-viewer').style.display = 'none';
}

function changePhoto(step) {
    currentPhotoIdx += step;
    if (currentPhotoIdx > 24) currentPhotoIdx = 1;
    if (currentPhotoIdx < 1) currentPhotoIdx = 24;
    document.getElementById('viewer-img').src = `assets/${currentPhotoIdx}.jpg`;
}


// Логика открытия папок
function openFolder(id) {
    const win = document.getElementById('window-template');
    const body = document.getElementById('window-body');
    const player = document.getElementById('player-container');

    if (id === 'player') {
        win.classList.add('player-mode');
        body.style.display = 'none';
        player.style.display = 'block';
    } else {
        win.classList.remove('player-mode');
        player.style.display = 'none';
        body.style.display = 'block';
        body.innerHTML = folderContent[id];
    }

    document.querySelector('.window-title').innerText = id.toUpperCase().replace('-', ' ');
    win.style.display = 'block';
}

function closeWindow() {
    document.getElementById('window-template').style.display = 'none';
}

function updateTime() {
    const now = new Date();
    const clock = document.getElementById('clock');
    if(clock) clock.innerText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
}

function checkPass() {
    if(document.getElementById('psw').value === '1234') {
        document.getElementById('lock').style.display = 'none';
        document.getElementById('sec-files').style.display = 'block';
    } else { 
        alert('ОШИБКА ДОСТУПА'); 
    }
}
