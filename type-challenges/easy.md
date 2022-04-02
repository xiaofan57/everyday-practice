## Pick

- see [@github](https://github.com/type-challenges/type-challenges/blob/master/questions/4-easy-pick/README.md)
- e.g. & solution

  ```typescript
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

  // --- resolve ---

  type MyPick_1<T, K extends keyof T> = {
    [P in K]: T[P]
  }

  type MyPick_2<T, K> = {
    [P in keyof T as P extends K ? P : never]: T[P]
  }
  ```

---

## TupleToObject

- see [@github](https://github.com/type-challenges/type-challenges/blob/master/questions/11-easy-tuple-to-object/README.md)
- e.g. & solution

  ```typescript
  const tuple = ["tesla", "model 3", "model X", "model Y"] as const

  type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

  // --- resolve ---

  type TupleToObject<T extends readonly string[]> = { [P in T[number]]: P }
  ```

---

## First of Array

- see [@github](https://github.com/type-challenges/type-challenges/blob/master/questions/14-easy-first/README.md)
- e.g. & solution

  ```typescript
  type arr1 = ["a", "b", "c"]
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3

  // --- resolve ---

  type First_1<T extends any[]> = T extends [] ? never : T[0]

  type First_2<T extends any[]> = T extends [infer F, ...unknown[]] ? F : never
  ```

## Length of Tuple

- see [@github](https://github.com/type-challenges/type-challenges/blob/master/questions/18-easy-tuple-length/README.md)

- e.g. & solution

  ```typescript
  type tesla = ["tesla", "model 3", "model X", "model Y"]
  type spaceX = [
    "FALCON 9",
    "FALCON HEAVY",
    "DRAGON",
    "STARSHIP",
    "HUMAN SPACEFLIGHT"
  ]

  type teslaLength = Length<tesla> // expected 4
  type spaceXLength = Length<spaceX> // expected 5

  // --- resolve ---

  type Length_1<T extends any> = T extends readonly any[] ? T["length"] : never

  type Length_2<T extends readonly any[]> = T["length"]
  ```