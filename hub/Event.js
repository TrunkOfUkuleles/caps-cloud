'use strict';



function eventObj(type, data){

let obj = {
    event: type,
    time: new Date(),
    payload: data
}
return obj;
}


module.exports = eventObj



