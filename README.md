# 타입스크립트 문법

- src / tsbasic.ts 파일 생성

## 1. 타입스크립트 정의

- 컴파일타임에 변수, 함수에 타입검사
- 런타임 오류 미리 방지 목적

## 2. 기본 데이터 타입

- 타입을 확인해 보는 법
  : typeof 변수명

### 2.1. 숫자형

```ts
// number 형
let age = 20;
age = "안녕"; // 타입추른으로 작성 중 오류 체크

let ageTs: number = 20;
ageTs = "안녕"; // 명시적으로 타입오류 체크
```

- 정수
  let num:number = 10;

- 실수
  let num:number = 1.0;

- 8진수
  let num:number = 0o12
  let num:number = 0O12

- 16진수
  let num:number = 0xAF
  let num:number = 0XAF

- 2진수
  let num:number = 0b1010
  let num:number = 0B1010

- 산술 연산자 : + - \* / %

- 비교 연산자 : == != < > <= =>

- 동치 연산자 : === !==

- 논리 연산자 : && || !

- 메서드
  : toString()
  : toFixed()
  : toExponential()
  : toPrecision()

- 예약어
  : NaN
  : Infinity - 양의 무한값
  : -Infinity - 음의 무한값

### 2.2. 문자열형

- 주의사항
  : String 대문자는 주의 (X)
  : string 타입은 소문자로

```ts
// string 형
let nickName = "홍길동";
nickName = "안녕"; // 타입추른으로 작성 중 오류 체크
console.log(typeof nickName);

let nickName: number = 20;
nickName = "안녕"; // 명시적으로 타입오류 체크
console.log(typeof nickName);

if (typeof nickName === "string") {
  // 실행 코드
}
```

- 템플릿 리터럴 (백틱)
  let hi:string = `Hello, ${변수명}`

- 메소드
  : toUpplerCase();
  : toLowerCase();

- 속성
  : 변수명.length

- 문자열 검색
  let index:number = nickName.indexOf("글자");
  let includes:boolean = nickName.includes("글자");

### 2.3. 불리언 형

```ts
// boolean 형
let nickName = true;
nickName = "True"; // 타입추른으로 작성 중 오류 체크
console.log(typeof nickName);

let nickName: boolean = true;
nickName = "안녕"; // 명시적으로 타입오류 체크
console.log(typeof nickName);

if (typeof nickName === "boolean") {
  // 실행 코드
}
```

- 주활용 용도
  : 조건문

  : 삼항연산자

  : 배열에 요소 타입
  const arr: boolean[] = [true, false, true, false]

  : 함수에 매개변수타입
  : 함수에 리턴타입
  function isLogin(value:boolean):boolean {
  return value;
  }

### 2.4. undefined 형

- 변수를 만들었는데 값을 대입안하고 마무리한 경우

let isLogin:undefined;

- 함수에 인자로 undefined 로 전달된 경우

```ts
function hi(nickName) {
  if (nickName === undefined) {
    // 처리 1
  } else {
    // 처리 2
  }
}

hi(); // undefined
hi("송이");

// 옵션 파라메터 ?
function hiTS(nickName?: string) {
  if (nickName === undefined) {
    // 처리 1 값을 입력안한경우\
    alert("이름을 입력하세요.");
  } else {
    // 처리 2
  }
}
hiTS(); // undefined
hiTS("송이");
```

- undefined 자체로 값 할당

```ts
let nickName;
if (nickName) {
} else {
}

let nickNameTS: string | undefined;
if (nickName) {
} else {
}
```

- 삼항연산자
- 반환값이 undefined 함수

```ts
function hi(id: number): number | undefined {
  if (user.id) {
    return uider.id;
  } else {
    return undefined;
  }
}
```

- null 과 undefined 비교;

```ts
const value: unknown = aaa;
if (value === null) {
  //
} else if (value === undefined) {
  //
} else {
}
```

### 2.5. null 형

- 의도적으로 값이 없음을 표현하는 경우

```ts
let nickName = null;

let nickNameTS: null = null;
```

- 빈문자열

```ts
let nickName: string | null = "";
nickName = "안녕";
nickName = null;
```

- 조건문

```ts
let nickName: string | null = "";
if (nickName === null) {
  //
} else {
  //
}
```

### 2.6. any 형

- 아무거나 담겠다.
- 일반 js 처럼 사용하겠다.
- 처음에 ts 를 할때 힘들면 any 사용
- 타입검사 안합니다.
- 사용하더라도 최소로만 사용.
- js 를 ts 로 마이그레이션 할때 활용도 높다.

```ts
let nickName: any = "";
nickName = 1;
nickName = [1, 2, 3];
```

## 3. 복합형

- 객체 : object, array, interface ...
- 기본형을 모아서 타입을 정의

### 3.1. Array

