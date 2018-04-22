# imagen base con node v6.6
FROM node:6.6

# prepare a user which runs everything locally! - required in child images!
# agregado usuario app para la configuracion del despliegue
RUN useradd --user-group --create-home --shell /bin/false app

# define variable de entorno para el directorio de trabajo
ENV HOME=/home/app
WORKDIR $HOME

# instala el angular-cli
RUN npm install -g @angular/cli && npm cache clean

# expone el puerto de nodejs
EXPOSE 4200
