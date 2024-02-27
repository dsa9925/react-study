# 타입스크립트 3

## 1. Type alias

- 타입을 알아볼수 있도록 이름(별명을) 정한다.
- const 변수처럼 만든다. (상수처럼)
- const 변수처럼 재정의가 안된다. (상수처럼)

```ts
const AGE = "20세기";
// 재정의는 오류가 발생
const AGE = "30세기";
```

- Type alias 는 특정한 타입을 설명하기 위한 용도로 작성.

```ts
// 보기 좋지 않은 예
const a: string = "홍길동";

type NickName = string;
const a: NickName = "홍길동";
```

- 타이핑을 줄여준다. (주 용도)

```ts
function Say(title:string | number | boolean | undefined | null){
}
const sample:string | number | boolean | undefined | null;

type All:string | number | boolean | undefined | null;

function Say(title:All){
}
const sample:All;
```

### 1.1. Type alias 와 interface 구별

- 2개의 문법적 요소가 개발 중에 선택의 고민

```ts
interface Person {
  nickName: string;
  age: number;
}
type TPerson = {
  nickName: string;
  age: number;
};
let p: Person;
let t: TPerson;
```

- Type alias 의 특징
  : 유니온(타입 | 타입 | 타입) 타입,
  : 인터셉션(타입 & 타입 & 타입) 타입 적용

  ```ts
  type User = {
    id: string;
    pass: string;
  };

  type Admin = {
    id: string;
    pass: string;
    level: number;
  };

  type Member = User | Admin;
  type Member = User & Admin;
  ```

  : type alias 에는 interface 를 사용할 수 있다.
  : 하지만 interface 에는 type 사용할 수 없다.

  ```ts
  interface Person {
    nickName: string;
    age: number;
  }
  type User = {
    isJoin: boolean;
  };

  type Login = Person & User;
  // 유니온에 의해서 아래처럼 타입의 모양이 결정된다.
  type Login = {
    nickName: string;
    age: number;
    isJoin: boolean;
  };
  ```

### 1.2. Type alias 유니온 와 interface 확장(상속)

- interface 확장(extends) 복습

```ts
interface Parent {
  firtName: string;
  asset: number;
}
interface Child extends Parent {}
// extends 확장(상속)에 의해 만들어진 결과
interface Child {
  firtName: string;
  asset: number;
}

let hong: Child;
hong.firstName = "hong";
hon.asset = 1000;
console.log(hong.firsName);
console.log(hong.asset);
```

- 추가 설명
  : 인터페이스는 여러번 작성하면 계속 ~~ 속성이 합쳐집니다.

```ts
interface User {
  firtName: string;
  asset: number;
}
interface User {
  level: number;
}
// 최종 User 결정 속성
interface User {
  firstName: string;
  asset: number;
  level: number;
}

let hong: User;
```

- type alias 확장

```ts
type User = {
  firtName: string;
  asset: number;
};
type Admin = {
  level: number;
};

let hong: User & Admin;
hong.firstName = "홍";
hong.asset = 1000;
hong.level = 100;
```

### 1.3. Type alias 는 제네릭, 유틸리티 타입, 맵드 타입과 사용

## 2. Enum

- 상수 집합
- 상수를 가독성 올림
- 대문자가 관례, 대문자\_대문자 : POINTA, POINT_A

```ts
enum Direction {
  UP, // 0
  DOWN, // 1
  RIGHT, // 2
  LEFT, // 3
}
console.log(Direction.UP);
console.log(Direction.DOWN);
console.log(Direction.RIGHT);
console.log(Direction.LEFT);
```

```ts
enum Direction {
  UP = 5, // 5
  DOWN, // 6
  RIGHT, // 7
  LEFT, // 8
}
console.log(Direction.UP);
console.log(Direction.DOWN);
console.log(Direction.RIGHT);
console.log(Direction.LEFT);
```

- 아래를 권장함.

```ts
enum Direction {
  UP = "up", // "up"
  DOWN = "down", // "down"
  RIGHT = "right", // "right"
  LEFT = "left", // "left"
}
console.log(Direction.UP);
console.log(Direction.DOWN);
console.log(Direction.RIGHT);
console.log(Direction.LEFT);
```

- 다음 코드를 좋지는 않은 거 같아요.

```ts
enum Direction {
  UP = "up", // "up"
  DOWN = 1, // ``
  RIGHT = up + down, // "up1"
  LEFT = "left".length, // 4
}
console.log(Direction.UP);
console.log(Direction.DOWN);
console.log(Direction.RIGHT);
console.log(Direction.LEFT);
```

- const enum (아주 중요합니다.)
  : const 를 붙여서 만드는 경우 (추천합니다)

  ```ts
  const enum Direction {
    UP = "up", // "up"
    DOWN = "down", // "down"
    RIGHT = "right", // "right"
    LEFT = "left", // "left"
  }
  console.log(Direction.UP);
  console.log(Direction.DOWN);
  console.log(Direction.RIGHT);
  console.log(Direction.LEFT);
  ```

