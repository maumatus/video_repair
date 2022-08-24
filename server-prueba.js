const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

//Probamos procesar tamaño video
ffmpeg('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/video.avi')
  .size('340x240')
  .addOptions(['-vprofile high', '-threads 0', '-movflags faststart'])
  .output('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/video-salida.mp4')
  .on('codecData', function(data) {
    console.log('Video Medatada: ' + data.video + 'Audio metadata: ' + data.audio);
  })
  .on('progress', function(progress) {
    console.log(+ progress.percent + '%');
  })
  .on('error', function(err) {
  console.log(err);
})
.on('end', function() {
  console.log('Processing finished !');
})
.run();

//.addOptions(['-c:v prores_ks -profile:v 3 -vendor apl0 -bits_per_mb 8000 -pix_fmt yuv422p10le'])