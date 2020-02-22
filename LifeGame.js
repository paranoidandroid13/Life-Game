// описывается класс и его методы

class LifeGame {
  constructor (rows, columns) {
    this.rows = rows
    this.columns = columns
    this.generationNumber = 0

    this.map = []
    for (let y = 0; y < this.rows; y++) {
      const row = []

      for (let x = 0; x<this.columns; x++) {
        row.push(false)
      }

      this.map.push(row)
    }
  } 

  changeGeneration() {  // ф-ция, сменяющая поколение
    const map = [];
    for (let y=0; y<this.rows; y++) {
      const row = [];
      

      for (let x=0; x<this.columns; x++) {
        let neighborsNumber = 0;
        let state = false;

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) {    // самого себя соседом не считаем
              continue
            }
            neighborsNumber += this.getField(x+dx, y+dy)
          }
        }

        if (this.getField(x,y) === true) {
          if (neighborsNumber === 2 || neighborsNumber === 3) {
            state = true;
          }
        } else if (neighborsNumber === 3) {
          state = true;
        }

        row.push(state);

        // neighborsNumber += this.getField(x-1,y-1)
        // neighborsNumber += this.getField(x-1,y)
        // neighborsNumber += this.getField(x-1,y+1)
        // neighborsNumber += this.getField(x,y-1)
        // neighborsNumber += this.getField(x,y+1)
        // neighborsNumber += this.getField(x+1,y-1)
        // neighborsNumber += this.getField(x+1,y)
        // neighborsNumber += this.getField(x+1,y+1)
      }
      map.push(row)
    }
    this.map = map    // обновляем текущее состояние на следующее
    this.generationNumber++
  }

  reviveRandomFields (n=1) {
    const freeFields = [] // массив мертвых клеток

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        if (this.getField(x, y) === false) {
          freeFields.push({x, y})
        }
      }
    }

    n = parseInt(n)
    n = Math.min(n, freeFields.length)

    while (n>0) { // до тех пор, пока не оживим n клеток
      const index = Math.floor(Math.random() * freeFields.length) // выбираем случайный элемент из всех freeFields
      const field = freeFields.splice(index, 1)[0]  // вытаскиваем его, splice - вытаскиваем элемент в отдельный массив с единственным (нулевым) элементом и удаляем из массива freeFields, чтобы больше нельзя было оживить и так живую клетку
      this.setField(field.x, field.y, true) // оживление одной клетки

      n--
    }
  }

  forFreeEach (hander) { // вызывает эту функцию для всех живых
    for (let y = 0; y<this.rows; y++) {
      for (let x=0; x<this.columns; x++) {
        if (this.getField(x,y) === true) {
          hander(x, y)
        }
      }
    }
  }

  getField(x, y) {
    if (x<0 || x >= this.columns || y<0 || y>= this.rows) {
      return false;
    } return this.map[y][x];
  }

  setField(x, y, value) {
    if (x<0 || x >= this.columns || y<0 || y>= this.rows) {
      return false;
    } return this.map[y][x] = value;
  }
}