## 3. Class

- 객체를 지향하는 코드의 기본 데이터 타입
- 객체 (속성 + 메소드) 로 구성

## 3.1. 클래스의 장점

- 아래 처럼 작성을 하면 참 힘들어 집니다.

```ts
const hong = {
  name: "홍길동",
  age: 10,
};

const park = {
  name: "황유민",
  age: 20,
};

const kim = {
  name: "김유민",
  age: 15,
};
```

- 위의 코드를 문법을 이용해서 편하게 생성함수 만들자
- 생성자 함수로 만들어진 객체를 인스턴스라고 합니다.

```js
// 객체 {} 를 생성하는 함수 : 생성자 함수 (Pascal)
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const jung = new Person("정호섭", 10);
const jung1 = new Person("김길동", 14);
const jung2 = new Person("박길동", 30);
const jung3 = new Person("둘리", 22);
```

- 조금 더 체계적으로 관리하는 문법을 지원

```js
class Person {}
const hong = new Person();
```

- 위의 코드에서 꼭 참고하면 좋겠어요.
- 아래 코드에서 객체 즉 인스턴스를 생성해 주는 생성자 함수 존재

```js
class Person {
  // 숨겨진 생성자 함수
  // 디폴트 인스턴스 생성자
  constructor() {}
}
const hong = new Person();
```

- 원하는 형태가 아닙니다.

```js
class Person {}
// 아래 코드는 오류가 납니다. paramert 를 받아주지 않습니다.
const hong = new Person("홍길동", 20);
```

