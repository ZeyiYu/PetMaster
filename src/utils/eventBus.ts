import EventEmitter from 'events'
const eventBus = new EventEmitter()
eventBus.setMaxListeners(1000)
export default eventBus
