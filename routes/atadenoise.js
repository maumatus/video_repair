const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

module.exports = function atadenoise(entrada, salida, th0A, th0B, th1A, th2A, th1B, th2B, planosPromedio) {
  
  ffmpeg()
    .input(entrada)
    .FPSOutput(24)
    .size('1920x1080')
    .videoCodec('prores_ks')  
    .addOptions(['-pix_fmt yuva444p10le', '-profile:v 3'])
    .videoFilters([`atadenoise=${th0A}:${th0B}:${th1A}:${th1B}:${th2A}:${th2B}:${planosPromedio}`])
    .toFormat('mov')
    .on('progress', function(progress) {
      console.log('Progreso ' + Object.keys(progress));
      console.log('Progreso ' + progress.frames + progress);
    }) 
    .output(salida)
    .on('error', function(err) {
    console.log(err);
    })
    .on('end', function() {
      console.log('Processing finished !');
    })
    .run();
};