- 추천은 가능하면 constructor 를 생성하시길 권장.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const hong = new Person("홍길동", 20);
```

## 3.2. 클래스 문법

- 속성과 메서드 정의
  : 예전 (생성자 함수)

  ```js
  function Persone(name, age) {
    // 속성만 정의
    this.name = name;
    this.age = age;
  }
  // 메서드 (객체에 소속된 함수)
  Persone.prototype.say = function () {
    console.log("안녕");
  };
  const hong = new Person("홍길동", 20);
  ```

  - 위의 코드를 class 로 변경

  ```js
  class Persone {
    // 생성자 작성
    constructor(name, age) {
      // 속성을 할당했다.
      this.name = name;
      this.age = age;
    }
    // 메소드 정의
    say() {
      console.log("안녕");
    }
  }

  const hong = new Person("홍길동", 20);
  ```

- 클래스 확장 (상속) extends
  : 클래스 데이터의 종류인데 속성(변수) + 메소드(함수)
  : 상속 보다는 확장으로 생각
  : 부모(super) 클래스 를 확장해서 자식(sub) 클래스를 생성한다.
  : 부모의 속성 및 기능을 자식이 내려받아서 활용한다.

  ```js
  class Person {
    // 생성자
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    // 메서드 (축약형)
    say() {
      console.log("안녕");
    }
  }
  // 프로게이머
  class Gamer {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    say() {
      console.log("안녕");
    }
  }
  // 가수
  class Singer {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    say() {
      console.log("안녕");
    }
  }
  ```

  : 확장을 적용한 형태로 변경

  ```js
  class Person {
    // 생성자
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    // 메서드 (축약형)
    say() {
      console.log("안녕");
    }
  }

  new human = new Person("홍길동", 20);
  human.say();
  // 아래 코드는 문제 발생 소지가 있다.
  // 여러분이 constructor 를 적었다.
  // 반드시 super() 를 호출
  // 프로게이머
  class Gamer extends Person {
    constructor(name, age) {
      // 부모의 생성자 실행
      super(name, age);
    }
    // 기본 속성, 메소드 외에 추가기능
    play() {
      console.log("게임을 잘해요")
    }
  }

  const faker = new Gamer("페이커", 30);
  faker.say();
  faker.play();

  // 가수
  class Singer extends Person {
    constructor(name, age) {
      // 부모의 생성자 실행
      super(name, age);
    }
    // 기본 속성, 메소드 외에 추가기능
    song() {
      console.log("노래를 잘해요")
    }
  }
  const iu = new Singer("아이유", 30);
  iu.say();
  iu.song();
  ```

- 타입스크립트 클래스 생성
  : 타입 정의

  ```ts
  class Persone {
    // 속성의 타입을 정의한다.
    name: string;
    age: number;

    // parameter 오류를 발생시킵니다.
    // 클래스의 생성자(constructor)는
    // 반환 타입을 명시하지 않습니다.
    constructor(name: string, age: number) {
      // 속성이 오류를 일으킵니다.
      this.name = name;
      this.age = age;
      // 절대로 함수라고 생각해서 return 하지 마세요.
      // return this;
    }
    // any 타입은 타입스크립트가 체크대상에서 제외
    // 리턴값 없는 경우 : void
    say(message: string): void {
      console.log(message + "하세요");
    }
    // 리턴값이 숫자인 경우 : number
    pay(money: number): number {
      return money;
    }
  }
  ```

- 접근제어자
  : 외부에 노출되어서 활용되는지 아닌지 결정
  : 클래스 내부 속성(변수)/ 내부 메서드(함수)
  : 종류는 3가지외에는 없다.
  : public (기본)
  : private (외부사용불가 js 만되는 # )
  : protected (상속한 자식 클래스만 가능)

  : public(기본) 예제
  : 접근제어자를 명시 안하면 public

  ```ts
  class Persone {
    public name: string;
    public age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    public say(message: string): void {
      console.log(message + "하세요");
    }
    public pay(money: number): number {
      return money;
    }
  }

  // 모든 속성, 메서드 public
  const faker: Persone = new Persone("페이커", 20);
  // 속성 접근 가능
  console.log(faker.age);
  console.log(faker.name);
  // 메서드(함수) 접근 가능
  const 비상금 = faker.pay(1000);
  faker.say("식사");
  ```

  : public(기본) 확장(상속)을 적용한 경우

  ```ts
  class Persone {
    public name: string;
    public age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    public say(message: string): void {
      console.log(message + "하세요");
    }
    public pay(money: number): number {
      return money;
    }
  }
  // 자식 클래스
  class Gamer extends Persone {
    constructor(name: string, age: number) {
      super(name, age);
    }
  }
  // 모든 속성, 메서드 public
  // const faker: Persone = new Person("페이커", 20);
  // const faker: Persone = new Gamer("페이커", 20);

  const faker: Gamer = new Gamer("페이커", 20);
  // 속성 접근 가능
  console.log(faker.age);
  console.log(faker.name);
  // 메서드(함수) 접근 가능
  const 비상금 = faker.pay(1000);
  faker.say("식사");
  ```

  : private 는 속성, 메서드 아예 접근불가 (상속도 포함)

  ```js
  class Persone {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    private say(message: string): void {
      console.log(message + "하세요");
    }
    private pay(money: number): number {
      return money;
    }
  }
  // const iu:Persone = new Persone("아이유", 20)
  // iu.age;
  // iu.name;

  // 자식 클래스
  class Gamer extends Persone {
    constructor(name: string, age: number) {
      super(name, age);
    }
  }

  // 모든 속성, 메서드 public
  // const faker: Persone = new Person("페이커", 20);
  // const faker: Persone = new Gamer("페이커", 20);

  const faker: Gamer = new Gamer("페이커", 20);
  // 속성 접근 가능
  console.log(faker.age);
  console.log(faker.name);
  // 메서드(함수) 접근 가능
  const 비상금 = faker.pay(1000);
  faker.say("식사");
  ```

  : protected 는 상속을 따진다.

  ```ts
  class Persone {
    protected name: string;
    protected age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    protected say(message: string): void {
      console.log(message + "하세요");
    }
    protected pay(money: number): number {
      return money;
    }
  }
  // protected 라서 직접 접근사용 못함
  // const iu:Persone = new Persone("아이유", 20)
  // iu.age;
  // iu.name;

  // 자식 클래스
  class Gamer extends Persone {
    public myName: string;
    public myAge: number;
    constructor(name: string, age: number) {
      super(name, age);
      this.myName = this.name;
      this.myAge = this.age;
    }
    public mySay(message: string) {
      this.say(message);
    }
    public myPay(money: number): number {
      return this.pay(돈);
    }
  }

  // 모든 속성, 메서드 public
  // const faker: Persone = new Person("페이커", 20);
  // const faker: Persone = new Gamer("페이커", 20);
  const faker: Gamer = new Gamer("페이커", 20);
  // 속성 접근 가능
  console.log(faker.myAge);
  console.log(faker.myName);
  // 메서드(함수) 접근 가능
  const 비상금 = faker.myPay(1000);
  faker.mySay("식사");
  ```

## 4. Generic <타입> : 제네릭

- 실시간 타입 정의하기
- 타입스크립트는 작성 중에 타입 결정
- 하지만, 실행중 타입을 다르게 정의해야 할 때 활용

### 4.1. 제네릭 이해하기

- 타입을 넘기고 타입을 사용한다.
- 실행하기 전까지는 타입이 정해지지 않았다.
- 오류를 발생시키지 않는 형태가 제네릭

```ts
function getMessage(msg: string | number | boolean): string | number | boolean {
  return msg;
}
const res: string | number | boolean = getMessage("안녕");
const no: string | number | boolean = getMessage(5000);
const isStatus: string | number | boolean = getMessage(true);
```

```ts
type MsgType = string | number | boolean | string[] | number[];
function getMessage(msg: MsgType): MsgType {
  return msg;
}
const res: MsgType = getMessage("안녕");
const no: MsgType = getMessage(5000);
const isStatus: MsgType = getMessage(true);
const isStrArray = getMessage(["a", "b", "c"]);
const isNumberArray = getMessage([1, 2, 3, 4, 5]);
```

### 4.2. 제네릭 모양

```ts
function getMessage<T>(msg: T): T {
  return msg;
}

