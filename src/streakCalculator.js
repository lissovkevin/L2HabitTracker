class StreakCalculator {
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