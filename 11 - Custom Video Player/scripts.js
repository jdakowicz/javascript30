class Video {
  constructor (config) {
    this.player = document.querySelector(config.player)
    this.video = document.querySelector(config.video)
    this.progress = document.querySelector(config.progress)
    this.progressBar = document.querySelector(config.progressBar)
    this.toggle = document.querySelector(config.toggle)
    this.skipButtons = document.querySelectorAll(config.skipButtons)
    this.ranges = document.querySelectorAll(config.ranges)
    this.fullscreen = document.querySelector(config.fullscreen)
    this.mouseDown

    this.toggleVideo = this.toggleVideo.bind(this)
    this.changeButton = this.changeButton.bind(this)
    this.changeProgress = this.changeProgress.bind(this)
    this.changeRange = this.changeRange.bind(this)
    this.skip = this.skip.bind(this)
    this.rewind = this.rewind.bind(this)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
  }
  init () {
    if (this.video) {
      this.video.addEventListener('click', this.toggleVideo)
      this.toggle.addEventListener('click', this.toggleVideo)
      this.video.addEventListener('play', this.changeButton)
      this.video.addEventListener('pause', this.changeButton)
      this.video.addEventListener('timeupdate', this.changeProgress)
      this.skipButtons.forEach(button => {
        button.addEventListener('click', this.skip)
      })
      this.ranges.forEach(range => {
        this.video[range.name] = range.value
        range.addEventListener('change', this.changeRange)
      })
      this.progress.addEventListener('mousemove', this.rewind)
      this.progress.addEventListener('click', this.rewind)
      this.progress.addEventListener('mouseup', () => { this.mouseDown = false })
      this.progress.addEventListener('mousedown', () => { this.mouseDown = true })
      this.progressBar.style.flexBasis = `${this.video.currenTime || 0}%`
      this.fullscreen.addEventListener('click', this.toggleFullscreen)
    }
  }
  toggleVideo () {
    const type = this.video.paused ? 'play' : 'pause'
    this.video[type]()
  }
  changeButton () {
    this.toggle.textContent = this.video.paused ? '▶' : '■'
  }
  skip (e) {
    this.video.currentTime += parseInt(e.currentTarget.dataset.skip, 10)
  }
  changeRange (e) {
    this.video[e.currentTarget.name] = e.currentTarget.value
  }
  changeProgress (e) {
    const val = (this.video.currentTime / this.video.duration) * 100
    this.progressBar.style.flexBasis = `${val}%`
  }
  rewind (e) {
    if (!this.mouseDown && e.type === 'mousemove') return
    const time = (e.offsetX / this.progress.offsetWidth) * this.video.duration
    this.video.currentTime = time
  }
  toggleFullscreen (e) {
    this.video.requestFullscreen()
  }
}

const vid = new Video({
  player: '.player',
  video: '.viewer',
  progress: '.progress',
  progressBar: '.progress__filled',
  toggle: '.toggle',
  skipButtons: '[data-skip]',
  ranges: '.player__slider',
  fullscreen: '[data-fullscren]'
})
vid.init()