const res = getMessage<string>("안녕");
// function getMessage(msg: string): string {
//   return msg;
// }

const resNum = getMessage<number>(123);
// function getMessage(msg: number): number {
//   return msg;
// }

const resStrArr = getMessage<string[]>(["a", "b", "c"]);
// function getMessage(msg: string[]): string[] {
//   return msg;
// }
```

### 4.3. 제네릭을 사용하는 이유

- 중복코드 제거
- 런타임시 타입의 지정
- 자유롭게 타입을 지정할 수 있다.

### 4.4. interface 에 제네릭 활용

```ts
// 제네릭을 사용하여 두 가지 타입의 값을 함께 저장하는 인터페이스 정의
interface Pair<T, U> {
  first: T;
  second: U;
}

// Pair 인터페이스 활용 예시
const pair1: Pair<number, string> = { first: 1, second: "two" };
// interface Pair {
//   first: number;
//   second: string;
// }

const pair2: Pair<string, boolean> = { first: "hello", second: true };
// interface Pair {
//   first: string;
//   second: boolean;
// }

console.log(pair1); // { first: 1, second: 'two' }
console.log(pair2); // { first: 'hello', second: true }
```

### 4.5. 제네릭에 제한 걸기

- 제네릭이 참 좋은 데 너무 자유롭다.
- 의도하지 않은 타입이 들어올 소지가 높다.
- 그래서 들어올 수 있는 타입을 지정 : 제네릭 제약해보자
- 개발자가 의도하지 않은 타입이 들어것을 막아보자
- extends 주의하자. : 확장(상속) 과는 상관이 없어요.

: extends 및 union 을 활용

```ts
interface Pair<T extends number | string> {
  first: T;
}

const pair1: Pair<number> = { first: 1 };
// interface Pair {
//   first: number;
// }
const pair2: Pair<string> = { first: "a" };
// interface Pair {
//   first: string;
// }

// 제약 조건에 의해 오류로 인식
const pair3: Pair<boolean> = { first: true };
// interface Pair {
//   first: boolean; // extends 타입이 아니어서 오류
// }
```

: keyof 를 활용한 제네릭 타입 제한

- key 는 속성명 (일반적으로 문자열)
- keyof 는 키명을 추출해서 유니온(|) 타입으로 변환

```ts
type Person = keyof {
  nickName: string;
  age: number;
};
// type Person = "nickName" | "age"
```

```ts
// 제네릭 생성
function showKey<T extends keyof { nickName: string; age: number }>(value: T) {
  console.log(value);
}
// function showKey<"nickName" | "age">(value: "nickName" | "age"): void

// nickName 이라는 문자열만 받겠다.
showKey("nickName");
// age 이라는 문자열만 받겠다.
showKey("age");

showKey(100); // 오류  "nickName" | "age"
showKey(true); // 오류 "nickName" | "age"
```

## 5. type assertion (타입 덮어쓰기)

- 타입 추론 을 우선시 한다.

```ts
// 에디터가 타입을 추론합니다. (우선시)
let age = 10;
// 추론에 의한 코드 결과를 추천합니다.
let age: number = 10;
```

- 타입 덮어쓰기는 타입 추론을 제거하고 개발자가 타입을 정한다.
- 조금씩 js 에서 ts 로 바꾸어 갈 때 활용한다.
- 타입 덮어쓰기에 활용한 키워드는 as 입니다.
- as 를 사용하면 vscode 가 타입 검사를 안합니다.

```ts
// 타입추론을 막고 타입을 강제로 지정(개발자)
let age = 10 as number;
```

- 아래 코드는 추론이 됩니다.

```ts
// 아래처럼 만약 진행시 Person 인터페이스와는 상관이 없다.
// 아래처럼 진행하면 새로운 타입이 추론이 되어서 만들어진다.
let hong = { nickName: "hong", age: 10 };
// 추론의 결과
// let hong: {
//   nickName: string;
//   age: number;
// } = { nickName: "hong", age: 10 };
```

- 아래 코드는 타입 추론에 의해서 오류

```ts
let hong = {}; // 객체 리터럴
// 타입 추론의 결과
// let hong: {}

// 아래 코드 오류
hong.nickName = "hong";
hong.age = 10;
```

- as 를 활용한 타입 선언

```ts
interface Person {
  nickName: string;
  age: number;
}
// let hong = {}; 객체 리터럴 타입 추론

// 개발자가 안내
let hong = {} as Person; // 타입 추론 제외
// 타이 추론의 결과
// let hong: Person

// 아래 코드 정상
hong.nickName = "hong";
hong.age = 10;
```

- as 의 다양한 케이스

```ts
// 타입추론에선 id 가 any 라고 판단하면서
// 정확하게 지정해 달라고 오류를 안내함.
// 리턴도 안내를 해줘야겠다.
function getId(id: any) {
  return id;
}
// 타입 추론의 결과는 any 가 설정
// const myId = getId("aaa") ;
// 개발자가 원하는 리턴 결과는 문자열이다.
const myId = getId("aaa") as string;
```

- 중첩 가능 (as 를 여러번 사용/거의없다)

```ts
const count = 10;
// const count:10 = 10;