```ts
let student = ["김", "박", "이"];

let studentTS: Array<string> = ["김", "박", "이"];
// 아래를 추천
let studentTSBest: string[] = ["김", "박", "이"];
```

- 배열의 요소의 타입정의
  : 요소가 숫자로 된 배열
  let student:number[] = [1,2,3,4];

  : 요소가 글자로 된 배열
  let student:string[] = ['a', 'b', 'c']

  : 요소가 숫자도 되고 또는 글자도 되는 배열

  ```ts
  let student: (string | number)[] = [1, "a", 20, "hello"];
  ```

- 배열 속성
  : 배열.length

- 배열 메소드

  : 배열요소 추가
  배열.push(요소)

  : 배열요소 제거
  배열.pop()

  : 배열 요소 찾기
  배열.indexOf("요소값")

  : 배열 요소 필터링
  배열.filter( item => item.id === 1)

  : 배열 요소 맵핑
  배열.map( item => item.nickName.toUpperCase())

- 제네릭 배열

```ts
// 객체의 키이름과 키의 데이터 타입을 미리 정리
// 객체 구조를 설계한다.
// 데이터 타입으로 활용한다.
interface User {
  id: string;
  nickName: string;
  age: number;
}
// 비추천
let member2: User[] = [];

// 만약, interface 나 type 으로 정의된 배열은
// 가능하면 Array<타입> 추천
let member: Array<User> = [];
```

- 함수의 매개변수 / 리턴값의 타입으로 정의

  ```ts
  function showName(names: string[]): void {
    // 리턴이 없다.
  }
  function showName2(names: string[]): string[] {
    return names;
  }
  ```

### 3.2. 객체

- 아래처럼 할거면 하지마세요.(interface, type)
- object 는 소문자로 작성
- 가능하면 객체는 구체적으로 작성하여야 합니다.

```ts
let obj = { nickName: "홍길동", age: 20 };
let obj2: object = { nickName: "홍길동", age: 20 };
```

- 객체 타입을 interface 로 만들기

```ts
interface Person {
  nickName: string;
  age: number;
}
let who: Person = { nickName: "홍", age: 10 };
```

- 객체 타입을 type alias 로 만들기

```ts
// 타입은 const 변수 처럼 만들면 됩니다.
type Person = {
  nickName: string;
  age: number;
};
let who: Person = { nickName: "홍", age: 10 };
```

### 3.3. tuple 튜플

- 미리 배열의 요소 갯수와 요소 타입들을 선언한것.
- 한번 만들면 변경이 불가하다.

```ts
let student: (string | number | boolean)[] = ["hi", 230, false, 258];
// Tuple
let studentTuple: [string, number, boolean, number] = ["hi", 230, false, 258];
```

- tuple 의 요소에 접근 (인덱싱사용)
  studentTuple[0]
  studentTuple[1]
  studentTuple[2]
  studentTuple[3]

- tuple 디스트럭처링

```ts
const person: [string, number] = ["홍", 20];
// destructuring
const [nickName, age] = person;
console.log(nickName); // 홍
console.log(age); // 20
```

- tuple 인지 아닌지 체크하는 법

```ts
const person: [string, number] = ["홍", 20];
// destructuring
const [nickName, age] = person;
console.log(nickName); // 홍
console.log(age); // 20
// tuple 인지 아닌지 체크하는 법
const isTuple = Array.isArray(person) && person.length == 2;
```

### 3.4. union 유니온

- 여러 개의 타입 중에 골라서 적용한다.

```ts
// union 을 모르시는 경우
// 적당한 변수 타입을 계속 만들어가야 합니다.
let level: number = 5;
let levelStr: string = "";
levelStr = true;

// union 을 적용 경우
let lelvelUnion: number | string = 5;
lelvelUnion = "A";
```

```js
// union 을 모르시는 경우
// 적당한 함수 매개변수/리턴값 타입을 계속 만들어가야 합니다.
function showInfo(str: string): string {
  return str;
}
const res: string = showInfo("안녕");

function showInfoAge(str: number): number {
  return str;
}
const res2: number = showInfoAge(20);

// union 을 적용 경우
function showInfoUnion(str: string | number): string | number {
  return str;
}
const res3: string | number = showInfoUnion("안녕");
const res4: string | number = showInfoUnion(20);
```

- interface 를 활용한 union

```ts
interface Student {
  nickName: string;
  age: number;
}

interface Human {
  nickName: string;
  job: string;
}

function showInfo(what: Student | Human) {
  console.log(what);
}
// 문제가 발생합니다.
function showInfoAge(what: Student | Human) {
  if ("age" in what) {
    console.log(what.age);
  }
  if ("job" in what) {
    console.log(what.job);
  }
  // 공통적으로 작성되어있는 key
  console.log(what.nickName);
}
```

