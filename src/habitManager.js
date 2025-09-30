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