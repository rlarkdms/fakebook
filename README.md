# Fakebook
The fakebook is a facebook cloning project for practice basic CURD with RESTful API.  
I will add English description as soon.

## Skill stacks
* Node.js
* TypeScript
* Nest.js
* TypeORM
* PostgreSQL
* Docker

## To-Do
* Implement JWT authentication module 

## How to use
### Run postgres on docker
```bash
$ sudo mkdir /db
$ docker run -d -p 5432:5432 -v /db:/var/lib/postgresql/data --restart unless-stopped -e POSTGRES_USER="fakebook" -e POSTGRES_PASSWORD="temppass" -e PGDATA=/var/lib/postgresql/data/pgdata --name fakebook postgres
```
### Run nest.js server
```bash
$ nest start server
```

## Study note
* Nest.js 는 모듈의 집합이다.
* Nest.js 는 Single Responsibility Principle 에 의해 Controller, Provider(Service, Repository, Factory, Helper, etc...), Module 로 구성되어 있다. 기존 express 와 비교하면 비즈니스 로직을 provider(service)에 정의 하고 Controller 는 url과 연결시키는 역할만 한다.
* 기능별로 모듈을 생성한다.(E.g Users, Auth...) 
* 각 모듈을 root module(app.module.ts) 에 import 시켜주어야 한다.
* Callback 을 쓰는 궁극적인 이유는 함수간의 실행 순서를 잡아주는 것이다. 그렇기에 callback hell 을 해결하기 위해 promise or async/await 을 사용한다.
* passport 의 authentication method 는 passport-local 방식과 passport-jwt 방식 이 있다.
main.ts 는 Nest.js 의 Entry Point(EP) 이다. 
```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```
NestFactory class 는 애플리케이션 인스턴스를 생성할 수 있는 몇가지 **static method** 를 제공함.  
### nest command
#### generate controller, service, module
`$ nest g <controller, service, module> <name>`
#### generate CURD
`$ nest g resource <name>`
### Controller
Controller 는 request 를 받고 처리된 결과를 response 해주는 역할을 한다.  
Controller 는 endpoint routing 매커니즘을 통해 각 컨트롤러가 받을 수 있는 요청을 분류함  
router 를 따로 만들지 않고 컨트롤러 파일 내에서 decorator 로 처리함
`@Get("/index") -> /index`  
`@Controller("real"), @Get("sh*t") -> /real/shit`  

#### Request Object
Client 가 보내는 request 는 @Req() 로 다룰 수 있다.  
API 를 작성할 때는 주로 @Query() @Param(key?: string) @Body 를 통해 request 를 받는다.  

#### Response
`nest g resource Users` 를 통해 Users 리소스에 대한 CRUD API 를 만들 수 있다.
```
[Nest] 14579  - 04/26/2022, 4:28:46 PM     LOG [RoutesResolver] UsersController {/users}: +0ms
[Nest] 14579  - 04/26/2022, 4:28:46 PM     LOG [RouterExplorer] Mapped {/users, POST} route +0ms
[Nest] 14579  - 04/26/2022, 4:28:46 PM     LOG [RouterExplorer] Mapped {/users, GET} route +0ms
[Nest] 14579  - 04/26/2022, 4:28:46 PM     LOG [RouterExplorer] Mapped {/users/:id, GET} route +1ms
[Nest] 14579  - 04/26/2022, 4:28:46 PM     LOG [RouterExplorer] Mapped {/users/:id, PATCH} route +0ms
[Nest] 14579  - 04/26/2022, 4:28:46 PM     LOG [RouterExplorer] Mapped {/users/:id, DELETE} route +0ms
```
@HttpCode() 를 통해 http status code 를 보낼 수 있다.
```ts
import { HttpCode } from '@nestjs/common';
@HttpCode(202)
@Patch(':id')
```
요청을 처리하던 발생한 예외는 아래와 같이 처리한다.
```ts
@Get(':id')
findOne(@Param('id') id: string) {
  if (+id < 1) {
    throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
  }

  return this.usersService.findOne(+id);
}
```
#### Header
x xss protection와 같은 응답 헤더를 보낼 수 있다.
```ts
import { Header } from '@nestjs/common';
@Header('Custom', 'Test Header')
@Get(':id')
```
#### Route parameter
```ts
@Delete(':userId/memo/:memoId')
deleteUserMemo(
  @Param('userId') userId: string,
  @Param('memoId') memoId: string,
) {
  return `userId: ${userId}, memoId: ${memoId}`;
}
```
### Data Transfer Object(DTO) and Pipe
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

### Dependency Injection
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

### Circular Dependency
순환 참조 문제이다. 각 모듈 A, B에 `forwardRef(()=> ModuleA); forwardRef(()=> ModuleB);`해주면 된다.

### Security
추가 예정
CORS and CSRF Token

## Object Oriented Programming dictionary
Method: 객체의 기능을 구현하기 위해서 클래스 내부에 구현되는 함수.  
Static method: new 로 객체를 생성하지 않고 즉시 호출가능한 method.  
Instatnce: method 는 호출이 되기 위해서 클래스로부터 객체를 생성해야하는데 생성된 객체를 instance 라고 한다. `a = new b();`

## References
* nest.js: https://wikidocs.net/147787
* nest.js + typeORM + PostgreSQL: https://medium.com/@feedbotstar/nest-js-typeorm-postgresql-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-153c3a55aba1
* https://kimmanbo.tistory.com/18
* https://velog.io/@qnfmtm666/2.-NestJS-NestJS-%EB%B0%95%EC%82%B4%EB%82%B4%EA%B8%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EC%9E%90
* https://m.blog.naver.com/sssang97/221942419992 <- good