- type 를 활용한 union

```js
type Student = {
  nickName: string,
  age: number,
};

type Human = {
  nickName: string,
  job: string,
};

function showInfo(what: Student | Human) {
  console.log(what);
}
// 문제가 발생합니다.
function showInfoAge(what: Student | Human) {
  if ("age" in what) {
    console.log(what.age);
  }
  if ("job" in what) {
    console.log(what.job);
  }
  // 공통적으로 작성되어있는 key
  console.log(what.nickName);
}
```

```ts
type Student = {
  nickName: string;
  age: number;
};

type Human = {
  nickName: string;
  job: string;
};

type MultiType = Human | Student;

function showInfo(what: MultiType) {
  console.log(what);
}
// 문제가 발생합니다.
function showInfoAge(what: MultiType) {
  if ("age" in what) {
    console.log(what.age);
  }
  if ("job" in what) {
    console.log(what.job);
  }
  // 공통적으로 작성되어있는 key
  console.log(what.nickName);
}
```

### 3.5. intersection 인터섹션

- union 은 여러 개 중 하나라면
- intersection 은 여러 개를 합한다.
- 기호로는 & 를 사용합니다.
- 일반적으로 여러 개의 interface 를 하나로 합쳐서 사용.
- 일반적으로 여러 개의 type 을 하나로 합쳐서 사용.

```ts
type Student = {
  nickName: string;
  age: number;
};

type Human = {
  nickName: string;
  job: string;
};

type ISType = Student & Human;
const who: ISType = { nickName: "홍", age: 20, job: "학생" };
```

: !! Intersection 적용시 각 키명 중복 후 타입이 다르면 주의

## 4. 함수

- 함수의 parameter 타입/리턴 타입 명시
  : 반복 되는 코드 모음
  : 전달 받은 데이터 가공 후 리턴
  : 알고리즘 작성 후 리턴

- 함수에 활용하는 단어를 정리
  : 함수 정의

  ```js
  function 함수명(매개변수) {
    return 리턴값;
  }
  function 함수명(parameter) {
    return 리턴값;
  }
  ```

  : 함수 호출

  ```js
  함수명(인자);
  함수명(argument);
  ```

  ```ts
  function sayHi() {
    return undefined;
  }
  function sayHiTS(): undefined {
    return undefined;
  }
  function sayHiStr(text: string): string {
    return text;
  }
  ```

  - parameter 개수 보다 인자의 개수가 많으면?
  - 함수 정의 시 parameter 개수 === 호출시 인자 개수

    ```ts
    function sayHi(text) {
      return text;
    }
    sayHi("안녕");
    sayHi("안녕", "반가워");

    function sayHiTs(text: string): string {
      return text;
    }
    sayHiTs("안녕");
    sayHiTs("안녕", "반가워");
    ```

- parameter 개수 > 인자의 개수가 적다면?

  ```ts
  function sayHi(text, word) {
    return text;
  }
  sayHi("안녕");
  sayHi("안녕", "반가워");

  // 옵션 parameter 를 주면 된다.(?)
  function sayHiTs(text: string, word?: string): string {
    return text;
  }
  sayHiTs("안녕");
  sayHiTs("안녕", "반가워");
  ```

## 5. interface

- 객체의 기본 키와 키의 데이터 종류를 작성 후
- 재활용을 하면 코드량이 줄고 가독성 및 에러(작성중)를 쉽게 파악
- 대상이 객체입니다. 1 순위로 고민 { 키명: 키값}
- 객체의 타입을 정의할때 사용하는 문법
- 고민은 type 도 그렇더라, 회사의 기준을 준수하면 된다.
- 힌트 : ChatGPT ==> 객체를 타입스크립트 ===> interface
  : API 백엔드 연동은 interface 라고 정의하면 어떨까?

## 5.1. interface 정의하는 법

```ts
interface 대문자로시작하는인터페이스명 {
  키명1: 값의종류;
  키명2: 값의종류;
}
```

## 5.2. interface 사용하는 법

```ts
interface 대문자로시작하는인터페이스명 {
  키명1: 값의종류;
  키명2: 값의종류;
}
// 인터페이스 사용하기
const 변수명:인터페이스명 = {
  키명1: 값의종류;
  키명2: 값의종류;
}
```

## 5.3. interface 샘플

```ts
// 정의법
interface Student {
  id: number;
  nickName: string;
  speak(): void;
}
// 사용법
const gogo = () => {};
const who: Student = { id: 1, nickName: "hong", speak: gogo };
who.id;
who.nickName;
who.speak();
```

### 5.4. interface 를 활용

#### 5.4.1. 함수 parameter

- 왜 가능하냐면 객체가 함수의 parameter 전달 가능

