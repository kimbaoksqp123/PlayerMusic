/*
    1.Render songs
    2.Scroll top
    3.Play/Pause/seek
    4.CD rotate
    5.Next/prev
    6.Random
    7.Next/Repeat when ended
    8.Active song
    9.Scroll active song into view
    10.Play song when click
*/

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd');

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');

const playBtn = $('.btn-toggle-play');
const player = $('.player');

const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const repeatBtn = $('.btn-repeat');
const progress = $('#progress');
const randomBtn = $('btn-random');


const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [{
            name: "Em thích",
            singer: "SeanxLửa",
            path: "./music/Emthich.mp3",
            image: "https://photo-playlist-zmp3.zadn.vn/s1/v2/background-playlist?src=HavtoclCgWuG7IRjB9VcSLLS122t6ikomjC9Q_LJXU6EsqGdiaB5eCJCH2Mo7iMYZi1I8EGSnVQEaLebvnkHeul83oJZ49AYYivPT-P7aUdLt5Xxe1MVkBQGNN6r4fscpiDLT_jRdkk0n5aljKhLfSxa5ZN3Ptie-UJriFDcDMV6wBBrVG&cv=1&size=thumb/240_240"
        },
        {
            name: "Ái nộ",
            singer: "YenTatoo x Masew x Great",
            path: "./music/AiNoRemix2-MasewKhoiVu-7107607.mp3",
            image: "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Dịu dàng em đến",
            singer: "Erik x Ninja",
            path: "./music/DiuDangEmDen-ERIKNinjaZ-7078877.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Đừng xin lỗi nữa",
            singer: "Erik x Min",
            path: "./music/DungXinLoiNua.mp3",
            image: "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Sài Gòn Đau Lòng Quá",
            singer: "Duyên",
            path: "./music/SaiGonDauLongQua.mp3",
            image: "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Bước qua nhau",
            singer: "Vũ",
            path: "./music/BuocQuaNhau.mp3",
            image: "https://i.ytimg.com/vi/cG7itSsl8Uc/maxresdefault.jpg"
        },
        {
            name: "Muộn Rồi Mà Sao Còn",
            singer: "Sơn Tùng MTP",
            path: "./music/MuonRoiMaSaoCon.mp3",
            image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
    ],

    render: function() {
        const htmls = this.songs.map((song) => {
            return `
            <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('\n');

    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        //Xử lý CD quay/dừng

        const cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
            duration: 10000, //10s
            iterations: Infinity
        })

        // Xử lý phóng to/thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            // console.log(newCdWidth);

            if (newCdWidth > 0)
                cd.style.width = newCdWidth + 'px';
            else cd.style.width = 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xử lý khi click play

        playBtn.onclick = function() {
            if (_this.isPlaying) {
                _this.isPlaying = false;
                audio.pause();
                player.classList.remove('playing');
            } else {

                audio.play();

            }

        }

        // Khi song được play

        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Khi song được  pause

        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Xử lí khi click next 

        nextBtn.onclick = function() {
            if (_this.currentIndex < _this.songs.length)
                _this.currentIndex += 1;
            else _this.currentIndex = 0;
            // console.log(_this.currentIndex)
            _this.loadCurrentSong();

            audio.play();
        }

        // Xử lí khi click prev 

        prevBtn.onclick = function() {
            if (_this.currentIndex > 0)
                _this.currentIndex -= 1;
            else _this.currentIndex = _this.songs.length;
            _this.loadCurrentSong();
            audio.play();
        }

        // Xử lí khi click repeat 

        repeatBtn.onclick = function() {
            audio.load();
            audio.play();
        }

        //Khi tiến độ bài hát thay đổi

        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        // xử lý khi tua song

        progress.onchange = function(e) {
            const seekTime = Math.floor(audio.duration / 100 * e.target.value);
            audio.currentTime = seekTime;
        }


        // Xử lí khi click random

        // randomBtn.onclick = function() {
        //     let lengthSongs = _this.songs.length;
        //     console.log(length);
        // }









    },
    loadCurrentSong: function() {


        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

        // console.log(heading, cdThumb, audio);

    },
    start: function() {
        //Định nghĩa các thuộc tính cho Object
        this.defineProperties();

        //Lắng nghe và xử lý các sự kiện (DOM Events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng

        this.loadCurrentSong();

        //Render playlist
        this.render();
    }

}
app.start();