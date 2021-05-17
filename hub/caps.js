'use strict';

const io = require('socket.io')(3000);
let deliverySystem = io.of('/caps')
const event = require('./Event')

deliverySystem.on('connection', socket => {

    socket.on('join', room => {
        console.log('room name:', room);
        // this method is built into socket.io to handle the actual joining of a
        // if (!Object.keys(track).includes(room)){
        //     track[`${room}`] = {'delivered': []}
        // }

        // console.log("=========JOINING: ", track)
        socket.join(room);
        deliverySystem.to('queue').emit('joined', room)
        // if (track[`${room}`].delivered.length > 0){
        //     deliverySystem.to(room).emit('catchup', track[`${room}`])
        // }
        
      })

    //   socket.on('catched-up', payload => {
    //     // emit to whatever you want here
    //     console.log("CAUGHT_UP: ==========", payload)
    //     track[`${payload.delivered[0].storeName}`] =  {'delivered': []}
    // });

    socket.on('pickup', payload => {
        // emit to whatever you want here
        console.log("EVENT ", event('pickup', payload))
        deliverySystem.emit('pickup', payload);
    });

    socket.on('in-transit', payload => {
        console.log("EVENT ", event('in-transit', payload))
    })

    socket.on('delivered', payload => {
        console.log("EVENT ", event('delivered', payload))
        // track[`${payload.storeName}`].delivered.push(payload)
        deliverySystem.to('queue').emit('delivered', payload)
        deliverySystem.to(payload.storeName).emit('delivered', payload)
    })

    // socket.on('confirmed', payload => {
    //     console.log("confirmed: ", payload)
    //     track[`${payload.storeName}`].delivered = track[`${payload.storeName}`].delivered.filter(el => {
    //         if (el.orderId !== payload.orderId) return el
    //     })
    //     console.log("DELETED?======:", track[`${payload.storeName}`])
    // })

    // socket.on('disconnect', room => {
    //     if (track[room].delivered.length===0){delete track[room]}
    // })
})
