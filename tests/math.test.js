const tipUtil = require('../src/math')

test('initial', () => {
    
})

test('testing tip tool', () => {
    const tip = tipUtil.calcTip(10, .3);
    expect(tip).toBe(3)
})