let total = 10;
// let total: number = 10;

// as 는 타입 추론을 강제한다.
let value = 10 as any as number;
// let total: any = 10;
// let total: number = 10;
```

- 주의사항
  : 남용하지 마셔야 해요. (타입 추론이 우선!!!)
  : 호환되지 않는 타입으로는 불가합니다.

```ts
// 타입 오류발생
// as 가 강제할거야 라는 기대로 문자열 변경 시도
// 오류 발생
let value = 10 as string;
// 문자열로 변경시 아래를 써야 된다.
let str = value.toString();
```

- 참고 하면 좋을 내용.
  : null 이 아니다 지정(보장한다.)
  ```ts
  function showResult(data: string) {
    return data.length;
  }
  // ts 에서 체크 합니다.
  // js 에서는 통과
  showResult();
  ```
  : 해결시도 1
  ```ts
  function showResult(data: string | null) {
    if (data === null || data === undefined) {
      return;
    }
    return data.length;
  }
  ```
  : 해결시도 2 (! 문법)
  ```ts
  function showResult(data: string | null) {
    // if(data === null || data === undefined) {
    //   return;
    // }
    // 아래 처럼 null 이 아니라는 조건을 체크 한다.
    const result = data!.length;
    return result;
  }
  ```
- 결론은 타입 추론을 우선시하세요.

## 6. type guard (타입가드: 타입 범위 좁히기)

- 꼭 알아야 합니다.

### 6.1. 타입 가드 개념

- 여러 개의 타입이 지정된 경우 원하는 타입으로 좁히기
- 샘플

```ts
function userJoin(input: number | string | boolean) {
  // 타입가드 숫자(number)일 경우만 처리하겠다.
  if (typeof input === "number") {
    input.toFixed(2);
    return;
  }
  // 타입가드 문자열(number)일 경우만 처리하겠다.
  if (typeof input === "string") {
    input.charAt(0);
    return;
  }
}
```

### 6.2. 타입 가드 문법

- typeof (데이터 종류를 문자열로 확인 후 처리)
- instanceof (객체의 원본 종류를 확인 후 처리)
- in (객체의 속성명을 확인 후 처리)

### 6.3. typeof 연산자

```ts
typeof 10; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
typeof []; // "object"
typeof {}; // "object"
typeof function () {}; // "function"
```

```ts
function userJoin(input: number | string | boolean) {
  // 타입가드 숫자(number)일 경우만 처리하겠다.
  if (typeof input === "number") {
    input.toFixed(2);
    return;
  }
  // 타입가드 문자열(number)일 경우만 처리하겠다.
  if (typeof input === "string") {
    input.charAt(0);
    return;
  }
}
```

### 6.4. instanceof 연산자

- 대상이 프로토타입(prototype)에 소속되는지 확인
- true/false

```js
// 생성자 함수 : 객체(인스턴스) 생성
// 현재 js 문법이므로
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const user = new Person("홍길동", 20);
console.log(user instanceof Person); // true

const hong = {name:"홍길동", 20};
console.log(user instanceof Person); // false
```

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// 타입 가드를 적용해 보는 함수
function showInstance(data: string | Person) {
  // 타입 가드 Person 으로 만들어진 데이터일경우 처리
  if (data instanceof Person) {
    // 데이터 종류를 보고 처리한다.
    return;
  }
}
// 활용
const user = new Person("홍길동", 20);

showInstance("안녕");
showInstance(user);
```

### 6.5. in 연산자

- 객체의 속성명을 가지고 타입 가드 한다.
- 특정 속성명 존재여부 true/false

```ts
const person = {
  nickName: "홍길동",
  age: 20,
};
console.log("nickName" in person); // true
console.log("age" in person); // true
console.log("job" in person); // false
```

```ts
interface Person {
  nickName: string;
  age: number;
}
interface AI {
  nickName: string;
  gen: number;
}
// 어떤 인터페이스를 사용했는지에 따라서 타입 가드 적용
function isPerson(who: Person | AI) {
  // 타입 가드 역할 못함
  if ("nickName" in who) {
    // 공통적인 내용처리
  }
  //  타입 가드 역할 수행
  if ("age" in who) {
    // 공통적인 내용처리
  }
}
```

### 6.7. is 연산자를 이용한 타입가드 함수

- 함수의 리턴을 할때 리턴 타입에 대해서 가드 처리
- 주로 객체 유니언( | ) 타입 중 하나를 구분하는데 사용.

```ts
interface Person {
  nickName: string;
  age: number;
}
interface AI {
  nickName: string;
  gen: number;
}
// 어떤 인터페이스를 사용했는지에 따라서 타입 가드 적용
function isPerson(who: Person | AI): who is Person {
  return (who as Person).age !== undefined;
}
```

