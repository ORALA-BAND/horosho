let currentTrackIndex = 0;
let currentPhotoIdx = 1;

window.onload = () => {
    // 1. Убираем экран загрузки
    setTimeout(() => {
        const boot = document.getElementById('boot-screen');
        if(boot) boot.style.display = 'none';
        const snd = document.getElementById('startup-sound');
        if(snd) snd.play().catch(() => {});
    }, 3000);

    // 2. Плеер
    const audio = document.getElementById('main-audio');
    const tracks = document.querySelectorAll('#actual-playlist .tr-item');

    audio.onended = () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        playTrackByIndex(currentTrackIndex);
    };

    tracks.forEach((item, index) => {
        item.onclick = () => {
            currentTrackIndex = index;
            playTrackByIndex(index);
        };
    });

    setInterval(updateTime, 1000);
    updateTime();
};

// Контент папок
const folderContent = {
        'my-computer': `
        <div style="color:black; font-size:13px; padding:10px;">
        <p><strong>System: ORALA XP HOROSHO</p>
            <p><strong>Поддержи/Support:</strong></p>
            
            <!-- Блок PayPal -->
            <div style="margin-top:15px; background:#fff; border:1px inset #808080; padding:10px; text-align:center;">
                <img src="assets/paypal-qr.jpg" width="32" style="vertical-align:middle;">
                <span style="font-weight:bold; margin-left:10px;">PayPal (International)</span>
                <br><br>
                <!-- Твой QR-код -->
                <img src="assets/paypal-qr.jpg" style="width:150px; height:150px; border:1px solid #ccc; display:block; margin: 0 auto;">
                <br>
            </div>

            <!-- Блок СБП (Россия) -->
            <div style="margin-top:15px; background:#fff; border:1px inset #808080; padding:10px; text-align:center;">
                <img src="" width="32" style="vertical-align:middle;">
                <span style="font-weight:bold; margin-left:10px;">Донат (Россия / СБП)</span>
                <br><br>
                <button onclick="window.open('https://messenger.online.sberbank.ru/sl/kTP9APlvDeHVsot93')" style="cursor:pointer; padding:8px 15px; font-weight:bold; border:2px solid #388038;">
                    ПОДДЕРЖАТЬ ЧЕРЕЗ СБОР ДЕНЕГ В СБЕР
                </button>
            </div>
        </div>`,

    
    'secret': `
        <div id="lock" style="text-align:center; color:black; padding:10px;">
            <p>PASSWORD:</p>
            <input type="password" id="psw" style="width:100px; margin-bottom:10px;">
            <br><button onclick="checkPass()">ВВОД</button>
        </div>
        <div id="sec-files" style="display:none; height: 250px; overflow-y: auto;">
            <div class="photo-grid" id="gallery-root"></div>
        </div>`,
        
            'trash': `
        <div style="color:black; padding:15px; font-family: 'Tahoma', sans-serif;">
            <!-- Блок про мерч -->
            <div style="text-align: center; margin-bottom: 25px;">
                <img src="assets/trash.png" width="48" style="margin-bottom: 10px;">
                <p style="margin: 0; font-weight: bold;">В корзине пока пусто...</p>
                <p style="margin: 5px 0 0 0; font-size: 11px; color: #666;">мерч появится здесь, если хотите</p>
            </div>

            <!-- Соцсети -->
            <div style="display: flex; justify-content: center; gap: 30px;">
                <!-- VK -->
                <div onclick="window.open('https://vk.com/orala_band')" style="cursor:pointer; text-align:center;">
                    <p style="font-size: 11px; color: blue; text-decoration: underline; margin-top: 5px;">VK</p>
                </div>

                <!-- YouTube -->
                <div onclick="window.open('ТВОЯ_ССЫЛКА_YOUTUBE')" style="cursor:pointer; text-align:center;">
                    <p style="font-size: 11px; color: blue; text-decoration: underline; margin-top: 5px;">YouTube</p>
                </div>
            </div>
        </div>`,


};

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
        
        // Если открыли секретную папку после ввода пароля — рисуем сетку
        if (id === 'secret' && document.getElementById('sec-files').style.display === 'block') {
            renderGallery();
        }
    }
    document.querySelector('.window-title').innerText = id.toUpperCase();
    win.style.display = 'block';
}

