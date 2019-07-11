# palette-picker-be

## Authors: 
- [Raechel Odom](https://github.com/raechelo)
- [Rachael Drennan](https://github.com/rdren0)


## Getting Started:

These instructions will get a copy of the project up and running on your local machine.

clone down the repository:

```
$ git clone https://github.com/raechelo/palette-picker-be
```

cd into directory and run npm install:

```
$ npm install
```

launch in your browser:

```
$ npm start
```

## The database tables:
<img width="643" alt="Screen Shot 2019-07-10 at 11 02 56 PM" src="https://user-images.githubusercontent.com/39016273/61023414-1b826480-a367-11e9-9297-776696b895a2.png">
<img width="1123" alt="Screen Shot 2019-07-10 at 11 03 40 PM" src="https://user-images.githubusercontent.com/39016273/61023416-1d4c2800-a367-11e9-8b98-228e4aab193b.png">



### End-Point Examples in this repo:

### Frontend:
You will also need to run the front-end server, found at:
https://github.com/raechelo/Palette-Picker-fe


## Projects

## GET ```/api/v1/projects```

#### Link: ```http://localhost:3001/api/v1/projects```

```
[
  {
    "id": 7,
    "title: "My First Palette",
    "created_at": "2019-07-10 20:07:14.202374-06",
    "updated_at": "2019-07-10 20:07:14.202374-06"
  },
  {
    "id": 8,
    "title: "Dog Party",
    "created_at": "2019-07-10 20:07:14.202374-06",
    "updated_at": "2019-07-10 20:07:14.202374-06"
  }
]
```
## GET ```/api/v1/projects/:id```

#### Link: ```http://localhost:3001/api/v1/projects/8```

```
[
   {
    "id": 8,
    "title: "Dog Party",
    "created_at": "2019-07-10 20:07:14.202374-06",
    "updated_at": "2019-07-10 20:07:14.202374-06"
  }
]
```
## Palettes

## GET ```/api/v1/palettes```

#### Response

#### Status 200 OK

#### Link: ```http://localhose:3001/api/v1/palettes```

```
[
  { "id" : 77,
    "color_1" : "#FFF",
    "color_2" : "#FFF",
    "color_3" : "#FFF",
    "color_4" : "#FFF",
    "color_5" : "#FFF",
    "color_6" : "#FFF",
    "created_at" : "2019-05-08 13:43:54.278753-06",
    "updated_at" : "2019-05-08 13:43:54.278753-06",
    "title" : "The one with all the blue",
    "project_id" : 7
  },
  { "id" : 99,
    "color_1" : "#FFF",
    "color_2" : "#FFF",
    "color_3" : "#FFF",
    "color_4" : "#FFF",
    "color_5" : "#FFF",
    "color_6" : "#FFF",
    "created_at" : "2019-05-08 13:43:54.278753-06",
    "updated_at" : "2019-05-08 13:43:54.278753-06",
    "title" : "The one with all the pink",
    "project_id" : 5
  }]
  
 ```
  
  
## GET ```/api/v1/palettes/:id```

#### Link: ```http://localhost:3001/api/v1/palettes/77```

```
[
  { "id" : 77,
    "color_1" : "#FFF",
    "color_2" : "#FFF",
    "color_3" : "#FFF",
    "color_4" : "#FFF",
    "color_5" : "#FFF",
    "color_6" : "#FFF",
    "created_at" : "2019-05-08 13:43:54.278753-06",
    "updated_at" : "2019-05-08 13:43:54.278753-06",
    "title" : "The one with all the blue",
    "project_id" : 7
  }
]
```
---





