import { describe, expect, test } from 'vitest'
import { add } from './index'

describe('add function', () => {
  test('should add two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})
