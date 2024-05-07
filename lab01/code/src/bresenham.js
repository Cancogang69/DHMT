function Bresenham(that, x0, y0, x1, y1, color) {
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let isSteep = dy > dx;
  
  if (isSteep) {
    [x0, y0] = [y0, x0];
    [x1, y1] = [y1, x1];
  }
  
  if (x0 > x1) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
  }
  
  dx = Math.abs(x1 - x0);
  dy = Math.abs(y1 - y0);
  
  let error = dx / 2;
  const yStep = (y0 < y1) ? 1 : -1;
  let y = y0;

  for (let x = x0; x <= x1; x++) {
    that.setPixel((isSteep ? y : x), (isSteep ? x : y), color);
    
    error -= dy;
    if (error < 0) {
      y += yStep;
      error += dx;
    }
  }
}

export default Bresenham;
