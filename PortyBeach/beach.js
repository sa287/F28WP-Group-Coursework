class Beach{

  constructor(obj) {
      obj && Object.assign(this, obj);
    }

    setTile(x, y, value) {
      // set tile (x,y) to value
      if (0 <= x && x < this.width && 0 <= y && y < this.height) {
        this.grid[x][y] = value;
      }
    }

    atTile(x, y) {
      // return value at tile (x,y)
      if (0 <= x && x < this.width && 0 <= y && y < this.height) {
        return this.grid[x][y];
      }
      else {
        return null;
      }
    }


}
