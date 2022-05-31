## Pick

> `easy` `#union` `#build-in`

### Q & A

```typescript
/**
 * Implement the built-in `Pick<T, K>` generic without using it.
 * Constructs a type by picking the set of properties `K` from `T`
 * For example:
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
type _Pick1<T, K extends keyof T> = {
  [P in K]: T[P]
}

type _Pick2<T, K> = {
  [P in keyof T as P extends K ? P : never]: T[P]
}
```

## Tuple to Object

> `easy`

### Q & A

```typescript
/**
 * Give an array, transform into an object type and the key/value must in the given array.
 * For example
 */
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple>

/**
 * resolve
 */
type TupleToObject 


```
