const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = {
    listMusic: [
        {
            name: 'Chắc Ai Đó Sẽ Về',
            singer: 'Sơn Tùng MTP',
            img:'https://img.webkhoedep.vn/images/2020/08/01/06/32/3xyov4a-15959404118361075013884.jpeg',
            mp3:'./assets/mp3/ChacAiDoSeVeSkyTour2019-SonTungMTP-6301040.mp3'
        },
        {
            name: 'Và Thế Là Hết',
            singer: 'Chillies',
            img:'https://i1.sndcdn.com/artworks-000463015893-zmky6w-t500x500.jpg',
            mp3:'./assets/mp3/chillies-original và thế là hết.mp3'
        },
        {
            name: 'Chạy Ngay Đi',
            singer: 'Sơn Tùng MTP',
            img:'https://i.pinimg.com/originals/f2/3b/43/f23b43ab97f4a70d59fd411424457ad2.png',
            mp3:'./assets/mp3/ChayNgayDiSkyTour2019-SonTungMTP-6301035.mp3'
        },
        {
            name: 'Còn Yêu Đâu Ai Rời Đi',
            singer: 'Đức Phúc',
            img:'https://network.vietmmo.net/ducphucsinger-en/wp-content/uploads/sites/755/2017/08/3.jpg',
            mp3:'./assets/mp3/Còn Yêu, Đâu Ai Rời Đi.mp3'
        },
        {
            name: 'Chúng Ta Không Thuộc Về Nhau',
            singer: 'Sơn Tùng MTP',
            img:'https://i.pinimg.com/originals/63/f1/1b/63f11b5fd07651b2f49bd32090e38d7f.png',
            mp3:'./assets/mp3/ChungTaKhongThuocVeNhauSkyTour2019-SonTungMTP-6301036.mp3'
        },
        {
            name: 'Mascara',
            singer: 'Chillies',
            img:'https://cuoifly.tuoitre.vn/820/0/ttc/r/2020/04/07/chillies-1586223837.jpg',
            mp3:'./assets/mp3/chillies-x-blaze-official-music-video mascara.mp3'
        },
        {
            name: 'Em Của Ngày Hôm Qua',
            singer: 'Sơn Tùng MTP',
            img:'http://tinhdaubuoi.vn/data/upload_file/Image/toc-hu-ton/toc-son-tung-12.jpg',
            mp3:'./assets/mp3/EmCuaNgayHomQuaSkyTour2019-SonTungMTP-6301041.mp3'
        },
        {
            name: 'Hết Thương Cạn Nhớ',
            singer: 'Đức Phúc',
            img:'https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/11/26/4/6/7/7/1574739632135_600.jpg',
            mp3:'./assets/mp3/Hết Thương Cạn Nhớ.mp3'
        },
        {
            name: 'Hãy Trao Cho Anh',
            singer: 'Sơn Tùng MTP',
            img:'https://i.pinimg.com/474x/b3/ea/48/b3ea485d02d0c5184cb7ea2fa8c50c3a.jpg',
            mp3:'./assets/mp3/HayTraoChoAnhSkyTour2019-SonTungMTP-6301042.mp3'
        },
        {
            name: 'Khóc Cùng Em',
            singer: 'MR-Siro',
            img:'https://media.congluan.vn/files/dieulinh/2020/05/20/sino-2246.jpg',
            mp3:'./assets/mp3/khoc-cung-em-mr-siro-x-gray-x-wind-official-music-video.mp3'
        },
    ],
    isPlaying: false,
    checkRepeat: false,
    checkRandom: false,
    playMusic: function(audio,play,cdthumbAnimate) {
        this.isPlaying = true;
        audio.play()
        play.classList.replace('fa-play','fa-pause')
        cdthumbAnimate.play()
    },
    pauseMusic: function(audio,play,cdthumbAnimate) {
        this.isPlaying = false;
        audio.pause()
        play.classList.replace('fa-pause','fa-play')
        cdthumbAnimate.pause()
    },
    activeSong: function (item,index) {
        $('.item_song.active').classList.remove('active')
            item[index].classList.add('active')
    },
    scrollToActiveSong: function() {
        setTimeout(function () {
            $('.item_song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        },300)

    },
    start: function() {
        this.render()
        const audio = $('audio')
        const playBtn = $('.tool_play')
        const img = $('.crr_img')
        const crrImg = $('.player_img')
        const play = $('#play')
        const title = $('.name_playing')
        const nextBtn = $('.tool_next')
        const prevBtn = $('.tool_prev')
        const repeatBtn = $('.tool_back')
        const randomBtn = $('.tool_random')
        const listSong = $('.list_song')
        const itemSongs = $$('.item_song')
        const timeLine = $('.progress_timeLine')
        let startTime = $('.crr_time')
        let totalDuration = $('.progress_duration')
        let progress = $('.progress_div')
        let indexSong = 0
        itemSongs[indexSong].classList.add('active')

        listSong.onclick = function(e) {
            const itemSong = e.target.closest('.item_song')
            const dataIndex = itemSong.getAttribute('data-index')
            loadSong(app.listMusic[dataIndex])
            app.playMusic(audio,play,cdthumbAnimate)
            indexSong = Number(dataIndex)
            app.activeSong(itemSongs,indexSong)
        }
        
        const cdthumbAnimate = crrImg.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration : 10000 ,
            iterations : Infinity,
        })
        cdthumbAnimate.pause()

        playBtn.onclick = function() {
            app.isPlaying ? app.pauseMusic(audio,play,cdthumbAnimate) : app.playMusic(audio,play,cdthumbAnimate)
        }
        const loadSong = function(song) {
            title.textContent = song.name,
            img.src = song.img
            audio.src = song.mp3
        }
        const nextSong = function() {
            if(app.checkRandom) {
                indexSong = Math.floor(Math.random() * app.listMusic.length)
            } else {
                indexSong = (indexSong + 1) % app.listMusic.length
            }
            loadSong(app.listMusic[indexSong])
            app.playMusic(audio,play,cdthumbAnimate)
            app.activeSong(itemSongs,indexSong)
            app.scrollToActiveSong()
        }
        const prevSong = function() {
            if(app.checkRandom) {
                indexSong = Math.floor(Math.random() * app.listMusic.length)
            } else {
                indexSong = (indexSong - 1 + app.listMusic.length) % app.listMusic.length
            }
            loadSong(app.listMusic[indexSong])
            app.playMusic(audio,play,cdthumbAnimate)
            app.activeSong(itemSongs,indexSong)
            app.scrollToActiveSong()

        }
        randomBtn.onclick = function() {
            if(app.checkRandom) {
                randomBtn.classList.remove('active')
                app.checkRandom = false
            } else {
                randomBtn.classList.add('active')
                app.checkRandom = true
                repeatBtn.classList.remove('active')
                app.checkRepeat = false
                audio.loop = false
            }
            console.log(app.checkRandom)
        }
        repeatBtn.onclick = function() {
            if(app.checkRepeat) {
                repeatBtn.classList.remove('active')
                app.checkRepeat = false
                audio.loop = false
            } else {
                repeatBtn.classList.add('active')
                app.checkRepeat = true
                audio.loop = true
                randomBtn.classList.remove('active')
                app.checkRandom = false
            }
        }
        audio.addEventListener('timeupdate' ,function(e) {
            let currentTime = e.srcElement.currentTime
            let duration = e.srcElement.duration
            timeLine.style.width = `${(currentTime / duration) * 100}%`

            let min_duration = Math.floor(duration / 60)
            let sec_duration = Math.floor(duration % 60)
            if(sec_duration < 10) {
                sec_duration = `0${sec_duration}`
            }
            if(duration) {
                totalDuration.textContent = `${min_duration}:${sec_duration}`
            }

            let min_currentTime = Math.floor(currentTime / 60)
            let sec_currentTime = Math.floor(currentTime % 60)
            if(sec_currentTime < 10) {
                sec_currentTime = `0${sec_currentTime}`
            }
             startTime.textContent = `${min_currentTime}:${sec_currentTime}`
        })
        
        progress.onclick = function (e) {
            const {duration} = audio
            let move_progress = (e.offsetX / e.srcElement.clientWidth) * duration
            console.log(move_progress)
            audio.currentTime = move_progress
        }
        audio.onended = function() {
            nextSong()
        }
        nextBtn.onclick = function() {nextSong()}
        prevBtn.onclick = function() {prevSong()}       
    },
    render: function() {
        const listSong = $('.list_song')
        const htmls = this.listMusic.map(function(song,index) {
            return `
                <li class="item_song" data-index="${index}">
                    <img src="${song.img}" alt="" class="song_img">
                    <div class="song_body">
                        <p class="name_song">${song.name}</p>
                        <p class="name_sing">${song.singer}</p>
                    </div>
                    <div class="song_menu">
                        <i class="fa fa-ellipsis-h"></i>
                    </div>
                </li>
            `
        })
        listSong.innerHTML = htmls.join('')
    }
}
app.start()