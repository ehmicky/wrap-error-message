import wrapErrorMessage, { Options } from 'wrap-error-message'
import { expectType, expectAssignable } from 'tsd'

expectType<object>(wrapErrorMessage(true))

wrapErrorMessage(true, {})
expectAssignable<Options>({})
