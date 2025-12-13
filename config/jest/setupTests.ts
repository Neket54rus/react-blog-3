import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

if (global.TextEncoder === undefined) {
    global.TextEncoder = TextEncoder as never
}
if (global.TextDecoder === undefined) {
    global.TextDecoder = TextDecoder as never
}
