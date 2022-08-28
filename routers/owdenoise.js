const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

module.exports = function owdenoise() {
  ffmpeg()
    .input('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche1.avi')
    //.inputFormat('avi')
    .FPSOutput(24)
    .size('1920x1080')
    //.videoCodec('libx264rgb')
    //.videoBitrate('30000k')
    .videoCodec('prores_ks')
    
    //.addOptions(['-pix_fmt yuv422p10le', '-profile:v 3'])
    .addOptions(['-pix_fmt yuva444p10le', '-profile:v 3'])
    
    .videoFilters(
      {
        filter: "owdenoise=depth=8:ls=3.0:cs=3.0"//Opciones funcionaron asi. Entender.
      }
    ) 
    .toFormat('mov')
    .on('progress', function(progress) {
      console.log('Progreso ' + Object.keys(progress));
      console.log('Progreso ' + progress.frames + progress);
    })
    .output('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/owdenoise.mov')
    .on('error', function(err) {
    console.log(err);
    })
    .on('end', function() {
      console.log('Processing finished !');
    })
    .run();
};