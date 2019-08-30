//comando para establecer la conexion
var socket = io();

var params = window.location.search.split('?')[1];
console.log(params)
if(params){
    if(params.split('=')[0] != 'escritorio'){
        window.location = 'index.html'
        //ahora evitar que el codigo siga avanzando
        throw new Error('El escritorio es necesario')
    }
}
else{
    window.location = 'index.html'
    throw new Error('El escritorio es necesario')
}


var label = $('small')
var escritorio = params.split("=")[1];
$("h1").text('Escritorio ' + escritorio )


$("button").on('click', function(){
    socket.emit('atenderTicket', {escritorio:escritorio}, function(respuesta){
        console.log(respuesta)
        if(respuesta === 'No hay tickets'){
            alert(respuesta)
            return;
        }
        label.text('Ticket '+ respuesta.numero)
    })
})