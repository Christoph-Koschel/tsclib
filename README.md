# TypeScript Core (tscr)

TypeScript Core (tscr) is a versatile library designed to enhance the development experience when working with
TypeScript projects. This comprehensive library offers essential functionalities that go beyond the standard ECMAScript,
providing developers with a robust set of tools. From streamlined methods for rounding numbers to managing sealed arrays
and maps, tscr covers a wide array of utilities. Additionally, it introduces LINQ-like features and an array of other
functions, filling the gaps in ECMAScript standardization.

## Installation

```bash
# Install with npm
npm install tscr
```

```bash
# Install with yarn
yarn add tscr
```

## NPM scripts

Compile the TypeScript code using both the `tsconfig.json` and `tsconfig.module.json` files.

```bash
npm run build
```

---

Runs the unit tests using AVA.

```bash
npm run test
```

---

Watches for changes in the TypeScript code and recompiles the code using `tsconfig.json`.

```bash
npm run watch:build
```

---

Watches for changes in the TypeScript code and re-runs the unit tests using AVA.

```bash
npm run watch:test
```

---

Generates an HTML report of the code coverage using NYC and opens the report in the browser.

```bash
npm run cov
```

---

Generates HTML documentation of the TypeScript code and opens the documentation in the browser.

```bash
npm run doc
```

## Contribution & Issues

If you do encounter any problems, please file an issue or submit a PR. Everyone is welcome and encouraged to contribute.

**If submitting a request to add a new module/functionality, please ensure you add the appropriate tests covering your
module. In the interests of stability, PRs without tests cannot be considered.**

### Folder Structure

- `src`: The source code of the library is organized under this directory.
    - `<module>`: Each module of the library is contained in its own subdirectory. It includes:
        - `index.ts`: This file serves as the main entry point for the module and exports all other files within the
          module.
    - `tests`: This directory contains test files for the module.
    - `ovw`: This directory contains overrides for built-in TypeScript types that need to be extended or modified see
      example below.
    - `index.ts`: The root source file and lib entry point. All modules are exported from this file.

### Example module

Let's take an example of a module named `example`

```typescript
// src/example/index.ts
export * from './MyClass.ts';
```

```typescript
// src/example/MyClass.ts

// Best way is to import the hole lib itself
import { isInt, NotAnIntegerError } from '../index';

export class MyClass {
    /**
     * Returns the sum of a and b.
     *
     * @param a - The left node.
     * @param b - The right node.
     * @throws {NotAnIntegerError} Throws an error if either a or b is not an integer.
     * @returns The sum of a and b.
     */
    public static sum(a: number, b: number): number {
        if (!isInt(a)) {
            throw new NotAnIntegerError(a);
        }
        if (!isInt(b)) {
            throw new NotAnIntegerError(b);
        }
        return a + b;
    }
}
```

```typescript
// src/tests/example.spec.ts
import test from 'ava';
import { MyClass } from '../index';


test("MyClass.sum returns correct values", (t) => {
    t.assert(MyClass.sum(1, 2) == 3);
});
```

If you want that your module is loaded automatically add the following line:
```typescript
// src/index.ts
export * from "./example";
```

Make sure to document your code so that TypeDoc can extract them and generate a documentation out of it.

### Building and Testing

Make sure to run tests and build the project before contributing. Use the following commands:

```shell
# Run tests
npm test

# Run coverage
npm run cov

# Build the project
npm run build
```

## Thanks

Thanks to all those who have [contributed](https://github.com/Christoph-Koschel/tscr/graphs/contributors) to the further
development of this library.
