PULSE HAPPY CLUB COM PAINEL ADMINISTRATIVO

Login inicial:
Usuario: admin
Senha: 123456

Comandos para instalar na VPS:

cd /var/www
rm -rf pulsehappyclub-admin
mkdir pulsehappyclub-admin

Envie/descompacte os arquivos dentro de:
/var/www/pulsehappyclub-admin

Depois rode:

cd /var/www/pulsehappyclub-admin
npm install
pm2 start server.js --name pulsehappyclub-admin
pm2 save

Apache:
a2enmod proxy proxy_http
nano /etc/apache2/sites-available/pulsehappyclub.conf

Use este conteúdo:

<VirtualHost *:80>
    ServerName pulsehappyclub.com.br
    ServerAlias www.pulsehappyclub.com.br

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3010/
    ProxyPassReverse / http://127.0.0.1:3010/

    ErrorLog ${APACHE_LOG_DIR}/pulsehappyclub-error.log
    CustomLog ${APACHE_LOG_DIR}/pulsehappyclub-access.log combined
</VirtualHost>

Depois:
systemctl reload apache2

Acessos:
Site: http://SEU_IP
Admin: http://SEU_IP/admin