```ts
// 인터페이스 정의
interface Student {
  id: number;
  nickName: string;
  speak(): void;
}

// 인터페이스를 parameter 로  전달받는 함수
function showItem(item: Student) {
  console.log(item);
}

// 인터페이스 활용
const gogo = () => {};
const who: Student = { id: 1, nickName: "hong", speak: gogo };

// 인터페이스에서 인자
showItem(who);
```

#### 5.4.2. 함수의 return 타입

- 함수의 반환타입을 inteface 로 하겠다.

```ts
interface Student {
  id: number;
  nickName: string;
  speak(): void;
}
function showItem(item: Student): Student {
  console.log(item);
  return item;
}

const gogo = () => {};
const who: Student = { id: 1, nickName: "hong", speak: gogo };
// 리턴을 받음
const st: Student = showItem(who);
```

#### 5.4.3. 간략한 기능 요약

- 인터페이스 함수만 만들어 보기

```ts
// 정수 1개를 입력받고 정수 1개를 리턴
interface Fn {
  // 화살표 함수로 즉시 생성도 가능
  (num: number): number;
}
const now: Fn = num => num;
```

- 오브젝트를 입력받고 void 리턴

```ts
interface Fn {
  (num: User): void;
}
const now: Fn = userIns => console.log(userIns);
```

- 입력 parameter 를 옵션으로 받는 경우

```ts
interface Fn {
  (num?: number): void;
}
const now: Fn = num => {
  if (num) {
    // 숫자..
  } else {
    // ...
  }
};
```

- 입력 parameter 가 여러 개인 경우

```ts
interface Fn {
  (num: number, str: string, bool: boolean): void;
}
const now: Fn = (num, str, bool) => {
  // console.log(num, str, bool)
};
```

- 리턴 타입이 Promise 이 인터페이스

```ts
interface Fn {
  (str: string, txt: string): Promise<string>;
}
const now: Fn = (str, txt) => {
  return Promise.resolve("리턴값");
};
```

#### 5.4.4. 인터페이스 옵션 ( ? )

- 인터페이스로 정의한 속성에서 선택해서 쓰겠다.
- 속성을 쓸수도 있고 안쓸 수도 있다.
- 아래는 원래 interface 라서 반드시 지켜야 한다.

```ts
interface Person {
  nickName: string;
  age: number;
}
const p: Persone = { nickName: "홍" }; // 오류
```

- 옵션을 적용한 경우

```ts
interface Person {
  nickName: string;
  age?: number;
}
const p: Persone = { nickName: "홍" }; // 정상 작동
```

#### 5.4.5. 인터페이스 확장(상속)

- 인터페이스는 extends 키워드를 사용할 수 있다.

```ts
interface Person {
  nickName: string;
  age: number;
}
// 타이핑 및 관리도 복잡
interface Hosop {
  nickName: string;
  age: number;
  job: string;
}
interface Choi extends Person {
  job: string;
}
/*  타입이 확장
interface Choi {
  nickName: string;
  age: number;
  job: string;
}
*/

const who: Choi = { job: "개발자", nickName: "미남", age: 20 };
```

- extends 주의 사항

```ts
interface Person {
  nickName: string;
  age: number;
}
// 타입의 종류가 다르면 안된다.
interface Choi extends Person {
  nickName: boolean; // 오류발생
  job: string;
}
```

#### 5.4.6. 인터페이스 인덱싱으로 타입만들기

- 인덱싱 : 배열에 있어요.

```ts
const arr: string[] = ["a", "b", "c"];
arr[0];
arr[1];
arr[2];
arr.map((item, index, _arr) => {
  console.log(index);
});
```

```ts
const user = {
  nickName: "hong",
  age: 20,
};
console.log(user.nickName);
console.log(user.age);

// 배열인덱싱 : 연관배열 으로 접근이 가능
console.log(user["nickName"]);
console.log(user["age"]);
```

- 배열 인덱싱 활용한 키 정의

```ts
interface INArr {
  // 아래의 키는 어떤 숫자든 속성에 이름이 될 수 있다.
  // 값은 문자열이다.
  [index: number]: string;
}
// 값의 타입은 지켜야 한다.
const now: InArr = ["홍", "박"];
console.log(now[0]);
console.log(now[1]);
```

```ts
interface INArr {
  // 아래의 키는 어떤 숫자든 속성에 이름이 될 수 있다.
  // 값은 문자열이다.
  [who: string]: number;
}
// 값의 타입은 지켜야 한다.
const now: InArr = {
  age: 1,
  level: 100,
};
console.log(now["age"]);
console.log(now["level"]);
```

#### 5.4.6. 인터페이스 인덱스 시그니처

- 속성명을 지정하지 않고, 속성의 타입, 속성의 값을 정의하는 문법
- 마음대로 추가(속성:값타입)가 가능하다.
- 속성이름과 개수 및 값 타입이 정해지지 않은 경우
