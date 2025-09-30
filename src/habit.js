class Habit {
  constructor(id, name ,options = {}) {
    this.id = id
    this.name = name
    this.completions = []
    this.allowMissedDays = options.allowMissedDays || false
    this.maxMissedDays = options.maxMissedDays || 0
  }
}