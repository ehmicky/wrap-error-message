import { expectType, expectAssignable, expectError } from 'tsd'

import wrapErrorMessage from 'wrap-error-message'

const error = new Error('test')
expectAssignable<Error>(wrapErrorMessage(error, ''))
wrapErrorMessage(error, '')

expectError(wrapErrorMessage(error))
expectError(wrapErrorMessage(error, true))
expectError(wrapErrorMessage(error, '', true))

expectAssignable<Error>(wrapErrorMessage(null, ''))
expectType<true>(wrapErrorMessage(error as Error & { prop: true }, '').prop)
