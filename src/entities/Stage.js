export class Stage {
  constructor() {
    // สุ่มเลือกรูปภาพจากหลายๆ แผนที่
    const randomImageIndex = Math.random() < 0.5 ? 0 : 1;
    this.image = document.querySelectorAll('img[alt="stage"]')[randomImageIndex];

    this.music = document.querySelector('audio#MusicBG');

    this.frames = new Map([
      ['stage-background', [72, 208, 768, 176]],
      ['stage-floor', [8, 392, 896, 72]],
    ]);
  }

  update() {}

  drawFrame(context, frameKey, x, y) {
    const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);

    context.drawImage(
      this.image,
      sourceX, sourceY, sourceWidth, sourceHeight,
      x, y, sourceWidth, sourceHeight
    );
  }

  drawBackground(context, camera) {
    this.drawFrame(context, 'stage-background', 
      Math.floor(16 - (camera.position.x / 2.157303)), -camera.position.y);
  }

  drawForeground(context, camera) {
    this.drawFrame(context, 'stage-floor', 
      Math.floor(192 - camera.position.x), 176 - camera.position.y);
  }
}
