const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control')



const ticketControl = new TicketControl()


io.on('connection', (client) => {

    client.on('nextTicket',(data,callback)=>{
        let siguiente = ticketControl.siguiente()
        console.log(siguiente);
        callback(siguiente);
    })

    client.emit('estadoActual',{
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4Ticket()
    })

    //funcion sockets atender ticket
    client.on('atenderTicket',(data,callback)=>{
        console.log(data)
        if(!data.escritorio){
            return callback({
                err:true,
                mensaje:'Escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)


        callback(atenderTicket)
        //actualizar / notificar / cambios en los ultimos 4

        client.broadcast.emit('ultimos4',{ultimos4:ticketControl.getUltimos4Ticket()})

    })


});