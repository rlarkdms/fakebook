# Fakebook
A facebook cloning project for practice and learn the basic CURD with RESTful API.  
I will add English description as soon.

# Skill stacks
* Node.js
* TypeScript
* Nest.js
* TypeORM
* PostgreSQL
* Docker

# To-Do
* Refer socar project for refactor this project.
* Refactor unexpected error.
* Learn about oop's fundamental concepts.

# How to use 
Run postgres on docker
```bash
$ sudo mkdir /db
$ docker run -d -p 5432:5432 -v /db:/var/lib/postgresql/data --restart unless-stopped -e POSTGRES_USER="fakebook" -e POSTGRES_PASSWORD="temppass" -e PGDATA=/var/lib/postgresql/data/pgdata --name fakebook postgres
```
Start nest server for local development environment.
```bash
$ yarn install # Only use first
$ npm run start:dev
```

# Object Oriented Programming with TypeScript
## Class
### Introduction
class 는 constructor(생성자) 함수를 가르키며, new 로 호출되어 instance 를 생성한다.  
class 선언문은 runtime 이전에 먼저 실행된다.

### Method
클래스 몸체에 정의할 수 있는 methods 는 다음과 같다.  
* constructor
* prototype method
* static method
#### Constructor
constructor 는 instance 를 생성하고 초기화 하기 위한 특수한 메서드다.    
constructor 는 생략 가능하지만 instance 및 instance property 를 초기화 하려면 생략하면 안된다.  
인수로 초기값을 전달하면 초기값은 constructor 에 전달된다.  
(ES)ECMAScript 사양에 따르면 Instance property 는 반드시 constructor 내부에서 정의해야 한다.  
```js
// ES6
class Person {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}
const me = new Person('andrew', 'korea');
console.log(me); // Person {name: "andrew", address: "korea"}
```
#### Prototype method
class 몸체에 정의한 method는 기본적으로 prototype method 가 된다.
```js
// ES6
class Person {
    constructor(name){
        this.name = name;
    }
    hi (){
        console.log(this.name);
    }
}
new Person("andrew").hi(); //andrew
```
#### Static method
static method 는 instance 를 생성하지 않아도 호출할 수 있는 Method 를 말한다.
```js
// ES5
// Contructor function
function Person(name) {
    this.name = name; // not used at static method
}
// Static method
Person.hi = function () {
    console.log("hi");
}
```
class에 binding 된 method가 된다.
#### Static method vs Prototype method
1. static method 는 클래스로 호출하고 prototype method는 인스턴스로 호출한다.
2. static method 는 instance property 를 참조할 수 없지만 prototype method 는 instance property 를 참조할 수 있다.
### 클래스의 Instance 생성 과정
New 연산자와 함께 class 를 호출하면 contructor 에 의해 빈 객체(instance) 가 생성된다.  
빈 객체는 this 에 binding 된다.  
constructor 내부의 코드가 실행되며 this 에 binding 되어있는 instance 를 초기화 한다.
#### this keyword
Object 는 state 를 나타내는 property 와 behavior 를 나타내는 method 를 하나의 논리적인 단위로 묶은 복합적인 자료구조다.  
동작을 나타내는 method는 자신이 속한 객체의 상태 즉 property 를 참조하고 변경할 수 있어야 한다 이때 자신이 속한 Object 를 식별자를 참조할 수 있어야 하는데 이때 this 를 사용한다.


### Property with access modifiers(속성 및 접근 제어자)
OOP가 적용된 언어에서는 Encapsulation 개념이 적용되어 있어 Access modifiers 를 통해 접근 가능한 범위를 설정할 수 있다.
* Public: 모든 members(properties, fields, methods, functions)의 기본 값이다. 아무런 제한이 없이 접근 가능하다.
* Private: 해당 members가 해당 class 내 에서만 접근 가능하다.
* Protected: private 와 비슷하지만 추가적으로 해당 members가 소속된 class를 상속받은 클래스에서 사용할 수 있다는 점이 다르다.

