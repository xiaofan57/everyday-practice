/**
 * Pick
 * @https://github.com/type-challenges/type-challenges/blob/master/questions/4-easy-pick/README.md
 * e.g.
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, "title" | "completed">

  const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
  }
**/

// standard implementation
type MyPick_1<T, K extends keyof T> = {
  [P in K]: T[P]
}

type MyPick_2<T, K> = {
  [P in keyof T as P extends K ? P : never]: T[P]
}
