import DDA from "../src/dda.js"
import Bresenham from "../src/bresenham.js";
import Midpoint from "../src/midpoint.js"

class Painter {
  constructor() {
    var width = 800
    var height = 600
    
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext('2d')
    this.canvas.setAttribute("width", width)
    this.canvas.setAttribute("height", height)
    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.isHover = false

    this.startPoint = {x: -1, y:-1}
    this.endPoint = {x:-1 , y :-1}
    this.algorithm = "dda"

    this.points = []
    this.lineRgba = [0, 0, 0, 255]

    this.canvas.addEventListener('mousedown', (e) => {
      if(!this.isHover) {
        this.isHover = true;
        this.startPoint = this.getPosOnCanvas(e.clientX, e.clientY);
      }
    })

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isHover) {
        this.endPoint =  this.getPosOnCanvas(e.clientX, e.clientY);
        this.draw();
      }
    })

    this.canvas.addEventListener('mouseup', () => {
      if (this.isHover) {
        this.isHover = false;
        this.points.push([this.algorithm,this.startPoint, this.endPoint]);
        this.draw() ;
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === 'Escape'){
        this.isHover = false;
        this.points.push([this.algorithm,this.startPoint, this.endPoint]);
        this.draw() ;
      }
    })

    this.resetButton = document.getElementById("reset");
    this.resetButton.addEventListener('click', () => {
      this.points = [];
      this.clearCanvas();
    });

    this.selectElement =  document.getElementById('algorithmSelector');
    this.selectElement.addEventListener('change', (e) => {
      const selectedValue = e.target.value;
      console.log(selectedValue); 
      this.algorithm = selectedValue ;
    });
  }

  setPixel(x, y, color) {
    const index = (x + y * this.imageData.width) * 4;
    this.imageData.data[index] = color[0];
    this.imageData.data[index + 1] = color[1];
    this.imageData.data[index + 2] = color[2];
    this.imageData.data[index + 3] = color[3]; 
  }
  
  drawPoint(p ,color) {
    for (let i = -1; i <= 1; i++)
      for ( let j = -1; j <=1; j++)
        this.setPixel(p.x + i, p.y + j, color)  
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
  }

  draw() {
    this.clearCanvas();
    if (this.isHover) {
      this.drawPoint(this.startPoint, this.lineRgba);
      this.drawPoint(this.endPoint, this.lineRgba)
      switch (this.algorithm) {
        case "breseham":
          Bresenham(this, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y, this.lineRgba);
          break;
        case "midpoint":
          Midpoint(this, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y, this.lineRgba);
          break;
        default:
          DDA(this, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y, this.lineRgba);
          break;
      }
    }
    
    for (let i = 0; i < this.points.length; i++) {
      const [algorithm,start, end] = this.points[i];
      switch (algorithm) {
        case "breseham":
          Bresenham(this, start.x, start.y, end.x, end.y, this.lineRgba);
          break;
        case "midpoint":
          Midpoint(this, start.x, start.y, end.x, end.y, this.lineRgba) ;
          break;
        default:
          DDA(this, start.x, start.y, end.x, end.y, this.lineRgba);
          break;
      }
    }
    
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  getPosOnCanvas (x, y){
    var bbox = canvas.getBoundingClientRect();
    return {x: Math.floor(x - bbox.left * (canvas.width / bbox.width) + 0.5),y:
    Math.floor(y - bbox.top * (canvas.height / bbox.height) + 0.5)};
  }
}

export default Painter;