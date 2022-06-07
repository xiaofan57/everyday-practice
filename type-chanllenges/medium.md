<!-- TOC -->

  - [Omit](#omit)
  - [Get Return Type](#get-return-type)
  - [Readonly](#readonly)
    - [Readonly2](#readonly2)
    - [Deep Readonly](#deep-readonly)
  - [Tuple to Union](#tuple-to-union)
    - [Tuple to Nested Object](#tuple-to-nested-object)

<!-- /TOC -->

## Omit

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

## Get Return Type

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

## Readonly

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

## Tuple to Union

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
