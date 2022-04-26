# Fakebook
The fakebook is a facebook cloning project for practice CURD.

* Node.js
* TypeScript
* Nest.js
* TypeORM

## Study note
* Nest.js 는 모듈의 집합이다.
* Nest.js 는 하나 이상의 모듈이 반드시 있어야한다
* 기능별로 모듈을 생성한다(더 상세히 적기)
* 각 모듈을 root module 에 import 시켜주어야 한다

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
`$ nest g {controller, service, module} {name}`

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
Data Transfer Object 를 통해 중복되는 코드를 막을 수 있다.
```ts
export class DeleteMemo {
  userId: string;
  email: string;
}
@Delete()
remove(@Body() deleteMemo: DeleteMemo){
  const {userId, email}=deleteMemo;
  return `memo deleted userid: ${userId}, email: ${email}`;
}
```


## Object Oriented Programming dictionary
Method: 객체의 기능을 구현하기 위해서 클래스 내부에 구현되는 함수.  
Static method: new 로 객체를 생성하지 않고 즉시 호출가능한 method.  
Instatnce: method 는 호출이 되기 위해서 클래스로부터 객체를 생성해야하는데 생성된 객체를 instance 라고 한다. `a = new b();`

## References
* https://wikidocs.net/147787