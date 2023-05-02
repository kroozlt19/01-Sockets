const express= require('express');
const http = require('http');
const socketio = require ('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor(){
        this.app = express();;
        this.port = process.env.PORT;

        //http server

        this.server = http.createServer(this.app);

        //configuraciones de sockets

        this.io =socketio( this.server,{
            
        })
    }
    middlewares () {
        //desplegar el directorio publico
        this.app.use(express.static( path.resolve( __dirname, '../public')))
    }

    configurarSockets(){
        new Sockets( this.io );
    }

    execute(){

        //Inicializar middle
        this.middlewares();

        //Inicializar Sockets

        this.configurarSockets();

        //Inicializar server
        this.server.listen(this.port, () => {
            console.log('Server conectado en el puerto: 8080')
        });
    }
}
module.exports = Server;