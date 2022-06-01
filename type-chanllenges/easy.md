<!-- TOC depthto:2 -->

- [Pick](#pick)
- [Tuple to Object](#tuple-to-object)
- [First of Array](#first-of-array)
- [Length of Tuple](#length-of-tuple)
- [Exclude](#exclude)
- [Concat](#concat)
- [Includes](#includes)

<!-- /TOC -->

## Pick

> `easy` `#union` `#build-in`

```typescript
/**
 * Implement the built-in `Pick<T, K>` generic without using it.
 * Constructs a type by picking the set of properties `K` from `T`
 * For example
 */
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}

/**
 *  resolve
 */
type MyPick$1<T, K extends keyof T> = {
  [P in K]: T[P]
}

type MyPick$2<T, K> = {
  [P in keyof T as P extends K ? P : never]: T[P]
}
```

## Tuple to Object

> `easy`

```typescript
/**
 * Give an array, transform into an object type and the key/value must in the given array.
 * For example
 */
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
type result = TupleToObject<typeof tuple>

/**
 * resolve
 */
type TupleToObject<T extends readonly string[]> = {
  [P in T[number]]: P
}
```

## First of Array

> `easy` `#array`

```typescript
/**
 * Implement a generic `First<T>` that takes an Array `T` and returns it's first element's type.
 * For example
 */

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3

/**
 * resolve
 */
type First$1<T extends any[]> = T extends [] ? never : T[0]
type First$2<T> = T extends [infer U, ...unknown[]] ? U : never
```

## Length of Tuple

> `easy` `#tuple`

```typescript
/**
 * For given a tuple, you need create a generic Length, pick the length of the tuple
 * For example
 */
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5

/**
 * resolve
 */
type Length$1<T extends any> = T extends readonly any[] ? T['length'] : never
type Length$2<T extends readonly any[]> = T['length']
```

## Exclude

> `easy` `#built-in`

```typescript
/**
 * Implement the built-in `Exclude<T, U>`
 * Exclude from `T` those types that are assignable to `U`
 */

/**
 * resolve
 */
type MyExclude<T, U> = T extends U ? never : T
```

## Concat

> `easy` `#array`

```typescript
/**
 * Implement the JavaScript `Array.concat` function in the type
 * system. A type takes the two arguments. The output should be a *new array that includes inputs in ltr order
 * For example
 */
type Result = Concat<[1], [2]> // expected to be [1, 2]

/**
 * resolve
 */
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```

## Includes

> `easy` `#array`

```typescript
/**
 * Implement the JavaScript `Array.includes` function in the type system.
 * A type takes the two arguments. The output should be a boolean `true` or `false`.
 * For example
 */
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`

/**
 * resolve
 */

// we know
type $1 = 1 extends 1 ? true : false // expect true
type $2 = 1 extends 2 ? true : false // expect false

type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? MyEqual<F, U> extends true
    ? true
    : Includes<R, U>
  : false
```
