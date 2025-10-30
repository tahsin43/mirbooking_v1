# MirBooking Project

  ![MirBooking Schema](https://lh3.googleusercontent.com/C0JHsEwuDGODQmw2J6IeuU4TVPXJAeAXVbqeMCOKdFwgt5VfWj9Fy682L9PuU4P3t7FhUuzj9yoIg-puRH7doukstLVMyAkAW-zEObBnKZxa51h6HTZ2FFUKp1DZa3RTNh0TMyBt1YKc7dRQc2o2zTYqUOD2LwWGxZnBe70kXLuYrmzklQhmwKgIVo7vgKtwSsScnM4PFji9UEljWQwk-p1GYLu-UFvbyVcpDq8U80cXJMSLZIQf9idv-at576LUreEzZyEhRzK1ifmbCI-aN1o6ScVHTVHBLe_b7KcAsvCHvjFL9llP1aHhJAazCajgRKxMlB8zVeNr3MORfVwsGISzoPZfG4QKTASjEFrgCVTpEFKfnWpCx4bXNuOot3bCNqAYJgiaAvWXbJJ6nMLBhvYYd084wb7y8iVYmnFhudI0kgSm0-fB3Nyco4R3jedR0rzjQKeCwIohhyTAUyTe5buRHoYJYw5Utm708ICm3_zgtfz7ekcIk2_FNmcO4Zva0-AGWhXGAyfgWj3iSeQceZxgxhCGDoAf3yOVLraA_1SYn80HJdfaqI950PM7jWMWWWK0DYuOftOiMNSZayQHMwcKwR-6zczQRW4mbEoPhdhRV04SfWDgvcQ2f4kWQtSMBL4BNLZnT5ivsE0OIivy-zMogbs0qVIyeqWxSRcL359_rPAtHY0_s0XNAmT_94jdECbdNyxsy0lzL7RnAwtKOb3j3bHi2jWIvlwiBHk5C9V2cT4rkBf7_9skDzdwKXP7ACpXgHehXW5rVq7EPn8WbvBT76POtlioG-8djMK-TZhubCyA0dnAtEN-aDyR3hACypXCDo4JSNNQqkImrOvKmGIe4W_m9pJtoTxc4-8sKwSkzSm2STwFESONLlxr3RYyyKN4XmnN-4MA_NnqF87m1LGqug3_F6Sdd0BA2cPZHLaRid0m=w1880-h1492-s-no?authuser=0)

## Prerequisites

Please make sure that [Node.js](https://nodejs.org/) (version >= 12, except for v13) is installed on your operating system.

## Setup

Setting up your environment  to run the project is quite simple with the [Nest CLI](https://docs.nestjs.com/cli/overview). With [npm](https://www.npmjs.com/) installed, you can run a Nest project with the following commands in your OS terminal:

```bash
$  npm  i  -g  @nestjs/cli
```

  

## Installation

  

```bash
$  yarn  install
```

or if you use npm

```bash
$  npm  install
```

## Database

- MongoDB integrate by using [Mongoose](http://mongoosejs.com/) module for [Nest](https://github.com/nestjs/nest) 🎉.
-   Multi Collections
-   Database Transaction
-   Database Soft Delete

### Install and Run MongoDB with Homebrew

-   **Open the Terminal app**  and type  `brew update`.
-   **After updating Homebrew**  `brew install mongodb`
-   **After downloading Mongo,**  create the “db” directory. This is where the Mongo data files will live. You can create the directory in the default location by running  `sudo mkdir -p /data/db`
-   **Make sure that the  `/data/db`  directory has the right permissions**  by running
    
    ```
    > sudo chown -R `id -un` /data/db
    > # Enter your password
    
    ```
    
-   **Run the Mongo daemon**, in one of your terminal windows run  `mongod`. This should start the Mongo server.
-   **Run the Mongo shell**, with the Mongo daemon running in one terminal, type  `mongo`  in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.
-   **To exit the Mongo shell**  run  `quit()`
-   **To stop the Mongo daemon**  hit  `ctrl-c`

### Install and Run MongoDB by Downloading it Manually

-   **Go to the MongoDB website’s  [download section](https://www.mongodb.org/downloads#production)**  and download the correct version of MongoDB.
-   **After downloading Mongo**  move the gzipped tar file (the file with the extension .tgz that you downloaded) to the folder where you want Mongo installed. In this case, we’ll say that we want Mongo to live in our home folder, and so the commands might look something like this:
    
    ```
    > cd Downloads
    > mv mongodb-osx-x86_64-3.0.7.tgz ~/
    
    ```
    
-   **Extract MongoDB from the the downloaded archive**, and change the name of the directory to something more palatable: > cd ~/ > tar -zxvf mongodb-osx-x86_64-3.0.7.tgz > mv mongodb-osx-x86_64-3.0.7 mongodb
    
-   **Create the directory where Mongo will store data**, create the “db” directory. You can create the directory in the default location by running  `sudo mkdir -p /data/db`
-   **Make sure that the  `/data/db`  directory has the right permissions**  by running
    
    ```
    > sudo chown -R `id -un` /data/db
    > # Enter your password
    
    ```
    
-   **Run the Mongo daemon**, in one terminal window run  `~/mongodb/bin/mongod`. This will start the Mongo server.
-   **Run the Mongo shell**, with the Mongo daemon running in one terminal, type  `~/mongodb/bin/mongo`  in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.
-   **To exit the Mongo shell**  run  `quit()`
-   **To stop the Mongo daemon**  hit  `ctrl-c`
  

## Running the app

  

```bash
# development
$  yarn  run  start
or
$  npm  run  start

# watch mode
$  yarn  run  start:dev

# production mode
$  yarn  run  start:prod
```


## Test the code with Postman

- First download Postman via this [link](https://www.postman.com/downloads/)
- Test the code with this [link](https://documenter.getpostman.com/view/7598668/2s93ebSAKr)

**Note: Be sure to follow the steps outlined in the link.** 



### Project Tree View 

  

```
mirbooking

├─ .env
├─ .env.example
├─ .eslintrc.js
├─ .git
├─ package.json
├─ src
│ ├─ app.controller.spec.ts
│ ├─ app.controller.ts
│ ├─ app.module.ts
│ ├─ app.service.ts
│ ├─ config
│ │ ├─ config.module.ts
│ │ └─ config.service.ts
│ ├─ data
│ │ └─ homo_sapiens.cdna.fa
│ ├─ dto
│ │ ├─ getQueryDto.ts
│ │ └─ response.dto.ts
│ ├─ main.ts
│ ├─ modules
│ │ ├─ geneInfo
│ │ │ ├─ dto
│ │ │ │ └─ createGeneInfo.dto.ts
│ │ │ ├─ geneInfo.controller.ts
│ │ │ ├─ geneInfo.module.ts
│ │ │ └─ geneInfo.service.ts
│ │ ├─ guide
│ │ │ ├─ dto
│ │ │ │ ├─ createGuide.dto.ts
│ │ │ │ └─ updateGuide.dto.ts
│ │ │ ├─ guide.controller.ts
│ │ │ ├─ guide.module.ts
│ │ │ └─ guide.service.ts
│ │ ├─ interaction
│ │ │ ├─ dto
│ │ │ │ └─ createInteraction.dto.ts
│ │ │ ├─ interaction.controller.ts
│ │ │ ├─ interaction.module.ts
│ │ │ └─ interaction.service.ts
│ │ ├─ kmer
│ │ │ ├─ dto
│ │ │ │ ├─ createKmer.dto.ts
│ │ │ │ └─ updateKmer.dto.ts
│ │ │ ├─ kmer.controller.ts
│ │ │ ├─ kmer.module.ts
│ │ │ └─ kmer.service.ts
│ │ └─ mcfold
│ │ ├─ FoldGuideTarget.jar
│ │ └─ fold-guide.service.ts
│ ├─ repositories
│ │ ├─ gene-information.repository.ts
│ │ ├─ guide.repository.ts
│ │ ├─ interaction.repository.ts
│ │ └─ k-mer.repository.ts
│ └─ schema
│ ├─ gene-information.schema.ts
│ ├─ guide.schema.ts
│ ├─ interaction.schema.ts
│ └─ k-mer.schema.ts
├─ test
│ ├─ app.e2e-spec.ts
│ └─ jest-e2e.json
├─ tsconfig.build.json
├─ tsconfig.json
└─ yarn.lock

```

## Stay in touch


- Author 1 - [Raphael AVOCEGAMOU](https://github.com/Raphjacksun7)

- Author 2 - [BOERO-TEYSSIER Valentin](https://github.com/Valboero)

- Author 3 - [Mariama Dianquinh BAMBARA](http://google.com/)

- Author 4 - [Tahsin Ahmed](https://github.com/tahsin43)