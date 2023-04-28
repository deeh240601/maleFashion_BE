export default class ResponseModel {
    constructor(status, message, result) {
        this.message = message;
        this.status = status;
        this.result = result;
    }

}
