<template>
  <canvas ref="canvas" />
</template>

<script>
export default {
  props: {},
  data() {
    return {
      canvas: null,
      ctx: null,
      audio: null,
      audioFile: './song.mp3',
      audioStream: null,
      frequencyArray: [],
      audioAnalyser: null,
      circleBars: 200,
      barWidth: 2,
    }
  },
  watch: {
    isAudioPlaying(n) {
      if (n === true) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
  },
  computed: {
    isAudioPlaying() {
      return this.$store.state.audioPlay
    },
  },

  methods: {
    init() {
      this.audio = new Audio()
      this.audio.crossOrigin = 'anonymous'
      this.audio.src = this.audioFile

      const audioContext = new AudioContext()
      const dest = audioContext.createMediaStreamDestination()
      this.audioStream = dest.stream
      const sourceNode = audioContext.createMediaElementSource(this.audio)
      sourceNode.connect(dest)

      this.audioAnalyser = audioContext.createAnalyser()
      sourceNode.connect(this.audioAnalyser)
      this.audioAnalyser.connect(audioContext.destination)

      this.frequencyArray = new Uint8Array(this.audioAnalyser.frequencyBinCount)

      this.prepareCanvas()
      this.animationLooper()
      this.$store.commit('canvasInit')
    },
    prepareCanvas() {
      // set to the size of device
      this.canvas = this.$refs.canvas
      this.canvas.width = 1080
      this.canvas.height = 1920
      this.ctx = this.canvas.getContext('2d')
    },
    animationLooper() {
      // find the center of the window
      const centerX = this.canvas.width / 2
      const centerY = this.canvas.height / 2
      const radius = 150

      // style the background
      const gradient = this.ctx.createLinearGradient(
        0,
        0,
        0,
        this.canvas.height
      )
      gradient.addColorStop(0, 'rgba(35, 7, 77, 1)')
      gradient.addColorStop(1, 'rgba(204, 83, 51, 1)')
      this.ctx.fillStyle = gradient
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

      // draw a circle
      this.ctx.beginPath()
      this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      this.ctx.stroke()

      this.audioAnalyser.getByteFrequencyData(this.frequencyArray)
      for (let i = 0; i < this.circleBars; i++) {
        // divide a circle into equal parts
        const rads = (Math.PI * 2) / this.circleBars
        const barHeight = this.frequencyArray[i] * 0.7 // ? proc 0.7 vyzkouset

        // set coordinates of the bar
        const x = centerX + Math.cos(rads * i) * radius
        const xEnd = centerX + Math.cos(rads * i) * (radius + barHeight)
        const y = centerY + Math.sin(rads * i) * radius
        const yEnd = centerY + Math.sin(rads * i) * (radius + barHeight)

        this.drawBar(x, y, xEnd, yEnd, this.barWidth, this.frequencyArray[i])
      }
      window.requestAnimationFrame(this.animationLooper)
    },
    drawBar(x1, y1, x2, y2, width, frequency) {
      const lineColor = 'rgb(' + frequency + ', ' + frequency + ', ' + 205 + ')'

      this.ctx.strokeStyle = lineColor
      this.ctx.lineWidth = width
      this.ctx.beginPath()
      this.ctx.moveTo(x1, y1)
      this.ctx.lineTo(x2, y2)
      this.ctx.stroke()
    },
    exportVideo() {
      const videoChunks = []
      const stream = this.canvas.captureStream() // grab our canvas MediaStream
      stream.addTrack(this.audioStream.getAudioTracks()[0])
      const videoRec = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=h264',
      }) // init the recorder
      // every time the recorder has new data, we will store it in our array
      videoRec.ondataavailable = (e) => videoChunks.push(e.data)

      videoRec.onstop = (e) => {
        if (videoChunks.length) {
          this.downloadVid(videoChunks)
        } else {
          alert('no data saved')
        }
      }

      videoRec.start()
      setTimeout(() => {
        videoRec.stop()
      }, 10000) // stop recording in 3s
    },
    downloadVid(chunks) {
      const blob = new Blob(chunks, { type: 'video/webm' })
      const a = document.createElement('a')
      a.download = 'myvid.webm'
      a.href = URL.createObjectURL(blob)
      a.textContent = 'download the video'
      document.body.appendChild(a)
    },
  },
}
</script>
