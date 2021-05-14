// Get our elements
// 获取各个dom元素
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');



/* Hook up the event listeners */
// 点击视频时，切换播放与暂停
video.addEventListener('click', togglePlay);
// 视频播放或暂停时icon按钮的切换
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// 进度条事件，根据视频当前时间渲染进度条
video.addEventListener('timeupdate', handleProgress);
// 点击icon图标进行播放暂停
toggle.addEventListener('click', togglePlay);
// 快进和倒退按钮添加事件，根据自定义属性值进行判断
skipButtons.forEach(button => button.addEventListener('click', skip));


// 播放速度和音量控制
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
// 进度条控制
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

/* Build out functions */

function togglePlay() {
    const method = video.pasued ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = video.pasued ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}