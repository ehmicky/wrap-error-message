import { expectType, expectAssignable } from 'tsd'
import wrapErrorMessage from 'wrap-error-message'

const error = new Error('test')
expectAssignable<Error>(wrapErrorMessage(error, ''))
wrapErrorMessage(error, '')

// @ts-expect-error
wrapErrorMessage(error)
// @ts-expect-error
wrapErrorMessage(error, true)
// @ts-expect-error
wrapErrorMessage(error, '', true)

expectAssignable<Error>(wrapErrorMessage(null, ''))
expectType<true>(wrapErrorMessage(error as Error & { prop: true }, '').prop)
