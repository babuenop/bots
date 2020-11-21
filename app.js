'use strict'

const express = require('express')
const bodyParser = require ('body-parser')
const request = require ('request')
const access_token = "EAAFAlLslbu0BAH0iEHlU52vt6dKjrYMe8QmSXGCtNZC8jmBuabmkR8DoXbM6C0wmxTtmvPG2tBA6yBYsUrPV7VqwzpTPvRMoz4v3U7RPgn36nPf1DpmrZCu5XLYgZBKKzNhDteZA3sZBjmi21tgKSgi7mIiM4hBt1AER0MjKeVAZDZD"
const app = express()
app.set('port', 5000)
app.use(bodyParser.json())

app.get('/', function(req, response){
    response.send('Hola Mundo!')
})

app.get('/webhook', function(req, response){
    if(req.query['hub.verify_token']==='bot_token'){
        response.send(req.query['hub.challenge'])
    } else {
        response.send('Bot no tienes permisos')
    }
})

app.post('/webhook/', function(req, response){
    const webhook_event = req.body.entry[0];
    if (webhook_event.messaging){
        webhook_event.messaging.forEach(event =>{
            handleEvent(event.senderId, event)
            // handleMessage (event) - la usabamos cuando estabamos enviando el mensaje que escribia el usuario.
        })
    }
    response.sendStatus(200);
})

function handleEvent(senderId,event){
  if(event.message){
    handleMessage(senderId, event.message)
  }
}

function handleMessage(senderId, event){
  if(event.text){
    defaultMessage(senderId)
  }
}

function defaultMessage(senderId){
  const messageData = {
    "recipient":{
      "id":senderId
    },
      "message": {
        "text":"Hola soy un bot de messenger y te invito a utilizar nuestro menu"
      }
    } 
    callSendApi(messageData)
  }


/* Este bloque lo usamos al inicio para el manejo del mensaje inicial
 function handleMessage(event){
    const senderId = event.sender.id;
    const messageText = event.message.text;
    const messageData = {
      recipient:{
        id: senderId
      },
      message:{ 
        text: messageText
      }
    }
    callSendApi(messageData);
  }
 */
function callSendApi(response) {
    request({
      "uri": "https://graph.facebook.com/me/messages/" ,
      "qs" : {
          "access_token": access_token
      },
      "method": "POST" ,
      "json": response
    },

    function(err) {
      if(err) {
        console.log('Ha ocurrido un error')
      } else {
        console.log('Mensaje enviado')
      }
    }
    )
  }

app.listen(app.get('port'), function(){
    console.log('Nuestro servidor esta funcionando correctamente', app.get('port'))
})




/*
    npm install -g nodemon   : Esto nos permitira instalar nodemon de modo global
    npm install --save-dev nodemon :  con este comando lo tenemos en el entorno de nuestra aplicacion. 
    -   nodemon app.js           : Nuestro servidor se mantendra en ejecucion. 

    ====================
    NGROK 
    Nos va a permitir exponer nuestro hook a traves de internet. 
    - Creamos la cuenta con nuestros datos.
    - Instalamos la version de nuestro sistema operativo. 
    - Adaptacion de servidores locales para hacer pruebas. 
    - Copiamos el archivo dentro de nuestra carpeta del proyecto. 
    - Ejecutamos desde la consola donde se ejecuta el otro proceso. 
    - ./ngrok http 5000 
    - Una vez ejecutando esto crea un tunel para la salida a internet. 


*/