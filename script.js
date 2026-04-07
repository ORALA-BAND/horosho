window.onload = () => {
    setTimeout(() => {
        document.getElementById('boot-screen').style.display = 'none';
        document.getElementById('startup-sound').play().catch(() => {});
    }, 3000);
    setInterval(updateTime, 1000);
    updateTime();
};

function updateTime() {
    const now = new Date();
    document.getElementById('clock').innerText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
}

const folderContent = {
    'my-computer': `
        <div style="padding:20px; color:white;">
            <p onclick="window.open('ССЫЛКА_РФ')" style="cursor:pointer; color:#ff00ff;">> Поддержать (РФ)</p>
            <p onclick="window.open('ССЫЛКА_ИНТ')" style="cursor:pointer; color:#ff00ff;">> Support (PayPal)</p>
        </div>`,
    
    'player': `
        <div class="synth-player">
            <img src="assets/album-cover.jpg" class="main-cover">
            <div id="track-title" class="neon-text">ВЫБЕРИТЕ ТРЕК</div>
            <audio id="main-audio" controls></audio>
            <div class="playlist-container">
                <div class="tr-item" onclick="playTrack('track1.mp3', '01. Intro')">01. Intro</div>
                <div class="tr-item" onclick="playTrack('track2.mp3', '02. Midnight')">02. Midnight</div>
                <div class="tr-item" onclick="playTrack('track3.mp3', '03. Neon')">03. Neon</div>
            </div>
            <p onclick="window.open('ССЫЛКА_ДИСК')" style="font-size:10px; margin-top:10px; cursor:pointer;">СКАЧАТЬ АЛЬБОМ</p>
        </div>`,

    'secret': `
        <div id="lock" style="padding:20px; text-align:center; color:white;">
            <p>PASSWORD:</p>
            <input type="password" id="psw" style="background:none; border:1px solid #ff00ff; color:white;">
            <button onclick="checkPass()" style="background:#ff00ff; border:none; cursor:pointer;">OK</button>
        </div>
        <div id="sec-files" style="display:none; padding:10px; text-align:center;">
            <img src="assets/secret1.jpg" style="width:100%; border:1px solid #ff00ff;">
        </div>`,

    'trash': `<div style="padding:20px; color:#555;">FOLDER IS EMPTY</div>`
};

function openFolder(id) {
    const win = document.getElementById('window-template');
    document.getElementById('window-body').innerHTML = folderContent[id];
    document.querySelector('.window-title').innerText = id.toUpperCase();
    win.style.display = 'block';
}

function closeWindow() {
    document.getElementById('window-template').style.display = 'none';
}

function checkPass() {
    if(document.getElementById('psw').value === '1234') {
        document.getElementById('lock').style.display = 'none';
        document.getElementById('sec-files').style.display = 'block';
    } else { alert('ACCESS DENIED'); }
}

function playTrack(file, title) {
    const a = document.getElementById('main-audio');
    document.getElementById('track-title').innerText = title;
    a.src = 'assets/' + file;
    a.play();
}
