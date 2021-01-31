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
          //console.log(typeof (webhook_event.messaging[0].message.text))
          
          console.log("-----Este es el event-------")
          console.log(webhook_event.messaging[0].message.text)
          //console.log (webhook_event.messaging)
        webhook_event.messaging.forEach(event =>{
          //console.log(event)
            handleEvent(event.sender.id, event)
            // handleMessage (event) - la usabamos cuando estabamos enviando el mensaje que escribia el usuario.
        }) 
    }
    response.sendStatus(200);
})
function handleEvent(senderId, event){
  if(event.message){
      handleMessage(senderId, event.message)
  } else if(event.postback){
    handlePostback(senderId, event.postback.payload)
  }
}

function handleMessage(senderId, event){
  if(event.text){
      
  } else if(event.text="Curso Energia Renovable"){
      cursoEnergia(senderId)
  } else if(event.text){
      defaultMessage(senderId)
  }else if (event.attachments){
    handleAttacment(senderId,event)
  }
}

function handleAttacment(senderId, event){
  let attachment_type=event.attachments[0].type
  switch(attachment_type){
    case "image":
      console.log(attachment_type)
      break
    case "video":
      console.log(attachment_type)
      break
    case "audio":
      console.log(attachment_type)
      break
    case "file":
      console.log(attachment_type)
      break
  }
}


function dpcEnergy(senderId) {
  console.log("Ingreso a default Message")
  const messageData = {
      "recipient": {
          "id": senderId
      },
  "messaging_type": "RESPONSE",
  "message":{
    "text": "👋 Hola Soy Dayz, La energía solar ☀️ es una fuente de vida y origen de la mayoría de las demás formas de energía en la Tierra​. \n\nSelecciona el tipo de servicio que deseas conocer \n1️⃣ Sistemas Fotovoltaicos para casas \n2️⃣ Curso de Energia Renovable. \n\n",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Sistemas Fotovoltaicos",
        "payload":"FOTOVOL_PAYLOAD",
        "image_url":"http://example.com/img/red.png"
      },{
        "content_type":"text",
        "title":"Curso Energia Renovable",
        "payload":"<POSTBACK_PAYLOAD>",
        "image_url":"http://example.com/img/green.png"
      }
    ]
  }
}
  senderActions(senderId)
  callSendApi(messageData)
} 

function sistemaFotovoltaico (senderId) {
  console.log("Ingreso a default Message")
  const messageData = {
      "recipient": {
          "id": senderId
      },
      "message": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "☀️ DPC Energy",
                        "subtitle": "👋Sistema Fotovoltaico",
                        "buttons": [
                            {
                              "type": "postback",
                              "title": "Hacer una cotizacion",
                              "payload": "COTIZACION_PAYLOAD",
                          },
                          {
                            "type":"phone_number",
                            "title": "Llamar a un asesor",
                            "payload": "+50765882509"
                          }
                        ]
                    },
                ]
            }
        }
      }
    }
  senderActions(senderId)
  callSendApi(messageData)
} 

function cursoEnergia (senderId) {
  console.log("Ingreso a default Message")
  const messageData = {
      "recipient": {
          "id": senderId
      },
      "message": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "☀️ DPC Energy",
                        "subtitle": "📗Curso Energia Renovable",
                        "buttons": [
                            {
                              "type": "postback",
                              "title": "Hacer una cotizacion",
                              "payload": "COTIZACION_PAYLOAD",
                          },
                          {
                            "type":"phone_number",
                            "title": "Llamar a un asesor",
                            "payload": "+50765882509"
                          }
                        ]
                    },
                ]
            }
        }
      }
    }
  senderActions(senderId)
  callSendApi(messageData)
} 

function defaultMessage(senderId) { 
  console.log("Ingreso a default Message")
  const messageData = {
      "recipient": {
          "id": senderId
      },
      "message": {
          "text": "Hola, soy Dayz y te invito a utilizar nuestro menu",
          "quick_replies":[
            {
              "content_type": "text",
              "title":"Quienes Somos",
              "image_url":"http://example.com/img/red.png",
              "payload": "DPC_PAYLOAD",
            },
            {
              "content_type": "text",
              "title":"Acerca de",
              "payload": "ABOUT_PAYLOAD"
            }
          ]
        }
  }
  senderActions(senderId)
  callSendApi(messageData)
}

function handlePostback(senderId, payload){
  console.log(payload)
  switch (payload){
    case "GET_STARTED_BETTOBOT":
      showDpc(senderId)
    break
    case "DPC_PAYLOAD":
      dpcEnergy(senderId)
    break
    case "FOTOVOL_PAYLOAD":
      SistemaFotovoltaico(senderId)
    break
    case "COTIZACION_PAYLOAD":
      //Aqui debo desencadenar la funcion para cuando el usuario envia el payload de COTIZACION
      showCotizador(senderId)
    break
    case "CONTACT_PAYLOAD":
      contactSupport(senderId)
    break
    
  }
}

