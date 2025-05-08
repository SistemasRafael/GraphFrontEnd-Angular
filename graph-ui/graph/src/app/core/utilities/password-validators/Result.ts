import { MessageFunctionType } from "../../types/MessageFunctionType";

export class Result<E> {
    public message?:string
    constructor(
        public value: E | undefined,
        public error?: MessageFunctionType,
        public parameters?: string[]
    ) { 
        if (error) {
            this.message = this.error!(parameters)
        }
    }
}