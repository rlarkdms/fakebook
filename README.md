# Fakebook

<div>
<img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white"/>
<img src="https://img.shields.io/badge/KFC-F40027?style=flat-square&logo=kfc&logoColor=white"/>
</div>

A facebook cloning project for practice and learn the basic CURD with RESTful API.
A Object Oriented Programming with TypeScript and Nest.js study note section is study note for my own in this article

# How to use

Run postgres on docker

```bash
$ sudo mkdir /db 
$ yarn prisma migrate dev
$ docker-compose config && docker-compose up -d
```

Start nest server for local development environment.

```bash
$ yarn install # Only use first
$ npm run start:dev
```

# Object Oriented Programming with TypeScript

OOP 는 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 imperative programming 의 절차 지향적 관점에서 벗어나 여러 개의 독립적 단위, 즉 Object 의 집합으로 프로그램을 표현하려는
프로그래밍 패러다임을 말한다.  
OOP 는 실세계의 실체(사물이나 개념)를 인식적인 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다.  
실체는 특징이나 성질을 나타내는 attribute/property 를 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.  
속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 Object라고 한다.  
OOP 는 Object 의 status 를 나타내는 데이터와 status 데이터를 조작할 수 있는 behavior 를 하나의 논리적인 단위로 묶어 생각한다 따라서 **객체는 상태 데이터와 동작을 하나의 논리적인
단위로 묶은 복합적인 자료구조다.**

## Inheritance and prototype

Inheritance 는 OOP의 핵심 개념으로, 어떤 객체의 Property or method 를 다른 Object 가 상속받아 그대로 사용할 수 있는 것을 말한다.  
Javascript는 prototype 기반으로 상속을 구현하여 **불필요한 중복을 제거하여 메모리 낭비를 최소화 한다**. 중복을 제거하는 방법은 가존의 코드를 적극적으로 재사용하는 것이다.  
아래의 코드는 자신의 상태를 나타내는 radius property 만 개별적으로 소유하고 내용이 동일한 method 는 상속을 통해 공유하여 사용한다.

