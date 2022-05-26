# Fakebook

[![njsscan sarif](https://github.com/andrewbae/fakebook/actions/workflows/njsscan.yml/badge.svg?branch=master)](https://github.com/andrewbae/fakebook/actions/workflows/njsscan.yml)
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

Previous article was moved on my blog [pwner.kr](https://pwner.kr)

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