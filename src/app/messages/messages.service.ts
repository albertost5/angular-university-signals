import {Injectable, signal} from "@angular/core";
import {Message, MessageSeverity} from "../models/message.model";


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  #message = signal<Message | null>(null);

  message = this.#message.asReadonly();

  showMessage(message: Message) {
    this.#message.set(message);
  }

  clearMessage() {
    this.#message.set(null);
  }
}
