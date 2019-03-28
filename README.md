# ansible-task

In this project we have 4 machines created on the same network ( created on AWS or with Vagrant )
	
	master machine:	172.168.0.10	( controller machine .. copy the repo content to that machine 
									  and install ansible on it )
	web machine: 	172.168.0.20	( apache server .. with forwarded port 8090 )
	app machine:	172.168.0.30	( nodeJs application )
	db machine: 	172.168.0.40	( mongoDB )

Using ssh-kygen on master machine, connect the other machines to the master
	 
	 copy content of ~/.ssh/id_rsa.pub (on the master) >> INTO >> ~/.ssh/authorized_keys (on each machine)

To run all roles on all machines at once, run the following ansible command on the master machine
	 
	ansible-playbook runAll.yml
	
To view the web pages content open a browser on the local host and insert the following in the URL 

	 localhost:8090

By default the admin project is the running one
	
	add some categories, authors and books as an admin

# =============================================

To change the project to be a user from the master machine inside the repo: 

	# RUN THIS COMMAND INSIDE THE REPO DIRECTORY:
	
		vi roles/web/files/httpd.conf
		
			>> INSIDE THE FILE <<
			
			hash the lines containing: 	
				DocumentRoot "/var/www/html/adminClient"
				DirectoryIndex admin_home.html

			unhash the lines containing:	
				DocumentRoot "/var/www/html/userClient"
				DirectoryIndex users_index.html
	
	# COPY THE CHANGES TO THE WEB SERVER AND RESTART IT BY RUNNING THE FOLLOWING INSIDE THE REPO DIR:
	
		ansible-playbook web.yml



