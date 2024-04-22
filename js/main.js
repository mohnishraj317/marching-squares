const cnv = document.querySelector(".cnv");
const ctx = cnv.getContext("2d");
const h = innerHeight - 1;
const w = innerWidth - 1;

cnv.style.cssText = `
  height: ${h}px;
  width: ${w}px;
`;

cnv.height = h * devicePixelRatio;
cnv.width = w * devicePixelRatio;

ctx.scale(devicePixelRatio, devicePixelRatio);

function fillCtx(color="black") {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
};