# Fakebook
The fakebook is a facebook cloning project for practice CURD.

* Node.js
* TypeScript
* Nest.js
* TypeORM

## Study note
### Nest.js
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

## Object Oriented Programming dictionary
Method: 객체의 기능을 구현하기 위해서 클래스 내부에 구현되는 함수.  
Static method: new 로 객체를 생성하지 않고 즉시 호출가능한 method.  
Instatnce: method 는 호출이 되기 위해서 클래스로부터 객체를 생성해야하는데 생성된 객체를 instance 라고 한다. `a = new b();`