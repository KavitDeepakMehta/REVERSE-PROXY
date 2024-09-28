# Setting up an Nginx Reverse Proxy for Admin Page Access Control

## Aim
The goal of this guide is to set up an Nginx reverse proxy on an Ubuntu EC2 instance, where the web application is hosted directly on EC2. The admin page will be restricted to a specific IP address while other pages remain publicly accessible.

## Components

1.	S3 Bucket: Stores web application files (read-only).

2.	EC2 Instance: Ubuntu 24.04 instance hosting Nginx and the web application.

3.	Nginx Reverse Proxy: Manages traffic, including restricting admin page access to a specified IP.

4.	Security Group: Allows incoming traffic based on the desired access rules.

## Architecture

![Reverse Proxy](https://github.com/user-attachments/assets/0437ae46-ac50-48d5-b7b8-106dd3dbcdb1)

## Problem Definiton

The web application needs to be hosted on an EC2 instance, where the admin page is restricted to access from a specific IP. The web application files will be pulled from S3 to EC2 during the deployment process. The reverse proxy must block access to unauthorized IPs while serving the public pages to everyone.

## Steps

1. Create S3 Bucket (kdmwebsite)

•	Bucket Name: kdmwebsite

•	Object Ownership: Disable ACL

•	Public Access: Untick "Block all public access"

•	Versioning: Disabled

•	Bucket Key: Disabled

Upload Files:

•	Upload all your web application files and folders to the bucket.

Permissions (Bucket Policy): 

{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Principal": "*",
         "Action": [
            "s3:GetObject",
            "s3:GetObjectAcl"
        ],
         "Resource": "arn:aws:s3:::kdmwebsite/*"
      }
   ]
} 

2. Launch EC2 Instance

•	Name: Reverse Proxy

•	AMI: Ubuntu 24.04

•	Instance Type: t2.micro

•	Launch the instance with default security group settings or customize them to allow SSH, HTTP, and other required services.

3. Assign IAM Role to EC2

•	Create an IAM role in AWS:
  
  o	Trusted Entity: AWS Service
  
  o	Use Case: EC2
  
  o	Policy: Attach AmazonS3FullAccess.
  
  o	Role Name: S3ReadOnlyAccessForEC2

•	Attach this role to your EC2 instance by navigating to Actions -> Security -> Modify IAM Role and selecting S3ReadOnlyAccessForEC2.

4. Install Nginx, AWS CLI and Pull Files from S3 to EC2
•	SSH into your EC2 instance and run the following commands:

  	sudo apt update -y                 # Update the package lists for available updates
  
  	sudo apt install curl unzip -y     # Install curl (for downloading files) and unzip (for extracting zip files)
  
  	curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"  
  
  	unzip awscliv2.zip                 # Unzip the downloaded AWS CLI v2 file
  
  	sudo ./aws/install                 # Install the AWS CLI v2 from the unzipped directory
  
  	aws --version                      # Verify the installed version of AWS CLI
  
  	sudo apt install nginx -y          # Install Nginx web server
  
  	sudo service nginx start           # Start the Nginx web server
  
  	sudo service nginx enable          # Enable Nginx to start automatically on boot
  
  	sudo service nginx status          # Check the status of the Nginx service to ensure it's running
  
  	cd /var/www/html                   # Navigate to the default web root directory for Nginx
  
  	sudo rm index.nginx-debian.html    # Remove the default Nginx placeholder page
  
  	aws s3 cp s3://kdmwebsite/Reverse\ Proxy/ /var/www/html --recursive  # Copy files from the S3 bucket to the Nginx web directory (replace with your own S3 URI)
  
  	cd /etc/nginx/sites-enabled        # Navigate to the Nginx configuration directory for enabled sites
  
  	sudo nano default                  # Open the default site configuration file in nano editor

In the Nginx configuration file (default), add the following configuration:

# Add the following inside the server block
location / {                        # Define the public page configuration
    try_files $uri $uri/ =404;      # Serve files if they exist or return 404 if not found
    allow all;                      # Allow all IPs to access this location
}

# Add the following for the admin page restriction
location /admin {                   # Define the admin page configuration
    deny all;                       # Deny access to all IPs by default
    allow (Your Own IP Address);    # Allow access only from your specific IP (replace with your actual IP)
}

After saving and closing the file, run the following:
sudo nginx -t                      # Test the Nginx configuration for syntax errors
sudo systemctl reload nginx         # Reload Nginx to apply the configuration changes

## Documentation Link

https://docs.google.com/document/d/1YaBlF-kFGHxSQDrzFB87U5PkeBmLhFCUK5iUVr7rEs0/edit?usp=sharing

## Expected Outcome

•  The public pages of the web application will be served from the EC2 instance.

•  The admin page will only be accessible from a specific IP address, while all other IPs will be denied access to it.

•  The system will be secured by using Nginx as a reverse proxy, effectively limiting access to sensitive areas.
