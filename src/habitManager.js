const habit = require('./habit.js')

class HabitManager {
  constructor() {
    this.habits = new Map()
  }

  createHabit(habitId, name, options = {}) {
    if (!habitId || typeof habitId !== 'string') {
      throw new Error('Habit ID must be a non-empty string.')
    }

    if (!name || typeof name !== 'string') {
      throw new Error('Habit name must be a non-empty string.')
    }

    if (this.habits.has(habitId)) {
      throw new Error(`Habit with ID '${habitId}' already exists.`)
    }

    const habit = new Habit(habitId, name, options)
    this.habits.set(habitId, habit)
    return habit
  }

  addCompletion(habitId, date = new Date()) {
    const habit = this._getHabitOrThrow(habitId)
    return habit.addCompletion(date)
  }

  removeCompletion(habitId, date) {
    const habit = this._getHabitOrThrow(habitId)

    if (!date) {
      throw new Error('Date is required to remove a completion.')
    }

    return habit.removeCompletion(date)
  }

  getHabit(habitId) {
    return this.habits.get(habitId)
  }

  getAllHabits() {
    return Array.from(this.habits.values())
  }

  deleteHabit(habitId) {
    return (!this.habits.delete(habitId))
  }

  _getHabitOrThrow(habitId) {
    if (!habitId || typeof habitId !== 'string') {
      throw new Error('Habit ID must be a non-empty string.')
    }

    const habit = this.habits.get(habitId)
    if (!habit) {
      throw new Error(`Habit with ID '${habitId}' not found.`)
    }

    return habit
  }
}

module.exports = HabitManager