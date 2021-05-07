let allMusic = [{
        name: 'Get Up 2 Come Down',
        artist: "Big K.R.I.T",
        img: 'music1',
        src: 'music1'
    },

    {
        name: 'It\'s Alright',
        artist: "Mobb Deep",
        img: 'music2',
        src: 'music2'
    },
    {
        name: 'Clubbed to Death',
        artist: "Rob Dougan",
        img: 'music3',
        src: 'music3'
    },

    {
        name: 'Garry Lee',
        artist: "Just For The Moment",
        img: 'music4',
        src: 'music4'
    },

    {
        name: 'This Must Be The Place (Naive Melody)',
        artist: "Talking Heads",
        img: 'music5',
        src: 'music5'
    }

]

// DOM ELEMENTS

const wrapper = document.querySelector('.wrapper'),
    musicImg = wrapper.querySelector('.img-area img'),
    musicName = wrapper.querySelector('.song-details .name'),
    musicArtist = wrapper.querySelector('.song-details .artist'),
    mainAudio = wrapper.querySelector('#main-audio'),
    playPauseBtn = wrapper.querySelector('.play-pause'),
    prevBtn = wrapper.querySelector('#prev'),
    nextBtn = wrapper.querySelector('#next'),
    progressArea = wrapper.querySelector('.progress-area'),
    progressBar = wrapper.querySelector('.progress-bar'),
    musicList = wrapper.querySelector('.music-list'),
    showMoreBtn = wrapper.querySelector('#more-music'),
    hideMusicBtn = musicList.querySelector('#close');

let musicIndex = Math.floor((Math.random() * allMusic.length + 1));

window.addEventListener('load', () => {
    loadMusic(musicIndex);
    playingNow();
    // Calling load music function once the window is opened
})

function loadMusic(indexNum) {
    musicName.innerText = allMusic[indexNum - 1].name;
    musicArtist.innerText = allMusic[indexNum - 1].artist;
    musicImg.src = `images/${allMusic[indexNum - 1].img}.jpg`;
    mainAudio.src = `music/${allMusic[indexNum - 1].src}.mp3`;
}

// PLAY MUSIC
function playMusic() {
    wrapper.classList.add('paused');
    playPauseBtn.querySelector('i').innerText = "pause";
    mainAudio.play();
}

// PAUSE MUSIC
function pauseMusic() {
    wrapper.classList.remove('paused');
    playPauseBtn.querySelector('i').innerText = "play_arrow";
    mainAudio.pause();
}

// NEXT SONG
function nextSong() {
    // Increment the index by 1 each time the button is pressed
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

// PREVIOUS SONG
function prevSong() {
    musicIndex--;
    // If musicIndex is less than the music index array, array.length becomes true so that the last song plays 
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

playPauseBtn.addEventListener('click', () => {
    const ifMusicPaused = wrapper.classList.contains('paused');

    // If ifMusicPaused is true, then call the pauseMusic function. or else, call playMusic.
    ifMusicPaused ? pauseMusic() : playMusic();
    playingNow();
})

// Next Song Button Event
nextBtn.addEventListener('click', () => {
    nextSong();
})

prevBtn.addEventListener('click', () => {
    prevSong();
})

// UPDATE PROGRESS BAR WIDTH ACCORDING TO CURRENT TIME
mainAudio.addEventListener('timeupdate', (e) => {
    // Get current time and duration of the audio by going into the console and going to "CurrentTime" and "Duration"
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let songCurrentTime = wrapper.querySelector('.current');
    let songDuration = wrapper.querySelector('.duration');
    mainAudio.addEventListener('loadeddata', () => {
        // UPDATE SONG DURATION
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            // adds a 0 if seconds is less than 10
            totalSec = `0${totalSec}`;
        }
        songDuration.innerText = `${totalMin}:${totalSec}`;
    });

    // UPDATE CURRENT PLAY TIME
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        // adds a 0 if seconds is less than 10
        currentSec = `0${currentSec}`;
    }
    songCurrentTime.innerText = `${currentMin}:${currentSec}`;
})

