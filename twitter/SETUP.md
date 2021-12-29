# Development Process

## Things needed
Docker must have been installed, in order to use this boiler-plate code. For downloading the docker check this out - [docker download](https://docs.docker.com/get-docker/)

## Setting up the project
1. Clone this repository

2. Start the Docker desktop app (mac & windows) and make sure that the docker-engine is started

```bash
$ docker info
```

> Using this command check whether the docker engine is running!


3. Shot up the terminal and 

```bash
$ cd <project_directory>
```

Make sure the directory is proper before moving further, it should be `<project_directory>/` 

4. Build the Docker images

```bash
$ docker-compose build
```

> This may take some time to complete

5. Once the docker container is built,

```bash
$ docker-compose up
```

You may see the logs that are running up in the terminal, now the container has been started.

6. There may be some default migrations that has to be done for the django, so open-up another terminal in the same directory and run the following command.

```bash
docker compose exec backend python manage.py migrate
```

7. Create a superuser before signin/signup,

```bash
$ docker compose exec backend python manage.py createsuperuser
```

**Ran into any issues? Check the [Docker Compose documentation](https://docs.docker.com/compose/start/) and try restarting the container.**

## Navigation

Webapp - [http://localhost/](http://localhost/)

Django Admin panel - [http://localhost/api/admin](http://localhost/api/admin)

GraphiQL Playground - [http://localhost/api/graphql](http://localhost/api/graphql)

## Note ❗️

This is been dockerized only for the local development and not for the production-ready web app.

## Misc

Whether to install a package or use a command in particular container run the following code.

```bash
docker compose exec <container-name> <command that need to be executed>
```

check the directory's readme, inorder to execute basic necessary commands for both [django](./backend) and [nextjs](./webapp).

