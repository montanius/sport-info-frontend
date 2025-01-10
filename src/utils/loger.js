export class Loger {

    log (context, message) {
                 console.log("loger: " ,"context: ",  context,  message);
            };

    error (context, message) {
        console.log("loger: " ,"context: ",  context,  message);
    };
   ;
}

const loger = new Loger();

export default loger;