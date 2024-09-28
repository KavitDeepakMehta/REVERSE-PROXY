sudo apt update -y                 # Update the package lists for available updates
sudo apt install curl unzip -y     # Install curl (for downloading files) and unzip (for extracting zip files)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"  # Download the AWS CLI v2 installer
unzip awscliv2.zip                 # Unzip the downloaded AWS CLI v2 file
sudo ./aws/install                 # Install the AWS CLI v2 from the unzipped directory
aws --version                      # Verify the installed version of AWS CLI
sudo apt install nginx -y          # Install Nginx web server
sudo service nginx start           # Start the Nginx web server
sudo service nginx enable          # Enable Nginx to start automatically on boot
sudo service nginx status          # Check the status of the Nginx service to ensure it's running
cd /var/www/html                   # Navigate to the default web root directory for Nginx
sudo rm index.nginx-debian.html    # Remove the default Nginx placeholder page
aws s3 cp s3://kdmwebsite/Reverse\ Proxy/ /var/www/html --recursive  # Copy files from the S3 bucket to the Nginx web directory (replace with your own S3 URI)
cd /etc/nginx/sites-enabled        # Navigate to the Nginx configuration directory for enabled sites
sudo nano default                  # Open the default site configuration file in nano editor
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
sudo nginx -t                      # Test the Nginx configuration for syntax errors
sudo systemctl reload nginx         # Reload Nginx to apply the configuration changes
