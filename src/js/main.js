// console.log('Hello')
// eslint-disable-next-line import/extensions
import Keyboard from './classes/keyboard.js'
// eslint-disable-next-line import/extensions
import Textarea from './classes/textarea.js'

const app = Textarea.init()
app.append(Keyboard.init())
document.body.append(app)
