class Vector2D {
  constructor(r, theta) {
    this._r = r;
    this._theta = theta;
  }

  static fromCoords = (x, y) => Vector2D((x ** 2 + y ** 2) ** .5, Math.atan(y / x));

  get magnitude() {
    return this._r;
  }

  set magnitude(mag) {
    this._r = mag;
  }

  get direction() {
    return this._theta;
  }

  set direction(dir) {
    this._theta = dir;
  }

  getCoords() {
    const r = this.magnitude();
    const dir = this.direction();

    return [r * Math.cos(dir), r * Math.sin(dir)];
  }

  add(vec) {
    const [x, y, z] = this.getCoords();
    
    return Vector2D.fromCoords()
  }
}