// Генерация 24 фото
function renderGallery() {
    let html = '';
    for (let i = 1; i <= 35; i++) {
        html += `<img src="assets/${i}.jpg" class="secret-thumb" onclick="openViewer(${i})">`;
    }
    document.getElementById('gallery-root').innerHTML = html;
}

// Находим кнопку Пуск и вешаем событие
document.querySelector('.start-button').onclick = () => {
    document.getElementById('bsod').style.display = 'block';
};

// Скрытие BSOD при клике
document.getElementById('bsod').onclick = () => {
    document.getElementById('bsod').style.display = 'none';
};

// ОБНОВИ ПАРОЛЬ в функции checkPass
function checkPass() {
    if(document.getElementById('psw').value === '123456') { // Новый пароль из BSOD
        document.getElementById('lock').style.display = 'none';
        document.getElementById('sec-files').style.display = 'block';
        renderGallery();
    } else { 
        alert('ACCESS DENIED. CHECK THE BSOD HINT.'); 
    }
}

// Функции просмотра фото
function openViewer(n) {
    currentPhotoIdx = n;
    document.getElementById('photo-viewer').style.display = 'flex';
    document.getElementById('viewer-img').src = 'assets/' + n + '.jpg';
}

function closeViewer() {
    console.log("Закрываем просмотрщик"); // Для теста в консоли
    const viewer = document.getElementById('photo-viewer');
    if (viewer) {
        viewer.style.display = 'none';
    }
}


function changePhoto(step) {
    currentPhotoIdx += step;
    if (currentPhotoIdx > 35) currentPhotoIdx = 1;
    if (currentPhotoIdx < 1) currentPhotoIdx = 35;
    document.getElementById('viewer-img').src = 'assets/' + currentPhotoIdx + '.jpg';
}

// Плеер и Время
function playTrackByIndex(index) {
    const tracks = document.querySelectorAll('#actual-playlist .tr-item');
    const audio = document.getElementById('main-audio');
    const title = document.getElementById('track-title');
    audio.src = 'assets/' + tracks[index].getAttribute('data-src');
    title.innerText = tracks[index].getAttribute('data-title');
    audio.play();
    tracks.forEach(t => { t.style.background = "transparent"; t.style.color = "#ff00ff"; });
    tracks[index].style.background = "#ff00ff";
    tracks[index].style.color = "white";
}

function closeWindow() { document.getElementById('window-template').style.display = 'none'; }
function updateTime() {
    const now = new Date();
    document.getElementById('clock').innerText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
}

function setAsWallpaper() {
    const currentImgUrl = document.getElementById('viewer-img').src;
    const desktop = document.querySelector('.desktop');
    
    // Меняем фон рабочего стола
    desktop.style.backgroundImage = `url('${currentImgUrl}')`;
    desktop.style.backgroundSize = 'cover';
    desktop.style.backgroundPosition = 'center';
    
    // Показываем классическое уведомление Windows
    alert("Обои рабочего стола изменены!");
    
    // Закрываем просмотрщик, чтобы увидеть результат
    closeViewer();
}

// 1. Открытие BSOD при нажатии на Пуск
document.querySelector('.start-button').onclick = () => {
    document.getElementById('bsod').style.display = 'block';
};

// 2. Функция закрытия
function closeBsod() {
    document.getElementById('bsod').style.display = 'none';
}

// 3. Закрытие любой клавишей (Return to reality)
window.addEventListener('keydown', () => {
    const bsod = document.getElementById('bsod');
    if (bsod && bsod.style.display === 'block') {
        closeBsod();
    }
});

