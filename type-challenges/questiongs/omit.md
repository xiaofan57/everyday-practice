---
difficulty: 'medium'
slugs: ['#union', '#built-in']
---

# Omit

- [github](https://github.com/type-challenges/type-challenges/tree/master/questions/3-medium-omits)

- e.g. & solution

  ```typescript
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }

  // --- resolve ---

  type MyOmit<T, K extends string | number | symbol> = {
    [P in keyof T as T extends K ? never : P]: T[P]
  }

  type MyOmit2<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]: T[P]
  }
  ```
