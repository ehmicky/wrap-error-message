import test from 'ava'
import wrapErrorMessage from 'wrap-error-message'

test('Dummy test', (t) => {
  t.true(wrapErrorMessage(true))
})
