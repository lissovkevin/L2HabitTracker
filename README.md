# Habit Tracker Module

A simple habit tracking module for JavaScript applications. Track daily habits, calculate streaks, and manage completions with support for missed days.

## Installation

```bash
git clone https://github.com/lissovkevin/L2HabitTracker.git
cd L2HabitTracker
npm install
```

## Quick Start

```javascript
const habitManager = require('./src/index.js')

// Create a habit
const habit = habitManager.createHabit('exercise', 'Daily Exercise')

// Add completion
habitManager.addCompletion('exercise', new Date())

// Check streak
const streak = habitManager.getCurrentStreak('exercise')
console.log(`Current streak: ${streak} days`)
```

## API Reference

### Main Methods

#### `createHabit(habitId, name, options)`

Creates a new habit.

```javascript
// Basic habit
const habit = habitManager.createHabit('exercise', 'Daily Exercise')

// With missed days allowed
const habit2 = habitManager.createHabit('reading', 'Daily Reading', {
  allowMissedDays: true,
  maxMissedDays: 2,
})
```

#### `addCompletion(habitId, date)`

Adds a completion for the specified date.

```javascript
habitManager.addCompletion('exercise', new Date()) // Today
habitManager.addCompletion('exercise', yesterday) // Specific date
```

#### `removeCompletion(habitId, date)`

Removes a completion.

```javascript
const removed = habitManager.removeCompletion('exercise', yesterday)
```

#### `getCurrentStreak(habitId)`

Returns current streak in days.

```javascript
const streak = habitManager.getCurrentStreak('exercise')
```

#### `isStreakBroken(habitId)`

Checks if streak is broken.

```javascript
const broken = habitManager.isStreakBroken('exercise')
```

#### `getAllHabits()`

Returns all habits.

```javascript
const habits = habitManager.getAllHabits()
```

## Complete Example

```javascript
const habitManager = require('./src/index.js')

// Create habits
habitManager.createHabit('exercise', 'Daily Exercise')
habitManager.createHabit('reading', 'Daily Reading', {
  allowMissedDays: true,
  maxMissedDays: 1,
})

// Add completions
const today = new Date()
habitManager.addCompletion('exercise', today)
habitManager.addCompletion('reading', today)

// Check progress
habitManager.getAllHabits().forEach((habit) => {
  const streak = habitManager.getCurrentStreak(habit.id)
  console.log(`${habit.name}: ${streak} day streak`)
})
```

## Testing

Run the test application:

```bash
npm run start
```

## Requirements

- Node.js (any recent version)
- No external dependencies

## License

MIT License

## Author

Kevin Lissov - 1DV610