// UPDATE THE CURRENT SONG'S PLAYING TIME ACCORDING TO THE PROGRESS BAR'S WIDTH
progressArea.addEventListener('click', (e) => {
    let progressWidthValue = progressArea.clientWidth; // Gets the width of the progress bar
    let clickedOffSetX = e.offsetX; // Gets offset X value
    let songDuration1 = mainAudio.duration; // Gets total duration of the song

    mainAudio.currentTime = (clickedOffSetX / progressWidthValue) * songDuration1;
    playMusic();
})

// REPEAT & SHUFFLE
const repeatBtn = wrapper.querySelector('#repeat-plist');
repeatBtn.addEventListener('click', () => {
    // First, get the innerText of the icon. Then, change the icon.
    let getText = repeatBtn.innerText; // gets innerText of the icon
    // Changes the icons to different things on click 
    switch (getText) {
        case 'repeat': // if it's the repeat icon
            repeatBtn.innerText = 'repeat_one';
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case 'repeat_one': // if repeat-one icon is chosen, change it to shuffle
            repeatBtn.innerText = 'shuffle';
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case 'shuffle': // if repeat-one icon is chosen, change it to shuffle
            repeatBtn.innerText = 'repeat';
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
})

// CONTROLS WHAT HAPPENS AFTER THE SONG ENDS
mainAudio.addEventListener('ended', () => {
    // Changes the behavior of the song according to the icon selected by the user
    let getText = repeatBtn.innerText;
    switch (getText) {
        case 'repeat': // if it's the repeat icon, the nextSong function is called
            nextSong();
            break;
        case 'repeat_one': // if repeat-one icon is chosen, change the current playing song and time to 0 so that the song will play from the beginning
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case 'shuffle': // if repeat-one icon is chosen, change it to shuffle
            // Generates random index numbers between 0 and the length of the array
            let randomIndex = Math.floor((Math.random() * allMusic.length + 1));
            do {
                randonIndex = Math.floor((Math.random() * allMusic.length + 1));
            } while (musicIndex = randonIndex); // This loop will run until the next random number isn't the same of the current music index
            musicIndex = randonmIndex; // passed randomIndex to musicIndex so that the random song will play
            loadMusic(musicIndex); // calls loadMusic function
            playMusic();
            playingNow();
            break;
    }

})

showMoreBtn.addEventListener('click', () => {
    musicList.classList.toggle('show');
});

hideMusicBtn.addEventListener('click', () => {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector('ul');

// Creates LI according to array length
for (let i = 0; i < allMusic.length; i++) {
    // Passes the song and artist info from the array to the LI
    let liTag = `<li li-index="${i + 1}">
    <div class="row">
        <span>${allMusic[i].name}</span>
        <p>${allMusic[i].artist}</p>
    </div>
    <audio class="${allMusic[i].src}" src="music/${allMusic[i].src}.mp3"></audio>
    <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
</li>`;

    ulTag.insertAdjacentHTML('beforeend', liTag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener('loadeddata', () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            // adds a 0 if seconds is less than 10
            totalSec = `0${totalSec}`;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute('t-duration', `${totalMin}:${totalSec}`);
    });
}

// Plays Each Song in the Music List On-Click
const allLiTags = ulTag.querySelectorAll('li');

function playingNow() {
    for (let j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector('.audio-duration');
        // Removes playing class from all other LI tags except that which is clicked
        if (allLiTags[j].classList.contains('playing')) {
            allLiTags[j].classList.remove("playing");
            // Audio duration value passes to .audio-duration innerText
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration; // passes t-duration value to
        }

        // if there is an li tag which li-index is equal to the musicIndex
        if (allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add('playing');
            audioTag.innerText = 'Playing';
        }

        // Adds on-click attribute to all LI tags
        allLiTags[j].setAttribute('onclick', 'clicked(this)');
    }
}

// Plays song on LI click
function clicked(element) {
    // Gets li index of the clicked LI tag
    let getLiIndex = element.getAttribute('li-index');
    musicIndex = getLiIndex; // passes the liIndex to the musicIndex
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

// for (let j = 0; j < allLiTags.length; j++) {
//     // if there is an li tag which li-index is equal to the musicIndex
//         if (allLiTags[j].getAttribute("li-index") == musicIndex) {
//             allLiTags[j].classList.add('playing');
//         }

//         // Adds on-click attribute to all LI tags
//         allLiTags[j].setAttribute('onclick', 'clicked(this)');