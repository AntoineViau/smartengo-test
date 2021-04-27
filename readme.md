# Vallourec Smartengo Test

This technical test is work-in-progress.  
It is built on two micro-services (Node, PHP/SF) and one front end application (Angular).  
Each micro-service has its own MySql database.  

Everything is _dockerized_, so after a `git clone`:

	cd infra
	docker-compose up

You will find a readme for each part : `smart-auth`, `smart-doctrina`, `smart-front`.
