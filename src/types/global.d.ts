// declare var myconsole: {
//     log(message: any):void
// };

interface Console {
    log(message?: any): void
    error(message?: any): void
};
declare var myconsole: Console;