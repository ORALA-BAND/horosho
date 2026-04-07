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
        <div style="color:black; font-size:14px; padding:10px;">
            <p>Система: ORALA XP Music Edition</p>
            <p onclick="window.open('ССЫЛКА_РФ')" style="cursor:pointer; color:blue; text-decoration:underline; margin-top:15px;">> Донат Россия (СБП)</p>
            <p onclick="window.open('ССЫЛКА_ИНТ')" style="cursor:pointer; color:blue; text-decoration:underline; margin-top:10px;">> PayPal (Global)</p>
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
        
    'trash': `<div style="text-align:center; color:#888; padding:30px;">КОРЗИНА ПУСТА</div>`
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
    for (let i = 1; i <= 24; i++) {
        html += `<img src="assets/${i}.jpg" class="secret-thumb" onclick="openViewer(${i})">`;
    }
    document.getElementById('gallery-root').innerHTML = html;
}

function checkPass() {
    if(document.getElementById('psw').value === '1234') {
        document.getElementById('lock').style.display = 'none';
        document.getElementById('sec-files').style.display = 'block';
        renderGallery();
    } else { alert('DENIED'); }
}

// Функции просмотра фото
function openViewer(n) {
    currentPhotoIdx = n;
    document.getElementById('photo-viewer').style.display = 'flex';
    document.getElementById('viewer-img').src = 'assets/' + n + '.jpg';
}

function closeViewer() {
    document.getElementById('photo-viewer').style.display = 'none';
}

function changePhoto(step) {
    currentPhotoIdx += step;
    if (currentPhotoIdx > 24) currentPhotoIdx = 1;
    if (currentPhotoIdx < 1) currentPhotoIdx = 24;
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
