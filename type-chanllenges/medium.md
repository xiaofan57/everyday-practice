<!-- TOC -->

  - [built-in](#built-in)
    - [Omit](#omit)
    - [Get Return Type](#get-return-type)
  - [readonly](#readonly)
    - [Readonly2](#readonly2)
    - [Deep Readonly](#deep-readonly)
    - [Mutable](#mutable)
  - [tuple](#tuple)
    - [Tuple to Union](#tuple-to-union)
    - [Tuple to Nested Object](#tuple-to-nested-object)
  - [Array](#array)
    - [Last of Array](#last-of-array)
    - [Pop](#pop)
    - [Shift](#shift)
    - [Flatten](#flatten)
    - [FlattenDepth](#flattendepth)
    - [IndexOf](#indexof)
    - [LastIndexOf](#lastindexof)
    - [AnyOf](#anyof)
    - [Unique](#unique)
    - [Join](#join)

<!-- /TOC -->

## built-in

### Omit

> `medium` `#union` `#built-in`

```typescript
/**
 * Implement the built-in `Omit<T, K>` generic without using it.
 * Constructs a type by picking all properties from `T` and then removing `K`
 * For example
 */
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}

/**
 * resolve
 */

type MyOmit$1<T, K> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

// type Exclude<T, U> = T extends U ? never : T
type MyOmit$2<T, K> = {
  [P in Exclude<keyof T, K>]: T[P]
}
```

### Get Return Type

> `medium` `#infer` `#built-in`

```typescript
/**
 * Implement the built-in ReturnType<T> generic without using it.
 * For example
 */
const fn = (v: boolean) => {
  if (v) return 1
  else return 2
}

type a = MyReturnType<typeof fn> // should be "1 | 2"

/**
 * resolve
 */

type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
```

## readonly

### Readonly2

> `medium` `#readonly` `#object-keys`

```typescript
/**
 * Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.
 * `K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.
 * For example
 */
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
}

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property
todo.completed = true // OK

/**
 * resolve
 */

type MyReadonly2$1<T, K extends keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}

type MyReadonly2$2<T, K extends keyof T> = Readonly<Pick<T, K>> & Omit<T, K>
```

### Deep Readonly

> TODO

### Mutable

> TODO

## tuple

### Tuple to Union

> `medium` `#infer` `#tuple` `#union`

```typescript
/**
 * Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.
 * For example
 */
type Arr = ['1', '2', '3']
type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'

/**
 * resolve
 */
type TupleToUnion$1<T extends readonly unknown[]> = T[number]

type TupleToUnion$2<T> = T extends [infer F, ...infer R] ? F | TupleToUnion<R> : never

type TupleToUnion$3<T> = T extends Array<infer R> ? R : never
```

### Tuple to Nested Object

> `medium` `#object`

```typescript
/**
 * Given a tuple type `T` that only contains string type, and a type `U`, build an object recursively.
 */
type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type

/**
 * resolve
 */
type TupleToNestedObject<T extends readonly unknown[], U> = T extends [infer F, ...infer R]
  ? {
      [P in F & string]: TupleToNestedObject<R, U>
    }
  : U
```

## Array

### Last of Array

> `medium` `#array`

```typescript
/**
 * Implement a generic Last<T> that takes an Array T and returns its last element.
 * For example
 */
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1

/**
 * resolve
 */
type Last<T extends readonly unknown[]> = T extends [...infer U, infer L] ? L : never
```

### Pop

> `medium` `#array`

```typescript
/**
 * Implement a generic `Pop<T>` that takes an Array `T` and returns an Array without it's last element.
 * For example
 */
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]

/**
 * resolve
 */
type Pop<T extends readonly unknown[]> = T extends [...infer U, infer L] ? U : never
```

### Shift

> pass

### Flatten

> `medium` `#array`

```typescript
/**
 * In this challenge, you would need to write a type that takes an array and emitted the flatten array type.
 * For example
 */
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]

/**
 * resolve
 */
type Flatten<T extends readonly unknown[]> = T extends [infer F, ...infer R]
  ? F extends readonly unknown[]
    ? [...Flatten<F>, ...Flatten<R>]
    : [F, ...Flatten<R>]
  : never
```

### FlattenDepth

> `medium` `#array`

```typescript
/**
 * Recursively flatten array up to depth times.
 * For example
 */
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1

/**
 * resolve
 */
```

### IndexOf

> `medium` `#array`

```typescript
/**
 * Implement the type version of `Array.indexOf`,
 * `indexOf<T, U>` takes an Array `T`, any `U` and returns the index of the first `U` in Array `T`.
 */
type Res = IndexOf<[1, 2, 3], 2> // expected to be 1
type Res1 = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3> // expected to be 2
type Res2 = IndexOf<[0, 0, 0], 2> // expected to be -1

/**
 * resolve
 */

type MyEqual<T, U> = (<T>() => T extends U ? 1 : 2) extends <U>() => U extends T ? 1 : 2
  ? true
  : false

type IndexOf<T extends readonly unknown[], U, K extends unknown[] = []> = T extends [
  infer F,
  ...infer R
]
  ? MyEqual<F, U> extends true
    ? K['length']
    : IndexOf<R, U, [...K, U]>
  : -1
```

### LastIndexOf

> `medium` `#array`

```typescript
/**
 * Implement the type version of `Array.lastIndexOf`,
 * `LastIndexOf<T, U>` takes an Array `T`, any `U` and returns the index of the last `U` in Array `T`
 * For example
 */
type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
type Res2 = LastIndexOf<[0, 0, 0], 2> // -1

/**
 * resolve
 */

type MyEqual<T, U> = (<T>() => T extends U ? 1 : 2) extends <U>() => U extends T ? 1 : 2
  ? true
  : false

type LastIndexOf<T extends readonly unknown[], U> = T extends [...infer F, infer R]
  ? MyEqual<U, R> extends true
    ? F['length']
    : LastIndexOf<F, U>
  : -1
```

### AnyOf

> `medium` `#array`

```typescript
/**
 * Implement Python liked `any` function in the type system.
 * A type takes the Array and returns `true` if any element of the Array is true.
 * If the Array is empty, return `false`.
 * For example
 */
type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.

/**
 * resolve
 */

// Python中的 `[]`、`{}` 是假值，这点与JavaScript不同
type FalsyUnit = 0 | false | '' | [] | Record<keyof any, never>

type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
  ? F extends FalsyUnit
    ? AnyOf<R>
    : true
  : false
```

### Unique

> `medium` `#array`

```typescript
/**
 * Implement the type version of `Lodash.uniq`,
 * Unique takes an Array `T`, returns the Array `T` without repeated values.
 */
type Res = Unique<[1, 1, 2, 2, 3, 3]> // expected to be [1, 2, 3]
type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]> // expected to be [1, 2, 3, 4, 5, 6, 7]
type Res2 = Unique<[1, 'a', 2, 'b', 2, 'a']> // expected to be [1, "a", 2, "b"]
type Res3 = Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]> // expected to be [string, number, 1, "a", 2, "b"]
type Res4 = Unique<[unknown, unknown, any, any, never, never]> // expected to be [unknown, any, never]

/**
 * resolve
 */

type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

type MyIncludes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? MyEqual<F, U> extends true
    ? true
    : MyIncludes<R, U>
  : false

type Unique<T extends readonly unknown[], U extends unknown[] = []> = T extends [
  infer F,
  ...infer R
]
  ? MyIncludes<U, F> extends true
    ? Unique<R, U>
    : Unique<R, [...U, F]>
  : U
```

### Join

> `medium` `#array`

```typescript
/**
 * Implement the type version of `Array.join`,
 * `Join<T, U>` takes an Array `T`, string or number `U` and returns the Array `T` with `U` stitching up.
 */
type Res = Join<['a', 'p', 'p', 'l', 'e'], '-'> // expected to be 'a-p-p-l-e'
type Res1 = Join<['Hello', 'World'], ' '> // expected to be 'Hello World'
type Res2 = Join<['2', '2', '2'], 1> // expected to be '21212'
type Res3 = Join<['o'], 'u'> // expected to be 'o'

/**
 * resolve
 */
type Join<T extends readonly unknown[], U extends string | number> = T extends [infer F, ...infer R]
  ? `${F & string}${R['length'] extends 0 ? '' : U}${Join<R, U>}`
  : ''
```