function senderActions(senderId){
  console.log("Ingreso a senderActions")
  const messageData = {
    "recipient":{
      "id": senderId
    },
    "sender_action":"typing_on"
  }
  callSendApi(messageData)
}

function showDpc(senderId){
  console.log("==========================> showDPC <=================================")

  const messageData = {
    "recipient":{
      "id": senderId
    },
    "message": {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": [
                  {
                      "title": "DPC Energy",
                      "subtitle": "👋Hola, Bienvenido a DPC Energy. Como podemos ayudarte? ",
                      "image_url": "https://instagram.fpac1-2.fna.fbcdn.net/v/t51.2885-15/e35/117344835_3476442462368994_7519872707169913172_n.jpg?_nc_ht=instagram.fpac1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=1xB3LXtiwrQAX8PsJXu&tp=1&oh=a56440bf0f3fe3904dd1d49d1aa52a73&oe=604091A5",
                      "buttons": [
                          {
                              "type": "postback",
                              "title": "Conocer los Productos",
                              "payload": "DPC_PAYLOAD",
                          },
                          {
                            "type": "postback",
                            "title": "Hacer una cotizacion",
                            "payload": "COTIZACION_PAYLOAD",
                        },
                        {
                          "type":"phone_number",
                          "title": "Llamar a un asesor",
                          "payload": "+50765882509"
                        }
                      ]
                  },
              ]
          }
      }
  }
  }
  callSendApi(messageData)
}

function showCotizador(senderId){
  console.log("==========================> Cotizador DPC <=================================")
  const messageData = {
      "recipient":{
        "id": senderId
      },
      "message": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Elige tu proveedor",
                  
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Soy ENSA",
                                "payload": "ENSA_PAYLOAD",
                            },
                            {
                              "type": "postback",
                              "title": "Soy NATURGY",
                              "payload": "NATURGY_PAYLOAD",
                          },
                        ]
                    },
                ]
            }
        }
    }
  }
  callSendApi(messageData)
}


function showPizzas(senderId){
  console.log("==========================> showPizzas <=================================")

  const messageData = {
    "recipient":{
      "id": senderId
    },
    "message": {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": [
                  {
                      "title": "Peperoni",
                      "subtitle": "Con todo el sabor del peperoni",
                      "image_url": "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/08/08/Recortada/img_cperezg_20171121-130800_imagenes_lv_terceros_istock-521403691-kK6F-U451255839591PkF-992x558@LaVanguardia-Web.jpg",
                      "buttons": [
                          {
                              "type": "postback",
                              "title": "Elegir Pepperoni",
                              "payload": "PEPPERONI_PAYLOAD",
                          }
                      ]
                  },
                  {
                      "title": "Pollo BBQ",
                      "subtitle": "Con todo el sabor del BBQ",
                      "image_url": "https://s3.amazonaws.com/chewiekie/img/productos-pizza-peperoni-champinones.jpg",
                      "buttons": [
                          {
                              "type": "postback",
                              "title": "Elegir Pollo BBQ",
                              "payload": "BBQ_PAYLOAD",
                          }
                      ]
                  }
              ]
          }
      }
  }
  }
  callSendApi(messageData)
}
function messageImage (senderId){
  const messageData = {
    "recipient":{
      "id": senderId
    },
    "message":{
      attachment:{
        "type":"image",
        "payload":{
          "url": "https://media.giphy.com/media/1dOIvm5ynwYolB2Xlh/giphy.gif"
        }
      }
    }
  }
  callSendApi(messageData)
}

function showLocation (senderId){
  const messageData = {
    "recipient":{
      "id": semderId
    }
    
  }
}

function contactSupport(senderId){
  const messageData={
    "recipient":{
      "id": senderId
    },
    "message" : {
      "attachment": {
        "type":"template",
        "payload":{
          "template_type":"button",
          "text": "Hola este es el canal de soporte, ¿Quieres llamarnos?",
          "buttons":[
            {
              "type":"phone_number",
              "title": "Llamar a un asesor",
              "payload": "+50765882509"
            }
          ]
        }
      }
    }
  }
  callSendApi(messageData)
}

function callSendApi(response) {
  request({
      "uri": "https://graph.facebook.com/me/messages",
      "qs": {
          "access_token": access_token
      },
      "method": "POST",
      "json": response
  },
      function (err) {
          if (err) {
              console.log('Ha ocurrido un error')
          } else {
              console.log('Mensaje enviado')
          }
      }
  )
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
  } */



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