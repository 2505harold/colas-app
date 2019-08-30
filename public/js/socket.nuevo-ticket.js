//este maneja toda la logica de un nuevo tickets


//comando para establecer la conexion
var socket = io()

var label = $("#lblNuevoTicket")

socket.on('connect',function(){
    console.log('conectado al servidor')
})

socket.on('disconnect',function(){
    console.log('desconectado del servidor')
})

socket.on('estadoActual',function(data){
    label.text(data.actual)
})

$('button').on('click',function(){
    //llamndo al evento "nextTicket" de socket
    socket.emit('nextTicket',null,function(nextTicket){
        label.text(nextTicket)
    })
})

