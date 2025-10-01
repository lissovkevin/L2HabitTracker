//Test Application for Habit Tracker Module
const habitManager = require('../src/index.js')

console.log('Testing App for the Habit Tracker Module\n')

// Test tracking
let totalTests = 0
let passedTests = 0

function runTest(testId, description, testFunction) {
  totalTests++
  console.log(`[${testId}] Testing: ${description}`)

  try {
    const result = testFunction()
    if (result.success) {
      console.log(`✅ PASS - ${result.message}`)
      passedTests++
    } else {
      console.log(`❌ FAIL - ${result.message}`)
    }
  } catch (error) {
    console.log(`❌ ERROR - ${error.message}`)
  }
  console.log('---')
}


// Test 1
console.log('1. Creating habits...')
const exerciseHabit = habitManager.createHabit('exercise', 'Daily Exercise')
const readingHabit = habitManager.createHabit('reading', 'Daily Reading', {
  allowMissedDays: true,
  maxMissedDays: 2
})
console.log(`✓ Created: ${exerciseHabit.name}`)
console.log(`✓ Created: ${readingHabit.name} (allows 2 missed days)`)

// Test 2
console.log('\n2. Adding completions...')
const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)

habitManager.addCompletion('exercise', today)
habitManager.addCompletion('exercise', yesterday)
habitManager.addCompletion('reading', today)
console.log('✓ Added completions for exercise and reading')

// Test 3
console.log('\n3. Checking completions...')
const exerciseCompletions = habitManager.getHabit('exercise').getCompletions()
const readingCompletions = habitManager.getHabit('reading').getCompletions()
console.log(`Exercise completions: ${exerciseCompletions.length}`)
console.log(`Reading completions: ${readingCompletions.length}`)

// Test 4
console.log('\n4. Calculating streaks...')
const exerciseStreak = habitManager.getCurrentStreak('exercise')
const readingStreak = habitManager.getCurrentStreak('reading')
console.log(`Exercise current streak: ${exerciseStreak} days`)
console.log(`Reading current streak: ${readingStreak} days`)

// Test 5
console.log('\n5. Testing removal...')
const removed = habitManager.removeCompletion('exercise', yesterday)
console.log(`Removal successful: ${removed}`)
const newCount = habitManager.getHabit('exercise').getCompletions().length
console.log(`Exercise completions after removal: ${newCount}`)

// Test 6
console.log('\n6. All habits summary:')
const allHabits = habitManager.getAllHabits()
allHabits.forEach(habit => {
  const streak = habitManager.getCurrentStreak(habit.id)
  const broken = habitManager.isStreakBroken(habit.id)
  console.log(`- ${habit.name}: ${streak} day streak (broken: ${broken})`)
})

console.log('\nTest completed.')
