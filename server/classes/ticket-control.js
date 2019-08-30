const fs = require('fs')
const path = require('path')

//crearme una clase con ES6


class Ticket {
    constructor (numero,escritorio){
        this.numero = numero
        this.escritorio = escritorio
    }
}



class TicketControl {

    //el constructor se dispara 
    //cuando escribimos 
    //'new ticketcontrol
    constructor(){
        //definimos las propiedades
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [] //contiene todos lo tickets pendientes
        this.ultimos4 = [] 
        //necesitamos almacenar este en algun
        //lugar ante posibles fallos del servidor
        //mantenemo las informacion

        //como leemos un archvo json
        let data = require('../data/data.json')
        

        //cuando empezamos un nuevo dia reiniciamos
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets
            this.ultimos4 = data.ultimos4
        }else{
            this.reiniciarConteo()
        }
    }

    //lo que esta fuera del constructor son EVENTOS


    //Nuevo Evento : 
    reiniciarConteo(){
        this.ultimo = 0;
        console.log('Se ha inicializado el sistema')
        this.tickets = []
        this.ultimos4 = []//son parte de la pantalla de atenciones
        this.grabarArchivo()
       
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`
    }

    getUltimos4Ticket(){
        return this.ultimos4
    }

    atenderTicket(escritorio){
        //si no hay ticket pendientes no hacemos nada
        if (this.tickets.length === 0){
            return 'No hay tickets'
        }

        //tomar el primer ticket que se encuentre en arreglo
        //de tickets pendinetes
        let numeroTicket = this.tickets[0].numero
        //eliminamos el primer ticket del arreglo que se va a atender
        this.tickets.shift()

        //declarar una instancia de un nuevo ticket que quiero atender
        let atenderTicket = new Ticket(numeroTicket,escritorio)
        //poner el ticket atendido al inicio del arreglo de los ultimos 4
        this.ultimos4.unshift(atenderTicket)

        //borrar los tickets que ya fueron atendidos
        //solo deben existir 4 tickets que se estan atendiendo
        if (this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1)//borra el ultimo
        }

        console.log('Ultimos 4')
        console.log(this.ultimos4)

        this.grabarArchivo();

        return atenderTicket

    }

    grabarArchivo(){
        let jsonData = {
            ultimo:this.ultimo,
            hoy:this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData)

        //grabando en el archivo
        let pathData = path.resolve(__dirname,'../data/data.json')
        fs.writeFileSync(pathData,jsonDataString)

    }

    //creamos otro evento
    siguiente(){
        this.ultimo += 1
        //creamos una instancia de ticket
        let ticket = new Ticket(this.ultimo,null)
        //agregar ticket al arreglo de tickets
        this.tickets.push(ticket)
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`
    }
}

module.exports = {
    TicketControl
}