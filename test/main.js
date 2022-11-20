import test from 'ava'
import { each } from 'test-each'
import wrapErrorMessage from 'wrap-error-message'

each([null, undefined], ({ title }, newMessage) => {
  test(`Validate arguments | ${title}`, (t) => {
    const error = new Error('one')
    t.throws(wrapErrorMessage.bind(undefined, error, newMessage))
  })
})

test('Normalize error', (t) => {
  t.is(wrapErrorMessage(null, 'two').message, 'null\ntwo')
})

each(
  [TypeError, Error],
  ['two:', 'two: '],
  ({ title }, ErrorClass, message) => {
    test(`Prepend new messages with colon | ${title}`, (t) => {
      t.is(wrapErrorMessage(new ErrorClass('one'), message).message, 'two: one')
    })
  },
)

each([TypeError, Error], ({ title }, ErrorClass) => {
  test(`Prepend new messages with colon and newline | ${title}`, (t) => {
    t.is(wrapErrorMessage(new ErrorClass('one'), 'two:\n').message, 'two:\none')
  })

  test(`Append new messages with newline but no colon | ${title}`, (t) => {
    t.is(wrapErrorMessage(new ErrorClass('one'), 'two\n').message, 'one\ntwo')
  })

  test(`Append new messages without colon | ${title}`, (t) => {
    t.is(wrapErrorMessage(new ErrorClass('one'), 'two').message, 'one\ntwo')
  })

  test(`Messages are trimmed | ${title}`, (t) => {
    t.is(wrapErrorMessage(new ErrorClass(' one '), ' two ').message, 'one\ntwo')
  })

  test(`Empty new messages are ignored | ${title}`, (t) => {
    t.is(wrapErrorMessage(new ErrorClass('one'), '').message, 'one')
  })

  test(`Empty current messages are ignored | ${title}`, (t) => {
    t.is(wrapErrorMessage(new ErrorClass(''), 'two').message, 'two')
  })

  test(`New messages are reflected in stack | ${title}`, (t) => {
    const { stack, message } = wrapErrorMessage(new ErrorClass('one'), 'two')
    t.true(stack.includes(message))
  })

  test(`New messages are reflected in stack even if stack is invalid | ${title}`, (t) => {
    const error = new ErrorClass('one')
    error.stack = ''
    const { stack, message } = wrapErrorMessage(error, 'two')
    t.true(stack.includes(message))
  })

  test(`Can pass old message | ${title}`, (t) => {
    const error = new ErrorClass('one')
    error.stack = error.stack.replace(
      `${ErrorClass.name}: one`,
      `${ErrorClass.name}: three`,
    )
    const { stack, message } = wrapErrorMessage(error, 'two', 'three')
    t.is(message, 'one\ntwo')
    t.true(stack.includes(message))
    t.false(stack.includes('three'))
  })
})
