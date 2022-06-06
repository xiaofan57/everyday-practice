<!-- TOC -->

- [Omit](#omit)
- [Get Return Type](#get-return-type)

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
