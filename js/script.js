class Grid {
  constructor(x, y) {
    this.units = [x, y];
  }

  draw() {
    /* create grid */
    // for (let i = 0; i < w; i += this.units[0]) {
    //   ctx.beginPath();
    //   ctx.moveTo(i, 0);
    //   ctx.lineTo(i, h);
    //   ctx.strokeStyle = "white";
    //   ctx.stroke();
    // }

    // for (let i = 0; i < h; i += this.units[1]) {
    //   ctx.beginPath();
    //   ctx.moveTo(0, i);
    //   ctx.lineTo(w, i);
    //   ctx.strokeStyle = "white";
    //   ctx.stroke();
    // }

    for (let i = 0; i < w + 1; i += this.units[0]) {
      for (let j = 0; j < h + 1; j += this.units[1]) {
        const liesInside = this._liesInside(i, j);

        /* create points */
        ctx.beginPath();
        ctx.arc(i, j, 5, 0, Math.PI * 2);
        ctx.strokeStyle = liesInside ? "lime" : "white";
        ctx.fillStyle = liesInside ? "lime" : "black";
        ctx.fill()
        ctx.stroke();

        const a = liesInside;
        const b = this._liesInside(i + this.units[0], j);
        const c = this._liesInside(i + this.units[0], j + this.units[1]);
        const d = this._liesInside(i, j + this.units[1]);

        const config = 8*a + 4*b + 2*c + d;

        switch(config) {
          case 0 :
          case 15 :
            break;

          case 1 :
          case 14 :
            this._line(i, j, 3, 2);
            break;
          
          case 2 :
          case 13 :
            this._line(i, j, 1, 2);
            break;

          case 3 :
          case 12 :
            this._line(i, j, 1, 3);
            break;
          
          case 4 :
          case 11 :
            this._line(i, j, 0, 1);
            break;
          
          case 5 :
            this._line(i, j, 0, 3);
            this._line(i, j, 2, 1);
            break;
          
          case 10 :
            this._line(i, j, 0, 1);
            this._line(i, j, 2, 3); 
            break;
          
          case 6 :
          case 9 :
            this._line(i, j, 0, 2);
            break;
          
          case 7 :
          case 8 :
            this._line(i, j, 0, 3);
            break;
        }
      }
    }
  }

  _line(i, j, iEdge, fEdge) {
    const edgeMap = [
      [this.units[1] / 2, 0],
      [this.units[0], this.units[1] / 2],
      [this.units[0] / 2, this.units[1]],
      [0, this.units[1] / 2]
    ];

    const xi = edgeMap[iEdge][0] + i;
    const yi = edgeMap[iEdge][1] + j;
    const xf = edgeMap[fEdge][0] + i;
    const yf = edgeMap[fEdge][1] + j;

    ctx.beginPath();
    ctx.moveTo(xi, yi);
    ctx.lineTo(xf, yf);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  _liesInside(i, j) {
    let liesInside = false;

    Circle.circles.forEach(circle => {
      if (Math.hypot(i - circle.x, j - circle.y) < circle.r) liesInside = true;
    });

    return liesInside;
  }
}

class Circle {
  constructor(x, y, r, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    Circle.circles.push(this);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if ((this.x + this.r) > w || (this.x - this.r) < 0) this.dx *= -1;
    if ((this.y + this.r) > h || (this.y - this.r) < 0) this.dy *= -1;

    // this.draw();
  }

  static generate() {
    const r = Math.random() * 40 + 30;
    return new Circle(Math.random() * (w - r) + r, Math.random() * (h - r) + r, r, colors.random(), Math.random() * 2 - 1, Math.random() * 2 - 1)
  }

  static circles = [];
}

const grid = new Grid(25,25);

const mouse = {x: 0, y: 0};
addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const c = new Circle(0, 0, 60, "white", 0, 0);

Array(20).fill(null).forEach(_ => {
  Circle.generate();
});

(function animate() {
  requestAnimationFrame(animate);
  ctx.beginPath();
  fillCtx("#000");
  grid.draw();
  
  Circle.circles.forEach(circle => {
    circle.update();
    // circle.draw();
  });
  c.x = mouse.x;
  c.y = mouse.y;
}());