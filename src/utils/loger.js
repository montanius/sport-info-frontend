export class Loger {

    log (context, message) {
                 console.log("loger: " ,"context: ",  context,  message);
            };

    error (message) {
console.error(message);
    };
   ;
}

const loger = new Loger();

export default loger;