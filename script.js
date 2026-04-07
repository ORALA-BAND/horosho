let currentTrackIndex = 0;

window.onload = () => {
    setTimeout(() => {
        document.getElementById('boot-screen').style.display = 'none';
        const snd = document.getElementById('startup-sound');
        if(snd) snd.play().catch(() => {});
    }, 3000);
    
    // Автопереключение треков
    const audio = document.getElementById('main-audio');
    audio.onended = () => {
        currentTrackIndex++;
        const tracks = document.querySelectorAll('#actual-playlist .tr-item');
        if (currentTrackIndex < tracks.length) {
            playTrackByIndex(currentTrackIndex);
        } else {
            currentTrackIndex = 0; // В начало, если альбом кончился
            playTrackByIndex(0);
        }
    };

    // Навешиваем клики на треки в скрытом плеере
    document.querySelectorAll('#actual-playlist .tr-item').forEach((item, index) => {
        item.onclick = () => {
            currentTrackIndex = index;
            playTrackByIndex(index);
        };
    });

    setInterval(updateTime, 1000);
    updateTime();
};

function playTrackByIndex(index) {
    const tracks = document.querySelectorAll('#actual-playlist .tr-item');
    const selectedTrack = tracks[index];
    const audio = document.getElementById('main-audio');
    const titleDisplay = document.getElementById('track-title');

    audio.src = 'assets/' + selectedTrack.getAttribute('data-src');
    titleDisplay.innerText = selectedTrack.getAttribute('data-title');
    audio.play();

    // Подсветка активного трека
    tracks.forEach(t => t.style.background = "transparent");
    selectedTrack.style.background = "#ff00ff";
    selectedTrack.style.color = "white";
}

const folderContent = {
    'my-computer': `<div style="color:black; padding:15px;"><p onclick="window.open('ССЫЛКА')">> Support (PayPal)</p></div>`,
    'secret': `<div id="lock" style="padding:15px; color:black; text-align:center;"><p>PASSWORD:</p><input type="password" id="psw"><button onclick="checkPass()">OK</button></div><div id="sec-files" style="display:none;"><img src="assets/secret1.jpg" style="width:100%;"></div>`,
    'trash': `<div style="text-align:center; padding:20px; color:#888;">EMPTY</div>`
};

function openFolder(id) {
    const win = document.getElementById('window-template');
    const body = document.getElementById('window-body');
    const storage = document.getElementById('persistent-player-storage');

    if (id === 'player') {
        win.classList.add('player-mode');
        // Перемещаем плеер из хранилища в открытое окно
        body.appendChild(storage.firstElementChild);
    } else {
        win.classList.remove('player-mode');
        // Если плеер был в окне, возвращаем его в хранилище перед открытием другой папки
        const currentPlayer = body.querySelector('.synth-player');
        if (currentPlayer) {
            storage.appendChild(currentPlayer);
        }
        body.innerHTML = folderContent[id];
    }

    document.querySelector('.window-title').innerText = id.toUpperCase();
    win.style.display = 'block';
}

function closeWindow() {
    const win = document.getElementById('window-template');
    const body = document.getElementById('window-body');
    const storage = document.getElementById('persistent-player-storage');
    
    // При закрытии окна всегда прячем плеер обратно в «память»
    const currentPlayer = body.querySelector('.synth-player');
    if (currentPlayer) {
        storage.appendChild(currentPlayer);
    }
    win.style.display = 'none';
}

function updateTime() {
    const now = new Date();
    document.getElementById('clock').innerText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
}

function checkPass() {
    if(document.getElementById('psw').value === '1234') {
        document.getElementById('lock').style.display = 'none';
        document.getElementById('sec-files').style.display = 'block';
    } else { alert('DENIED'); }
}
