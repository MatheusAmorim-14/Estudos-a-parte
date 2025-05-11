document.addEventListener('DOMContentLoaded', function() {
    // Elementos do player
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const currentSongDisplay = document.getElementById('current-song');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const volumeControl = document.getElementById('volume-control');
    const musicItems = document.querySelectorAll('.music-item');

    // Estado do player
    let currentSongIndex = 0;
    let isPlaying = false;
    let songs = [];

    // No início da função initializePlaylist()
function initializePlaylist() {
    songs = Array.from(musicItems).map(item => {
        const path = item.getAttribute('data-src');
        // Verifica se o caminho da música existe
        return {
            name: item.getAttribute('data-name'),
            path: path,
            element: item
        };
    });

    // Verificação adicional
    songs.forEach(song => {
        const audio = new Audio();
        audio.src = song.path;
        audio.addEventListener('error', () => {
            console.error(`Erro ao carregar: ${song.path}`);
            song.element.style.color = 'red';
            song.element.title = 'Música não encontrada!';
        });
    });

    if (songs.length > 0) {
        loadSong(currentSongIndex);
    }
}

    // Inicializa a playlist a partir dos itens da lista
    function initializePlaylist() {
        songs = Array.from(musicItems).map(item => ({
            name: item.getAttribute('data-name'),
            path: item.getAttribute('data-src')
        }));
        
        if (songs.length > 0) {
            loadSong(currentSongIndex);
        }
    }

    // Formata o tempo (segundos para MM:SS)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Atualiza a barra de progresso
    function updateProgress() {
        const { duration, currentTime } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeDisplay.textContent = formatTime(currentTime);
    }

    // Define a posição da música ao clicar na barra de progresso
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Carrega uma música
    function loadSong(index) {
        const song = songs[index];
        
        audioPlayer.src = song.path;
        currentSongDisplay.textContent = song.name;
        
        // Atualiza a classe 'playing' nos itens da lista
        musicItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('playing');
            } else {
                item.classList.remove('playing');
            }
        });

        // Quando os metadados são carregados (duração disponível)
        audioPlayer.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(audioPlayer.duration);
        });

        // Se estava tocando, continua a reprodução
        if (isPlaying) {
            audioPlayer.play()
                .then(() => {
                    playButton.disabled = true;
                    pauseButton.disabled = false;
                })
                .catch(error => {
                    console.error('Erro ao reproduzir:', error);
                    alert('Erro ao reproduzir a música. Verifique o arquivo.');
                });
        }
    }

    // Toca a música atual
    function playSong() {
        audioPlayer.play()
            .then(() => {
                isPlaying = true;
                playButton.disabled = true;
                pauseButton.disabled = false;
            })
            .catch(error => {
                console.error('Erro ao reproduzir:', error);
                alert('Erro ao reproduzir a música. Verifique o arquivo.');
            });
    }

    // Pausa a música atual
    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        playButton.disabled = false;
        pauseButton.disabled = true;
    }

    // Música anterior
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(currentSongIndex);
        if (isPlaying) playSong();
    }

    // Próxima música
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        if (isPlaying) playSong();
    }

    // Ajusta o volume
    function setVolume() {
        audioPlayer.volume = volumeControl.value;
    }

    // Event Listeners
    playButton.addEventListener('click', playSong);
    pauseButton.addEventListener('click', pauseSong);
    prevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);
    volumeControl.addEventListener('input', setVolume);

    // Barra de progresso
    audioPlayer.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);

    // Quando uma música termina
    audioPlayer.addEventListener('ended', nextSong);

    // Clique nos itens da playlist
    musicItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
    });

    // Inicializa o player
    initializePlaylist();
    
    // Define o volume inicial
    audioPlayer.volume = 0.7;
    volumeControl.value = 0.7;

    audioPlayer.addEventListener('error', function() {
        console.log("Erro ao carregar:", audioPlayer.error);
    });

    // Adicione isto temporariamente após a linha do audioPlayer
console.log("Tentando carregar:", audioPlayer.src); 

function loadSong(index) {
    const testFiles = [
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    ];
    
    audioPlayer.src = testFiles[index];
    currentSongDisplay.textContent = "Música teste " + (index+1);
    playAudio();
}

});