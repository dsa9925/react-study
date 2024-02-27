// math.ts
function add(a: number, b: number): number {
  return a + b;
}
const PI: number = 3.14;
const divide: Function = (): void => {};
class Person {}
interface AI {}
type Info = {};

export { add, PI, divide, Person, AI, Info };

// app.ts
import { add, PI, divide, Person, AI, Info } from "./math";
