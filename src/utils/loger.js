export class Loger {

    log (context, message) {
                 console.log("loger: " ,"context: ",  context,  message);
            };

    error (context, message) {
        console.error("context: ", context, "loger: ", message);
    };
   ;
}

const loger = new Loger();

export default loger;