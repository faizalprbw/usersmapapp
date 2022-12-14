<!-- TABLE OF CONTENTS -->

<details>

<summary>Table of Contents</summary>

<ol>

<li>

<a  href="#users-map-app">Users Map App</a>

<ul>

<li><a  href="#built-with">Built With</a></li>

</ul>

</li>

<li>

<a  href="#getting-started">Getting Started</a>

<ul>

<li><a  href="#prerequisites">Prerequisites</a></li>

<li><a  href="#installation">Installation</a></li>

</ul>

</li>

</ol>

</details>

<!-- ABOUT THE PROJECT -->

## Users Map App

Users Map App (usersmapapp) is a web dashboard to mapping registered users based on address location. This is an experimental project to testing the integration of Django & ReactJS with spatial capabilities.
  
### Built With
This dashboard was developed by using various kinds of open-source frameworks/libraries. <a href='https://www.djangoproject.com/'>Django (Python)</a> with <a href='https://www.django-rest-framework.org/'>Django Rest Framework</a> to create API in the back-end consumed by dashboard developed by <a href='https://reactjs.org/'>ReactJS (JavaScript)</a> for front-end. Location of registered users displayed on dashboard map by using <a href='https://leafletjs.com/'>Leaflet JS<a>. Database used in this system is <a href='https://www.postgresql.org/'>PostgreSQL</a> with spatial extension by using <a href='https://postgis.net/'>PostGIS</a>. All of these components are delivered as containers by using <a href='https://www.docker.com/'>Docker</a> to simplify installation procedure and production deployment. There is also a web server image in the containers which is using <a href='https://www.nginx.com/'>NGINX</a>.  

<p>
<img src="https://user-images.githubusercontent.com/7609337/197407388-c1bd766e-5fd2-41ef-8ab0-8c86e3e52c5a.png" width="140">
<img src="https://user-images.githubusercontent.com/7609337/197407516-d475c634-4f13-49e0-9cdb-3d5bf725863f.png" width="140">
<img src="https://user-images.githubusercontent.com/7609337/197407866-9432f269-3113-4731-90ed-0d15186bf1d2.png" width="140">
<img src="https://user-images.githubusercontent.com/7609337/197407426-de859dff-b62c-4494-9032-37da30c7ed8c.png" width="140">
<img src="https://user-images.githubusercontent.com/7609337/197407445-b05393ae-a111-4b8c-a650-1ed35e934610.png" width="140">
<img src="https://user-images.githubusercontent.com/7609337/197407552-f14b8b52-c7cb-4302-b2ee-9bc50b3c7b46.png" width="140">
<img src="https://user-images.githubusercontent.com/7609337/197407631-c547489f-d994-4c73-9109-f50b12d96e85.png" width="140">
<img src="https://user-images.githubusercontent.com/7609337/197407661-59c45d1d-f231-4999-ba09-7a3d7ad65bbe.png" width="140">
<img src="https://user-images.githubusercontent.com/7609337/197407831-39c03d2d-e841-45ac-a4a4-a65725851bab.png" width="140">
<img src="https://user-images.githubusercontent.com/7609337/197407992-f1d43c57-d7f1-438f-b35a-73557892e6a5.png" width="140">
</p>

<!-- GETTING STARTED -->

## Getting Started


### Prerequisites

This web application is delivered by using Docker container so it need to be installed first. Step to install Docker can be access <a href='https://docs.docker.com/get-started/'>here</a>  

### Installation
1. Clone usersmapapp sourcecode from repository
```sh

git clone https://github.com/faizalprbw/usersmapapp.git -b main
cd usersmapapp

```

2. Configure .env files based on your local environment parameters

```sh
cp .env.example .env
vi .env
```
```sh
POSTGRES_USER=admin # change this
POSTGRES_PASSWORD=password123  # change this
POSTGRES_DB=usersmapapp_db # change this
DATABASE=postgres # change this
PG_HOST=postgres-db
PG_PORT=5432
SECRET_KEY='Django Secret Key'  # change this, can be generated here https://djecrety.ir/
DEBUG=True # change this if in development mode
ALLOWED_HOSTS=localhost 127.0.0.1 usersmapapp-api [::1]

# NOTE:
# PG_HOST, PG_PORT, and ALLOWED_HOSTS have relation to docker-compose.yml, 
# changing them will be impact on docker configuration
```

3. Docker Build and Up.. Make sure Docker & Docker Compose already running on your computer / server

```sh
docker --version # 20.10.17 on my local env
docker-compose --version # v2.10.2 on my local env
docker-compose up -d --build
```

4. Migrate default table & group into Database

```sh
## Migrate 
docker-compose exec usersmapapp-api python manage.py migrate --noinput
## Add Fixtures
docker-compose exec usersmapapp-api python manage.py loaddata userprofile/fixtures/group.json
```

5. Open http://localhost on web browser.. We will be directed into map dashboard page

6. Create superuser account and login to web (http://localhost/admin) as superuser
```sh
## Create Superuser Account
docker-compose exec usersmapapp-api python manage.py createsuperuser
```
7. Optionally.. do the following step to populate example users data into database..
  
```sh
# This example will automatically generate 100 fake users with random location coordinate
docker-compose exec usersmapapp-api python populate_datadummy.py 100
```
Check http://localhost on web browser after run this command, users point location will be populated on map dashboard


### Unit Test
This django web application is tested by using pytest. However, this feature is still on development. To do testing, run following syntax on root directory (/usersmapapp)
```
pytest
```

<p  align="right">(<a  href="#readme-top">back to top</a>)</p>
