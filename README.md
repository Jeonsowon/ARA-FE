Docker image pull

$ docker pull httpd

ara-fe-server container run

$ docker run -d -it^
--ara-fe-server^
my-apache-app^
-p 8080:80^
-v D:\ARA\ARA-FE:/usr/local/apache2/htdocs^
httpd
