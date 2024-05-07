function euclideanDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.round(Math.sqrt(dx * dx + dy * dy)) ;
}
function Midpoint(that, x0, y0, x1, y1, color) {
  let radius = euclideanDistance(x0, y0, x1, y1);
  let x = 0;
  let y = radius;
  let p = 1 - radius;

  while (x <= y) {
    that.setPixel(x0 + x, y0 + y, color);
    that.setPixel(x0 - x, y0 + y, color);
    that.setPixel(x0 + x, y0 - y, color);
    that.setPixel(x0 - x, y0 - y, color);
    that.setPixel(x0 + y, y0 + x, color);
    that.setPixel(x0 - y, y0 + x, color);
    that.setPixel(x0 + y, y0 - x, color);
    that.setPixel(x0 - y, y0 - x, color);

    x++;
    if (p < 0) {
        p += 2 * x + 1;
    } else {
        y--;
        p += 2 * (x - y) + 1;
    }
  }
}

export default Midpoint;