- is 연산자는 who 매개변수가 Person 타입인지 체크한다.
- Person 과 AI 타입의 값을 받고 Person 속성이 있는지 확인하고 속성이 있으면 Person 타입으로 인정

### 6.8. 만약 속성명으로 구분할 수 없을 경우 타입 가드

- in 으로 구분이 안된다.
- 이런 경우는 값으로 구분할 수 밖에 없다.

```js
interface Person {
  nickName: string;
  age: number;
  part: "사람";
}
interface AI {
  nickName: string;
  age: number;
  part: "인공지능";
}
// 만약 속성으로 구분이 어려운 경우
function isPerson(who: Person | AI) {
  if (who.part === "사람") {
    // 처리한다.
  }
}
```

## 7. Type Compatibility (타입 호환성)

- 서로 다른 타입이 호환(포함) 되지는를 의미한다.
- JS 라면 타입캐스팅(타입 업데이트);
- 호환이 안되는 경우
  ```ts
  let a: string = "go";
  let b: number = 10;
  // 타입 호환 안됨.
  a = b;
  // 타입 호환 안됨.
  b = a;
  ```
- 호환이 되는 경우
  ```ts
  let a: string = "go";
  let b: string = "hello";
  // 타입 호환됨.
  a = b;
  // 타입 호환됨.
  b = a;
  ```

### 7.1. Structual Typing 규칙(구조적 타입)

- 타입의 유형 보다는 실제로 담겨지는 데이터를 보고 호환을 결정.
- 타입 종류보다는 값의 종류를 보고 호환을 결정.

  ```ts
  type User = {
    name: string;
  };
  type Animal = {
    name: string;
  };
  let a: User = { name: "hong" };
  let b: Animal = { name: "댕댕이" };
  // 데이터 종류 말고 데이터 값의 구조가 같냐?
  // 같다면 호환이 된다.

  // 다른 목적을 가지고 생성된 타입일지라도 구조가 같으면
  // 호환
  a = b;
  b = a;
  ```

### 7.2. 호환이 가능한 조건

- 조건 1: 서로 타입명은 다르더라도 속성명이 동일하면 된다.
- 조건 2: 조건 1 만족 후 속성의 데이터 타입이 동일하면 된다.

  ```ts
  type User = {
    name: string;
  };
  type Animal = {
    name: string;
  };
  let a: User = { name: "hong" };
  let b: Animal = { name: "댕댕이" };

  a = b;
  b = a;
  ```

- 동일한 타입을 가진 속성이 1 개라도 있다면 호환 가능

  ```ts
  type User = {
    name: string;
  };
  type Animal = {
    name: string;
    skill: string;
  };
  let a: User = { name: "hong" };
  let b: Animal = { name: "댕댕이", skill: "애교" };

  // 동일한 타입을 가진 속성이 1 개라도 있다면 호환 가능
  a = b;
  ```

- b 는 타입상 skill: string 이 없어서 에러

  ```ts
  type User = {
    name: string;
  };
  type Animal = {
    name: string;
    skill: string;
  };
  let a: User = { name: "hong" };
  let b: Animal = { name: "댕댕이", skill: "애교" };

  // 예외적으로 아래처럼 진행이 되면 호환안됨.
  // b 는 타입상 skill: string 이 없어서 에러
  b = a;
  ```

- 타입 호환 오류가 발생시 처리가 필요하다면 아래처럼 진행
  : 속성명과 속성 타입을 똑같이 맞추면 된다.
  ```ts
  type User = {
    name: string;
    skill: string;
  };
  type Animal = {
    name: string;
    skill: string;
  };
  ```
  : 옵션(?) 을 속성에 준다. (필수조건에서 제외한 경우라서 조심)
  ```ts
  type User = {
    name: string;
  };
  type Animal = {
    name: string;
    // 옵션으로 해결
    skill?: string;
  };
  ```

### 7.2. 호환이 가능한 함수

- 함수도 구조가 중요함.
- 기존 함수를 유지하는 것이 좋다.
  ```ts
  let say = function (txt: string): string {
    return txt;
  };
  let hello = function (a: string): string {
    return a;
  };
  say = hello;
  hello = say;
  ```
- 주의 사항

  ```ts
  let say = function (txt: string): string {
    return txt;
  };
  let hello = function (a: string, b: string): string {
    return a + b;
  };

  // 에러가 발생한다.
  // 매개변수의 기준을 생각해보자.
  // 많으면 OK, 적으면 에러
  say = hello;

  hello = say;
  ```

### 7.3. 제네릭 타입의 호환

- 제네릭으로 받은 타입이 해당 타입 구조에서 사용되었는가가 중요.

  ```ts
  interface What<T> {}

  let a: What<string> = "";
  let b: What<number> = 5;
  // 호환이 된다.
  a = b;
  b = a;
  ```

  - 호환 안되는 경우

  ```ts
  interface What<T> {
    data: T;
  }
  let a: What<string> = { data: "" };
  // 만들어지는 인터페이스
  // interface What {
  // data: string;
  // }

  let b: What<number> = { data: 5 };
  // 만들어지는 인터페이스
  // interface What {
  // data: number;
  // }

  // 호환이 안된다.
  a = b;
  b = a;
  ```

