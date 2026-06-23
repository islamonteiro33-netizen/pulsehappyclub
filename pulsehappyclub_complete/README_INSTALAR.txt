INSTALAÇÃO NA HOSTINGER VPS - PULSE HAPPY CLUB

1) Criar pasta do site:
mkdir -p /var/www/pulsehappyclub

2) Enviar os arquivos index.html, style.css e script.js para:
/var/www/pulsehappyclub

3) Permissão:
chown -R www-data:www-data /var/www/pulsehappyclub
chmod -R 755 /var/www/pulsehappyclub

4) Apache VirtualHost:
nano /etc/apache2/sites-available/pulsehappyclub.conf

Cole:
<VirtualHost *:80>
    ServerName pulsehappyclub.com.br
    ServerAlias www.pulsehappyclub.com.br
    DocumentRoot /var/www/pulsehappyclub

    <Directory /var/www/pulsehappyclub>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/pulsehappyclub-error.log
    CustomLog ${APACHE_LOG_DIR}/pulsehappyclub-access.log combined
</VirtualHost>

5) Ativar site:
a2ensite pulsehappyclub.conf
systemctl reload apache2

6) SSL:
apt update
apt install certbot python3-certbot-apache -y
certbot --apache -d pulsehappyclub.com.br -d www.pulsehappyclub.com.br

IMPORTANTE:
Troque pulsehappyclub.com.br pelo domínio real que você for usar.
