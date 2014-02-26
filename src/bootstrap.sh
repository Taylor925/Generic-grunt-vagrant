#!/usr/bin/env bash

# Update the box
# --------------
# Downloads the package
apt-get Update

#Install vim (if you really want to)
apt-get install -y vim
apt-get install -y nano

#Apache
#-----
apt-get install -y apache2

#Remove /var/www default
rm -rf /var/www

#Symlink /vagrant to /var/www
ln -fs /vagrant /var/www

# Add ServerName to httpd.conf
echo "ServerName localhost" > /etc/apache2/httpd.conf

#Setup hosts file
VHOST=$(cat <<EOF
<VirtualHost *:80>
	DocumentRoot "/vagrant/src"
	ServerName localhost
	<Directory "/vagrant/src">
		AllowOverride All
	</Directory>
</VirtualHost>
EOF
)
echo "${VHOST}" > /etc/apache2/sites-enabled/000-default

#enable mod Rewrite
a2enmod rewrite

#PHP 5.4
#-----
apt-get install -y libapache2-mod-php5

#Add apt-repo binary
apt-get install -y python-software-properties

#Install PHP 5.4
add-apt-repository ppa:ondrej/php5

#Update
apt-get update

apt-get install -y php5
#PHP More stuff
# Command line
apt-get install -y php5-cli

# cURL
apt-get install -y php5-curl
#MCrypt
apt-get install -y php5-mcrypt

#Restart Apache
service apache2 restart

#cURL
#----
apt-get install -y curl


#Install Composer
#-----
curl -s https://getcomposer.org/installer | php
# Make Composer available globally
mv composer.phar /usr/local/bin/composer