New 로 객체를 생성하지 않는다.(constructor가 없다.)
static method 는 클래스의 인스턴스 없이 호출이 가능하기에 보통 유틸리티 함수를 만드는데 사용된다.
### ES5 vs ES6
ES5
```js
var Person = (function(){
    //constructor
    function Person(name) {
        this.name = name;
    }
    //prototype method
    Person.prototype.sayHi = function() {
        console.log(this.name);
    }
    //static method
    Person.sayHello = function(){
        console.log("hello");
    }
    return Person;
}())
```
ES6
```js
class Person {
    constructor(name){
        this.name = name;
    }
    //prototype method
    sayHi() {
        console.log(this.name);
    }
    //static method
    static sayHello(){
        console.log("hello");
    }
}
```

---

# Nest.js Study note
* Nest.js 는 모듈의 집합이다.
* Nest.js 는 Single Responsibility Principle 에 의해 Controller, Provider(Service, Repository, Factory, Helper, etc...), Module 로 구성되어 있다. 기존 express 와 비교하면 비즈니스 로직을 provider(service)에 정의 하고 Controller 는 url과 연결시키는 역할만 한다.
* 기능별로 모듈을 생성한다.(E.g Users, Auth...) 
* 각 모듈을 root module(app.module.ts) 에 import 시켜주어야 한다.
* Callback 을 쓰는 궁극적인 이유는 함수간의 실행 순서를 잡아주는 것이다. 그렇기에 callback hell 을 해결하기 위해 promise or async/await 을 사용한다.
* passport 의 authentication method 는 passport-local 방식과 passport-jwt 방식 이 있다.
main.ts 는 Nest.js 의 Entry Point(EP) 이다. 

## Data Transfer Object(DTO) and Pipe
서버로 요청을 전달하거나 응답을 받을때는 규격화된 형식을 쓴다.  
매번 매개변수나 로직을 조작해서 수행하게 되면 별로 좋지 않으므로 해당 요청과 응답에 대한 형식을 클래스로 만들어 두면 Nest에서 자동으로 변환을 해준다.  
pipe는 이러한 일들을 가능하도록 만들어준다.  
pipe 들은 routing method(Controller)들이 호출되기 전에 그 인자와 반환값을 조작한다.
```text
JSON body request -> {class-transformer} -> Class Instance -> {class-validator} -> Controller  
```
그 과정에서 DTO 등의 유효성을 검사하고 변환작업을 수행한다.  

```ts
// dto/delete-memo.dto.ts
export class DeleteMemo {
  readonly userId: string;
  readonly email: string;
}

// memo.controller.ts
@Delete()
remove(@Body() deleteMemo: DeleteMemo){
  const {userId, email}=deleteMemo;
  return `memo deleted userid: ${userId}, email: ${email}`;
}

// main.ts
app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, //전달하는 요청 값중에 정의되지 않은 값이 있으면 error 발생. 
    transform: true // 객체를 자동으로 DTO 로 변경함.
}));

```

## Dependency Injection
Class 에 `@Injectable()` decorator 가 붙으면 의존성 주입의 대상이 된다.
각각의 구현된 기능들을 클래스로 분리해서 필요할 때 마다 주입해 사용할 수 있도록 하는 것.

Injectable 클래스를 컨트롤러에서 사용할 수 있게 하려면 해당 컨트롤러가 주입된 모듈 내 providers 배열 목록으로 전달해야한다.
```ts
//user.module.ts
@Module({
    providers: [ServiceA]
})
// user.service.ts
@Injectable()
export class UserService {
    constructor(
        private serviceA: ServiceA
    ){}
}
...
ServiceB():string
{
    return this.serviceA.funcA();
}
```

## Circular Dependency
Circular Dependency 는 각 모듈이 서로를 참조할 경우 발생하는 순환 참조 문제이다.
아래와 같이 해결이 가능하다.
```ts
// b.module.ts
forwardRef(()=> ModuleA);
// a.module.ts
forwardRef(()=> ModuleB);
// b.service.ts
@Inject(forwardRef(()=> ModuleA))
private readonly serviceA: ServiceA;
// a.service.ts
@Inject(forwardRef(()=> ModuleB))
private readonly serviceB: ServiceB;
```

## Security
추가 예정
CORS and CSRF Token



## References
* https://jongdai.tistory.com/67 (oop)
* https://yamoo9.gitbook.io/typescript/ (For learn typescript oop)
* https://hong-p.github.io/javascript/javascript-deepdive-ch25/ (for learn class !Important)
