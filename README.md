# help

## Startup
If you have Docker you should be able to execute:
```
docker-compose up
```
and that will start all of the necessary services.

The first time you start up, wait for the database to be ready for connections
(you will see a message like `mysqld: ready for connections.`). Then execute:
```
docker-compose exec api bin/console doctrine:schema:create
```
which will create the necessary database tables for you.

Then you should be able to access the site at:   
http://127.0.0.1:8000   
(or whatever the IP address is of your docker machine).
