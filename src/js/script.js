// Audio player elements
const playBtn = document.getElementById("play-btn");
const playIcon = document.getElementById("play-icon");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const volumeSlider = document.getElementById("volume-slider");
const seekBar = document.getElementById("seek-bar");
const seekProgress = document.getElementById("seek-progress");
const currentSongEl = document.getElementById("current-song");
const timeDisplayEl = document.getElementById("time-display");

// Playlist (add your own tracks here!)
const playlist = [
  { name: "Track 1", file: "/public/assets/music/track1.mp3" },
  { name: "Track 2", file: "/public/assets/music/track2.mp3" },
  { name: "Track 3", file: "/public/assets/music/track3.mp3" },
];

// Create new audio instance
let currentTrack = 0;
let audio = new Audio(playlist[currentTrack].file);
let isPlaying = false;

// Load initial song
function loadTrack(index) {
  audio.src = playlist[index].file;
  currentSongEl.textContent = playlist[index].name;
  seekProgress.style.width = "0%";
  timeDisplayEl.textContent = "0:00 / 0:00";
}

// Toggle play and pause
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playIcon.className = "ph-play-fill";
  } else {
    audio.play();
    playIcon.className = "ph-pause-fill";
  }
  isPlaying = !isPlaying;
}

// Update seek bar
function updateSeekBar() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  seekProgress.style.width = `${progressPercent}%`;

  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  const totalMinutes = Math.floor(audio.duration / 60);
  const totalSeconds = Math.floor(audio.duration % 60);

  timeDisplayEl.textContent = `${currentMinutes}:${currentSeconds
    .toString()
    .padStart(2, "0")} / ${totalMinutes}:${totalSeconds
    .toString()
    .padStart(2, "0")}`;
}

// Change song
function changeSong(direction) {
  if (direction === "next") {
    currentTrack = (currentTrack + 1) % playlist.length;
  } else if (direction === "prev") {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  }
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
}

// Volume control
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

// Seek bar manual control
seekBar.addEventListener("click", (e) => {
  const clickPosition = e.offsetX / seekBar.offsetWidth;
  audio.currentTime = clickPosition * audio.duration;
});

// Auto-play next song when a track ends
audio.addEventListener("ended", () => {
  changeSong("next");
  audio.play();
});

// Event listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", () => changeSong("next"));
prevBtn.addEventListener("click", () => changeSong("prev"));
audio.addEventListener("timeupdate", updateSeekBar);

// Initialize audio
loadTrack(currentTrack);