## 8. 유틸리티 타입 (고급영역)

- 외부 또는 다른 개발자가 정의한 타입을 고치지 않고 활용
- 이미 만들어진 타입의 구조를 고치지 않고 재사용하기
- tsconfig.json 에서 셋팅을 해야 활용가능
- 유틸리티 기능들은 라이브러리가 제공
- TS 는 표준화된 JS + 앞으로 표준화가 될 문법도 지원
  : ESNext 설정 (최신 또는 비표준화도 활용)

  ```json
  "compilerOptions": {
    "lib": [
            "ESNext"
          ],
  }
  ```

### 8.1. Pick ( Pick Me ~~~ )

- 특정 타입의 속성을 뽑아서 새로운 타입을 만들어 낼 때 사용.
- 문법
  : Pick<대상 타입, '대상 타입의 속성 이름' | '대상 타입의 속성 이름'>

  ```ts
  interface Profile {
    id: string;
    address: string;
    name: string;
  }
  type Profiled = Pick<Profile, "id" | "name">;
  var hong: Profiled = {
    id: "hong",
    name: "홍길동",
  };
  ```

- 결과적으로 타입 별칭을 정의한 것과 같은 효과를 나타낸다.

## 2. Omit

- 특정 타입의 속성 중 원하지 않는 속성을 제외하고
- 나머지 속성으로 새로운 타입을 만들어 낼 때 사용.
- 문법
  : Omit<대상 타입, '대상 타입의 속성 이름' | '대상 타입의 속성 이름'>

```ts
interface Profile {
  id: string;
  address: string;
  name: string;
}
type Profiled = Omit<Profile, "address" | "name">;
var user: Profiled = {
  id: "hong",
};
```

- 결과적으로 타입 별칭을 정의한 것과 같은 효과를 나타낸다.

## 3. Partial

- 특정 타입의 모든 속성을 옵셔널 속성으로 변환한 새로운 타입을 만들어 낼 때 사용.
- 필수 속성이 아니도록 셋팅한다.
- 문법
  : Partial<대상 타입>

```ts
interface Profile {
  id: string;
  address: string;
  name: string;
}
type Profiled = Partial<Profile>;
// 만들어진 결과
type Profiled = {
  id?: string;
  address?: string;
  name?: string;
};

var user: Profiled = {
  id: "hong",
};
```

- 결과적으로 타입 별칭을 정의한 것과 같은 효과를 나타낸다.

## 4. Exclude

- 특정 타입의 유니언 타입을 구성하는 특정 타입을 제외한 새로운 타입을 만들어 낼 때 사용.
- Pick, Omit, Partial 타입이 모두 객체 타입의 형태를 변형하여 새로운 객체 타입을 만드는 반면
- Exclude 타입은 유니언 타입을 변형한다.
- 문법
  : Exclude<대상 타입, "제거할 타입 이름 1" | "제거할 타입 이름 2">

  ```ts
  type Languages = "C" | "Java" | "TypeScript" | "React" | "JavaScript";
  type TrueLanguages = Exclude<Languages, "React" | "JavaScript">;
  // 만들어진 결과
  // type TrueLanguages = "C" | "Java" | "TypeScript"
  ```

- 결과적으로 타입 별칭을 정의한 것과 같은 효과를 나타낸다.

## 5. Record

- 1. 특정 타입 1개를 속성의 key (속성명)으로 받고,
- 2. 다른 타입 1개를 value (값)으로 받아
- 3. 객체 타입으로 변환
- 실제 값을 변경하는 것이 아니라 타입만 map() API 처럼 변환해 줌.
- 문법
  : Record<객체 속성의 키명으로 사용할 타입, 객체 속성의 값으로 사용할 타입>
  : 첫번째 자리는 string, number, string 유니언, number 유니언 등
  : 두번째 자리는 아무 타입이나

  ```ts
  interface Profile {
    skill: string;
    age: number;
  }
  type Who = "a" | "b" | "c";
  type Heroes = Record<Who, Profile>;

  // 만들어지는 타입
  // type Heroes = {
  //   a: Profile;
  //   b: Profile;
  //   c: Profile;
  // }

  var members: Heroes = {
    a: { skill: "", age: 100 },
    b: { skill: "", age: 100 },
    c: { skill: "", age: 100 },
  };
  ```

- 결과적으로 타입 별칭을 정의한 것과 같은 효과를 나타낸다.

## 9. 맵드 타입

- 기존에 작성된 타입을 이용해서 새로운 타입을 만들때 문법
- 유틸리티 타입은 모두 다 맵드 타입으로 생성되었음.
  ```ts
  type FirstName = "kim" | "park" | "hong";
  // Maped 타입
  type Student = {
    [Name in FirstName]: string;
  };
  // 만들어진 결과
  // type Student = {
  //   kim: string;
  //   park: string;
  //   hong: string;
  // };
  ```
