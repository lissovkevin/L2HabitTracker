class StreakCalculator {
  static getCurrentStreak(completions, allowMissedDays = false, maxMissedDays = 0) {
    if (this._hasNoCompletions(completions)) {
      return 0
    }

    const today = this._getTodayNormalized()

    if (this._streakNotStarted(completions, today)) {
      return 0
    }

    return this._calculateStreakLength(completions, today, allowMissedDays, maxMissedDays)
  }

  static _hasNoCompletions(completions) {
    return !completions || completions.length === 0
  }

  static _getTodayNormalized() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
  }

  static _streakNotStarted(completions, today) {
    if (this._hasCompletionOnDate(completions, today)) {
      return false
    }

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    return !this._hasCompletionOnDate(completions, yesterday)
  }

  static _calculateStreakLength(completions, today, allowMissedDays, maxMissedDays) {
    let currentStreak = 0
    let currentDate = new Date(today)
    let missedDaysCount = 0

    if (!this._hasCompletionOnDate(completions, today)) {
      currentDate.setDate(currentDate.getDate() - 1)
    }

    while (this._shouldContinueCounting(currentStreak)) {
      if (this._hasCompletionOnDate(completions, currentDate)) {
        currentStreak++
        missedDaysCount = 0
      } else {
        if (this._canSkipMissedDay(allowMissedDays, missedDaysCount, maxMissedDays)) {
          missedDaysCount++
        } else {
          break
        }
      }

      currentDate.setDate(currentDate.getDate() - 1)
    }

    return currentStreak
  }

  static _shouldContinueCounting(currentStreak) {
    const MAX_REASONABLE_STREAK = 365
    return currentStreak <= MAX_REASONABLE_STREAK
  }

  static _canSkipMissedDay(allowMissedDays, missedDaysCount, maxMissedDays) {
    return allowMissedDays && missedDaysCount < maxMissedDays
  }

  static isStreakBroken(completions, allowMissedDays = false, maxMissedDays = 0) {
    if (this._hasNoCompletions(completions)) {
      return true
    }

    const today = this._getTodayNormalized()

    if (this._hasCompletionOnDate(completions, today)) {
      return false
    }

    return !this._hasValidRecentCompletion(completions, today, allowMissedDays, maxMissedDays)
  }

  static _hasValidRecentCompletion(completions, today, allowMissedDays, maxMissedDays) {
    const yesterday = this._getYesterday(today)

    if (this._hasCompletionOnDate(completions, yesterday)) {
      return true
    }

    if (!allowMissedDays) {
      return false
    }

    const daysSinceLastCompletion = this._getDaysSinceLastCompletion(completions, today)
    return daysSinceLastCompletion <= (maxMissedDays + 1)
  }

  static _getYesterday(today) {
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday
  }

  static _getDaysSinceLastCompletion(completions, today) {
    const sortedCompletions = [...completions].sort((a, b) => a - b)
    const lastCompletion = sortedCompletions[sortedCompletions.length - 1]
    return this._daysBetween(today, lastCompletion)
  } static _hasCompletionOnDate(completions, targetDate) {
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

export default StreakCalculator