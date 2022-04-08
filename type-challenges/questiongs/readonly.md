# Readonly

- [Readonly | github]()
- [Readonly 2 | github](https://github.com/type-challenges/type-challenges/blob/master/questions/8-medium-readonly-2/README.md)
- [Deep Readonly | github](https://github.com/type-challenges/type-challenges/blob/master/questions/9-medium-deep-readonly/README.md)

- e.g. & solution

  ```typescript
  type MyReadonly<T> = {
    readonly [P in keyof T] = T[P]
  }

  type MyReadonly2<T, K extends keyof T = keyof T> = {
    readonly [P in keyof T as P extends K ? P : never]: T[P]
  } & Omit<T, K>

  type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends Record<string, unknown> ? DeepReadonly<T[P]> : T[P]
  }
  ```
