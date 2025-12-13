import { classNames } from './class-names'

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('someClass')).toBe('someClass')
    })

    test('with additional class', () => {
        expect(
            classNames('someClass', {}, ['additionClass1', 'additionClass2']),
        ).toBe('someClass additionClass1 additionClass2')
    })

    test('with mods', () => {
        expect(classNames('someClass', { hovered: true })).toBe(
            'someClass hovered',
        )
    })

    test('with mods false', () => {
        expect(
            classNames('someClass', { hovered: true, scrolable: false }),
        ).toBe('someClass hovered')
    })

    test('with mods', () => {
        expect(
            classNames('someClass', { hovered: true, scrolable: undefined }),
        ).toBe('someClass hovered')
    })
})
