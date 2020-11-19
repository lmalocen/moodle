FROM ubi7/ubi:7.7

MAINTAINER Luis Manuel Alonso Centeno <lmacenteno@et.mde.es>

LABEL description="A custom Apache container based on UBI 7"

RUN yum install -y apache2 mysql php php && \
    yum install -y graphviz aspell ghostscript clamav php-curl php-gd php-intl php-mysqlnd php-xml php-xmlrpc php-ldap php-zip php-soap php-mbstring
    yum clean all

COPY ./src /var/www/html/

EXPOSE 80

ENTRYPOINT ["httpd", "-D", "FOREGROUND"]
