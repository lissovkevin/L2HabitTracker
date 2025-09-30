class StreakCalculator {
  static getCurrentStreak(completions) {
    if (!completions || completions.length === 0) {
      return 0
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let currentStreak = 0
    let currentDate = new Date(today)

    if (!this._hasCompletionOnDate(completions, today)) {
      currentDate.setDate(currentDate.getDate() - 1)
      if (!this._hasCompletionOnDate(completions, currentDate)) {
        return 0
      }
    }

    while (true) {
      if (this._hasCompletionOnDate(completions, currentDate)) {
        currentStreak++

      } else {
        break
      }

      currentDate.setDate(currentDate.getDate() - 1)

      if (currentStreak > 365) {
        break
      }
    }

    return currentStreak
  }









  static _hasCompletionOnDate(completions, targetDate) {
    return completions.some(completion => {
      const compDate = new Date(completion)
      compDate.setHours(0, 0, 0, 0)
      return compDate.getTime() === targetDate.getTime()
    })
  }

  static _daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000
    return Math.abs(Math.round(date1 - date2) / oneDay)
  }
}

module.exports = StreakCalculator