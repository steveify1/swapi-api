# StarWars API
This application allows you to fetch Star Wars movies and characters, comment on a movie and fetch a list of comments associated with a movie.

## GETTING STARTED
You can run this application inside or outside a container, but the quickest way to get started is to run it inside of a container. If you don't have docker installed, see https://docs.docker.com/get-docker/

### Running inside a container
#####  Step 1: Clone this repository
RUN `git clone git@github.com:steveify1/swapi-api.git` and CD into the project directory

##### Step 2: Run the container
RUN `docker-compose up -d` on the root directory of the project

### Running outside a container
#####  Step 1: Clone this repository
RUN `git clone git@github.com:steveify1/swapi-api.git` and CD into the project directory

##### Step 2: Install dependencies
RUN `npm install` on the root directory of the project

##### Step 3: Run Build
RUN `npm run build`

##### Step 4: Create and populate a `.env` file with the following variables
    ```
    # .env

    PORT=<port_number>
    DB_NAME=<database_name>
    DB_USER=<database_user>
    DB_PASSWORD=<database_password>
    DB_HOST=<database_host>
    DB_PORT=<database_port>
    SWAPI_BASE_URL=https://swapi.dev/api
    ```
##### Step 5: Provision a MySQL database
At this point if you do not have the MySQL server install, you will need to install one. See https://www.mysql.com/downloads/. Alternatively you can provision one with docker by running the following command
    
    `docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<root_password> -e MYSQL_DATABASE=<database_name> -e MYSQL_USER=<user> -e MYSQL_PASSWORD=<password> mysql/mysql-server`

Ideally, you should replace `<database_name>` in the docker command with the value of the `DB_NAME` variable in your .env file.

##### Step6: Start the server
RUN `npm start`
You can also start the server in dev mode by running `npm run dev`

### App Features
- Fetch a list of all movies
- Fetch a list of al characters. You can sort by the keys on the result and also filter by gender
- Comment on a movie
- Fetch a list of comments associated with a movie

#### POSTMAN API Documentation.
[Documentation](https://documenter.getpostman.com/view/8662406/UUxzA7tu#171670f2-686a-4f4a-9d71-93ea9ea67b06)