- keyof 는 특정한 타입의 키만 모아서 문자열 유니온 타입으로 변환
- 데이터 타입도 변경이 가능하다.

  ```ts
  interface MemberInfo {
    nickName: string;
    age: number;
  }
  // Maped Type
  // keyof 는 속성의 이름만 문자열로 가져옮
  type MemberType = {
    [H in keyof MemberInfo]: boolean;
  };

  // 생성된 결과
  // type MemberType = {
  //   nickName: boolean;
  //   age: boolean;
  // }
  ```

- 맵핑 수정
  : 속성값을 옵션(?) 또는 읽기 전용 속성 또는 일반 속성 등으로 변환
  : ? (옵션속성으로 변경)

  ```ts
  interface MemberInfo {
    nickName: string;
    age: number;
  }
  // Maped Type
  type MemberType = {
    [H in keyof MemberInfo]?: boolean;
  };

  // 생성된 결과
  // type MemberType = {
  //   nickName?: boolean | undefined;
  //   age?: boolean | undefined;
  // }
  ```

  : -? (옵션속성 제거)

  ```ts
  interface MemberInfo {
    nickName?: string;
    age?: number;
  }
  // Maped Type
  type MemberType = {
    [H in keyof MemberInfo]-?: boolean;
  };

  // 생성된 결과
  // type MemberType = {
  //   nickName: boolean;
  //   age: boolean;
  // }
  ```

## 10. Module 의 이해

- 모듈은 JS 또는 TS 작성된 파일이라고 보면 될거같다.
- 모듈은 기능(목적, 역할)으로 구분하는 게 관례
- 모듈은 작은 코드의 묶음을 통칭
- JS 는 태생적으로 전역 스코프로 관리됩니다.
  : 문제점 (문법 오류 또는 값이 변함-예측불가)

  ```txt
    gogo.js 파일

    let age = 10;
    ================
    show.js  파일

    let age = "20대";
    ===================
    run.js 파일

    let age = true;
  ```

### 10.1. JS 전역 스코프 문제 해결법

- Common.js 라이브러리
  : 웹브라우저, 서버, PC 에서 활용하는 모듈
  : Node.js

  ```js
  // math.js
  function add(a, b) {
    return a + b;
  }
  module.exports = { add };

  // app.js
  const math = require("./math.js");
  math.add(10, 20);
  ```

- Requier.js 라이브러리
  : AMD(Asynchronus Module Definition)
  : 비동기용 모듈 라이브러리
  : 비동기(필요할때 불러들여서 활용.)
  ```html
  <!-- index.html -->
  <srcript src="require.js" />
  <srcript>
    require(["http://~~~.js"], function(){
      console.log("실행하자")
    });
  </script>
  ```

### 10.2. JS 모듈

- import / export 문법
  : export 기본

  ```js
  // math.js
  function add(a, b) {
    return a + b;
  }
  export { add };

  // app.js
  import { add } from "./math.js";
  add(10, 20);
  ```

  : export default (하나만 설정)

  ```js
  // math.js
  function add(a, b) {
    return a + b;
  }
  export default add;

  // app.js
  import add from "./math.js";
  add(10, 20);
  ```

  : import as 활용

  ```js
  // math.js
  function add(a, b) {
    return a + b;
  }
  export { add };

  // app.js
  // as 는 alias : 별명을 짓는다.
  import { gogo as add } from "./math.js";

  // 본인의 코드로 add 를 함수를 만들면 충돌 발생
  function add(a) {
    return a * 100;
  }

  add(10, 20);
  gogo(200, 50);
  ```

  : import \* 경로 (export 가 너무 많은 경우)

  ```js
  // math.js
  function add(a, b) {
    return a + b;
  }
  function multi(a, b) {
    return a * b;
  }
  function divide(a, b) {
    return a / b;
  }
  function moduler(a, b) {
    return a % b;
  }
  export {add, multi, divide, moduler}

  // app.js
  // as 는 alias : 별명을 짓는다.
  import * from "./math.js"

  add(10, 20);
  multi(10, 20);
  divide(10, 20);
  moduler(10, 20);
  ```

  : export 샘플

  ```js
  // math.js
  function add(a, b) {
    return a + b;
  }
  const PI = 3.14;
  const divide = () => {};
  class Person {}
  export { add, PI, divide, Person };
  ```

- TS 모듈
  : tsconfig.json 셋팅

  ```json
  "compilerOptions": {
    "module": "commonjs",
    "allowJs": true
  }
  ```

  : 샘플코드

  ```ts
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
  ```

  ```ts
  // app.ts
  import { add, PI, divide, Person, AI, Info } from "./math";
  ```

  ```ts
  // app.ts
  import type { add, PI, divide, Person, AI, Info } from "./math";
  ```
