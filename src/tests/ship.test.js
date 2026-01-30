import { testFunction } from './index.js';

test('test should work', () => {
    const result = testFunction('hi');
    expect(result).toBe('hi');
})