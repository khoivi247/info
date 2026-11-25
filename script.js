const introOverlay = document.querySelector("#introOverlay");
const introSkip = document.querySelector("#introSkip");
const introAudio = document.querySelector("#introAudio");
const introAudioStatus = document.querySelector("#introAudioStatus");
let introTimer;

function playIntroAudio() {
    if (!introAudio || !introAudio.paused) return;

    const playback = introAudio.play();
    if (playback) {
        playback.catch((error) => {
            if (error.name === "NotAllowedError") {
                introAudioStatus.textContent = "Chạm để nghe lời chào";
                return;
            }
            introAudioStatus.textContent = "Không thể phát file lời chào";
            console.error("Không thể phát loichao.mp3:", error);
        });
    }
}

function dismissIntro() {
    if (!introOverlay || introOverlay.classList.contains("is-closing")) return;
    window.clearTimeout(introTimer);
    introOverlay.classList.add("is-closing");
    window.setTimeout(() => introOverlay.remove(), 750);
}

if (introOverlay && introSkip) {
    introOverlay.addEventListener("pointerdown", playIntroAudio, { once: true });
    introSkip.addEventListener("click", () => {
        playIntroAudio();
        dismissIntro();
    });
    introOverlay.addEventListener("click", (event) => {
        if (event.target === introOverlay) dismissIntro();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && document.body.contains(introOverlay)) dismissIntro();
    });
    introTimer = window.setTimeout(
        dismissIntro,
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1400 : 4500
    );
    playIntroAudio();
}

introAudio.addEventListener("play", () => {
    introAudioStatus.textContent = "Đang phát lời chào...";
});
introAudio.addEventListener("ended", () => {
    introAudioStatus.textContent = "Chào mừng đến với portfolio";
});
introAudio.addEventListener("error", () => {
    introAudioStatus.textContent = "Không tải được file lời chào";
});

const menuToggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");

function closeMenu() {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});
primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.querySelector("#currentYear").textContent = new Date().getFullYear();
