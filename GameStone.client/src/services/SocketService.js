import { AppState } from '../AppState'
import { Chat } from '../models/Chat'
import { Gathering } from '../models/Gathering'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on("s:created:gathering", this.createdGathering)
      .on("s:created:chat", this.createdChat)
      .on("s:joined:room", this.joiningRoom)
      .on("s:leaving:room", this.leavingRoom)
      .on("s:created:messageUser", this.messageUser)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

  createdGathering(payload) {
    let newGathering = new Gathering(payload)
    if (!payload) {
      throw new Error("Something went wrong.")
    } else {
      if (AppState.account.id != newGathering.profileId) {
        Pop.toast(`${newGathering.name} has been created, join now!`)
      }
    }
    AppState.gatherings.push(newGathering)
  }

  createdChat(payload) {
    const chat = new Chat(payload)
    AppState.chats.push(chat)
  }

  joiningRoom(payload) {
    if (payload && AppState.account.id != payload.id) {
      Pop.toast(
        `
        <h5>${payload.name} has joined the chat.</h5>
        `,
        null
      )
    }
  }

  leavingRoom(payload) {
    if (payload && AppState.account.id != payload.id) {
      Pop.toast(
        `
        <h5 class="text-danger bg-warning">${payload.name} has left.</h5>
        `
      )
    }
  }

  messageUser(payload) {
    Pop.toast(
      `
      ${payload.creator.name} has posted in ${payload.gathering.name}.
      `,
      "info"
    )
  }
}

export const socketService = new SocketService()
