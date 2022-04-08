---
difficulty: 'medium'
slugs: ['#infer', '#built-in']
---

# Get Return Type

- [github](https://github.com/type-challenges/type-challenges/blob/master/questions/2-medium-return-type/README.md)

- e.g. & solution

  ```typescript
  const fn = (v: boolean) => {
    if (v) return 1
    else return 2
  }

  type a = MyReturnType<typeof fn> // should be "1 | 2"

  // --- resolve ---
  type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R
    ? R
    : never
  ```