```js
// Bad code
function Circle(radius) {
    this.radius = radius;
    this.getArea = function () {
        return Math.PI = this.radius ** 2
    };
}

const circle0 = new Circle(1);
const circle1 = new Circle(1); // getArea method created again! (memory leak)

// Good Code
function Circle(radius) {
    this.radius = radius;
}

Circle.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
}
const circle0 = new Circle(1);
const circle2 = new Circle(2);
```

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
    private global_declare: string;

    constructor(name, address) {
        //member variable initial
        this.name = name;
        this.address = address;
        this.global_declare = "hi";
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
    constructor(name) {
        this.name = name;
    }

    hi() {
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
var Person = (function () {
    //constructor
    function Person(name) {
        this.name = name;
    }

    //prototype method
    Person.prototype.sayHi = function () {
        console.log(this.name);
    }
    //static method
    Person.sayHello = function () {
        console.log("hello");
    }
    return Person;
}())
```

ES6

```js
class Person {
    constructor(name) {
        this.name = name;
    }

    //prototype method
    sayHi() {
        console.log(this.name);
    }

    //static method
    static sayHello() {
        console.log("hello");
    }
}
```

---

# RDBMS with prisma Study note

Primary Key(PK): 각 row 의 정보를 식별할 수 있는 정보 e.g. id, xid 를 표현한다.  
Foreign Key(FK): 참조하는 테이블과 참조되는 테이블의 관계를 나타낸다.
e.g. 학생-수업 테이블은 학생 테이블과 수업 테이블의 관계를 1:N 관계로 나타내기 위한 테이블이므로 학생 테이블과 수업테이블을 참조하여야 한다.
여기서 학생코드(PK) 와 수업정보를 식별하는 수업코드(PK) 테이블이 구성되며,
이렇게 다른 테이블의 정보를 참조하기 위한 학생코드롸 수업코드는 학생 수업 테이블 내에서 FK 가 된다.

## Data source

어떤 DB 와 연결할 것인지 설정하는 부분.  
Prisma 에서 지원하는 DB(PostgreSQL, MySQL, SQLite) 와 연결할 수 있으며, 아래와 같이 작성한다.(yarn prisma init)

```text
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Generator

prisma client 명령어 사용시에 생성될 내용(prisma binary file)을 정의 하는 부분이다.
Cross platform 을 위해 사용되는 듯 하다.(I guess)  
아래와 같이 작성하면 prisma client 가 사용하게 될 binary file 을 사용중인 환경의 Operating System 에 맞춰 생성하게 된다.

```text
generator client {
  provider = "prisma-client-js"
}
```

## Data model definitions

> https://www.prisma.io/docs/concepts/components/prisma-schema/data-model

DB 에 대한 스키마를 정의하는 부분으로 model, attributes, enum 부분으로 나뉜다.  
model(table, entity(abstract), record(value)): 관계형 데이터베이스에서 table에 해당하고, 여러개의 fields 로 구성되어 있다.  
[attribute, field(column)](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#defining-attributes):
field 와 model 에 대한 함수(@id, @unique)   
enum: C에서 #define 매크로와 비슷하다.

```
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  user   User   @relation(fields: [userId], references: [id])
  userId Int
}

model Post {
  id         Int        @id @default(autoincrement())
  createdAt  DateTime   @default(now())
  title      String
  published  Boolean    @default(false)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  categories Category[] @relation(references: [id])
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[] @relation(references: [id])
}

enum Role {
  USER
  ADMIN
}
```

## Data model

> https://www.prisma.io/docs/concepts/components/prisma-schema/relations

model 간의 관계를 정의하기 위해 @relation attribute 를 정의해야한다

```text
model User {
  id      Int            @id @default(autoincrement())
  posts   Post[]
}
model Post {
  id         Int         @id @default(autoincrement())
  author     User        @relation(fields: [authorId], references: [id])
  authorId   Int         
}
```

author 와 posts field 는 두 model 간의 관계를 정의한 field column 값으로 db에는 드러나지 않는 prisma client 에서만 다루는 값이다.

### 1:1 relation

내일 직접 try 후에 정리하자(cross check)

---

# Nest.js Study note
* @Module()데코레이터는 Nest가 어플리케이션 구조를 구성하는데 사용하는 메타데이터를 제공한다.
* Nest.js 는 모듈의 집합이다.
* Nest.js 는 Single Responsibility Principle 에 의해 Controller, Provider(Service, Repository, Factory, Helper, etc...),
  Module 로 구성되어 있다. 기존 express 와 비교하면 비즈니스 로직을 provider(service)에 정의 하고 Controller 는 url과 연결시키는 역할만 한다.
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
remove(@Body()
deleteMemo: DeleteMemo
)
{
    const {userId, email} = deleteMemo;
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
    ) {
    }
}

...
ServiceB()
:
string
{
    return this.serviceA.funcA();
}
```

## Circular Dependency

Circular Dependency 는 각 모듈이 서로를 참조할 경우 발생하는 순환 참조 문제이다.
아래와 같이 해결이 가능하다.

```ts
// b.module.ts
forwardRef(() => ModuleA);
// a.module.ts
forwardRef(() => ModuleB);
// b.service.ts
@Inject(forwardRef(() => ModuleA))
private readonly
serviceA
:
ServiceA;
// a.service.ts
@Inject(forwardRef(() => ModuleB))
private readonly
serviceB
:
ServiceB;
```

## Module
Module 은 C 의 header 파일과 일부 유사하지만 다르다.
header 파일의 경우엔 
header 파일의 경우엔 header_A.h 파일 내에 다른 헤더 파일 header_B.h 을 불러오면 header_A.h 를 include 한 파일은 header_B 를 쓸수 있다.  
하지만 nest.js 는 module 이 controller 나 provider 에게 provider 를 직접 주입해주진 않고 불러올 모듈의 설정값을 넣어준다.   
즉, A module 의 import 에서 설정해준 B module 의 값은 A module 의 의존성을 가지고 있는 A controller, A provider 가 B Module 을 import 할 때 쓰이는 값이다.  
다른 provider 를 쓰려면 controller 나 provider 에서 직접 불러와야한다.  
아래의 예시를 보자.
```ts
// user.module.ts
@Module({
  imports: [   
 JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
// auth.module.ts
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
```
duplicated code 가 생겼으므로 이렇게 짜면 곤란하다.  
imports 는 특정 module 에 속한 provider 를 불러올 떄 사용할 property 를 넘기기 위해 있는것이다.  
위와 같은 경우엔 아래화 같이 해결할 수 있다.  
```ts
// auth.module.ts
@Module({
  imports: [
    JwtModule.register({ 
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [JwtModule], // export JwtModule.register setting
})
export class AuthModule {}
// user.module.ts
@Module({
  imports: [AuthModule], // get JwtModule.register
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService],
  exports: [UserService],
})
export class UserModule {}

```
JwtModule 은 auth module 에서 이미 설정을 마쳤고, 어차피 user module 에서도 같은 설정을 사용할 것이다.  
이럴 경우, auth module 에서 JwtModule 을 export 한 뒤 user module 에서 import 해주면 된다.  

## Exception handling

* BadRequestException
* UnauthorizedException
* NotFoundException
* ForbiddenException
* NotAcceptableException
* RequestTimeoutException
* ConflictException
* GoneException
* HttpVersionNotSupportedException
* PayloadTooLargeException
* UnsupportedMediaTypeException
* UnprocessableEntityException
* InternalServerErrorException
* NotImplementedException
* ImATeapotException
* MethodNotAllowedException
* BadGatewayException
* ServiceUnavailableException
* GatewayTimeoutException
* PreconditionFailedException

## Security

추가 예정
CORS and CSRF Token

## References

* https://jongdai.tistory.com/67 (oop)
* https://yamoo9.gitbook.io/typescript/ (For learn typescript oop)
* https://hong-p.github.io/javascript/javascript-deepdive-ch25/ (for learn class !Important)
* https://stackoverflow.com/questions/60889758/how-to-pass-rest-parameters-of-a-function-in-postman-body (postman
  parameter)
* https://sdy-study.tistory.com/79 (prisma)
* https://hanamon.kr/%EA%B4%80%EA%B3%84%ED%98%95-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%84%A4%EA%B3%84-%EA%B4%80%EA%B3%84-%EC%A2%85%EB%A5%98/
* 