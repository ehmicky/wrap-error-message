import normalizeException from 'normalize-exception'
import setErrorMessage from 'set-error-message'

// Wrap an error with a message
export default function wrapErrorMessage(error, newMessage, oldMessage) {
  if (typeof newMessage !== 'string') {
    throw new TypeError(
      `Second argument must be a message string: ${newMessage}`,
    )
  }

  const errorA = normalizeException(error)
  const message = getMessage(newMessage, errorA.message)
  return setErrorMessage(errorA, message, oldMessage)
}

// By default, `newMessage` is appended
//  - This is because the current message is usually the innermost one,
//    i.e. the most relevant one which should be read first by users
//  - However, one can opt-in to being prepended instead by ending with `:`,
//    optionally followed by a newline
// Each error message is on its own line, for clarity.
// Empty messages are ignored
//  - This is useful when wrapping an error properties, but not message
const getMessage = function (rawNewMessage, rawCurrentMessage) {
  const newMessage = rawNewMessage.trim()
  const currentMessage = rawCurrentMessage.trim()

  if (newMessage === '') {
    return currentMessage
  }

  if (currentMessage === '') {
    return newMessage
  }

  return concatMessages(newMessage, currentMessage, rawNewMessage)
}

const concatMessages = function (newMessage, currentMessage, rawNewMessage) {
  if (!newMessage.endsWith(PREPEND_CHAR)) {
    return `${currentMessage}\n${newMessage}`
  }

  return rawNewMessage.endsWith(PREPEND_NEWLINE_CHAR)
    ? `${newMessage}\n${currentMessage}`
    : `${newMessage} ${currentMessage}`
}

const PREPEND_CHAR = ':'
const PREPEND_NEWLINE_CHAR = '\n'
