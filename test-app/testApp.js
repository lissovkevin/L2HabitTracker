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

// T001
runTest('T001', 'Create basic habit', () => {
  const habit = habitManager.createHabit('exercise', 'Daily Exercise')
  return {
    success: habit.id === 'exercise' && habit.name === 'Daily Exercise',
    message: `Habit created with id='${habit.id}', name='${habit.name}'`
  }
})

// T002
runTest('T002', 'Create habit with options', () => {
  const habit = habitManager.createHabit('reading', 'Daily Reading', {
    allowMissedDays: true,
    maxMissedDays: 2
  })
  return {
    success: habit.allowMissedDays === true && habit.maxMissedDays === 2,
    message: `Options set correctly: allowMissedDays=${habit.allowMissedDays}, maxMissedDays=${habit.maxMissedDays}`
  }
})

// T003
runTest('T003', 'Prevent duplicate habits', () => {
  try {
    habitManager.createHabit('exercise', 'Duplicate Exercise')
    return { success: false, message: 'No error thrown for duplicate' }
  } catch (error) {
    return {
      success: error.message.includes('already exists'),
      message: `Correctly prevented duplicate: ${error.message}`
    }
  }
})

// T006
runTest('T006', 'Add completion for today', () => {
  const today = new Date()
  const result = habitManager.addCompletion('exercise', today)
  return {
    success: result === true,
    message: `Completion added for today: ${result}`
  }
})

// T007
runTest('T007', 'Add completion for yesterday', () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const result = habitManager.addCompletion('exercise', yesterday)
  return {
    success: result === true,
    message: `Completion added for yesterday: ${result}`
  }
})


if (passedTests === totalTests) {
  console.log('🎉 All tests passed! Module is working correctly.')
} else {
  console.log('⚠️  Some tests failed. Review implementation.')
}