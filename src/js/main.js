// eslint-disable-next-line import/extensions
import Keyboard from './classes/keyboard.js'
// eslint-disable-next-line import/extensions
import Textarea from './classes/textarea.js'
import languageData from './keys'

let globalLang = localStorage.getItem('VK-language')
const app = Textarea.init()
app.append(new Keyboard(globalLang).init())
document.body.append(app)
const targetTextarea = document.querySelector('.textarea')
const keyButtons = document.querySelectorAll('.keyboard__key')

function getKey(code) {
  return languageData[globalLang].filter((el) => el.code === code)[0].value
}

function addText(key, textarea) {
  let newKey
  switch (key) {
    case 'Enter':
      newKey = '\n'
      break
    case 'Backquote':
      newKey = '`'
      break
    case 'ArrowUp':
      newKey = '↑'
      break
    case 'ArrowDown':
      newKey = '↓'
      break
    case 'ArrowLeft':
      newKey = '←'
      break
    case 'ArrowRight':
      newKey = '→'
      break
    case 'Tab':
      newKey = '\t'
      break
    case 'Shift':
    case 'CapsLock':
    case 'Ctrl':
    case 'Win':
    case 'Alt':
    case 'Del':
    case 'Backspace':
      newKey = ''
      break
    default:
      newKey = key
  }
  return textarea.setRangeText(newKey, textarea.selectionStart, textarea.selectionEnd, 'end')
}

/**
 * add keydown event
 */
function keyDownEvent(e, keys, textarea) {
  e.preventDefault()
  keys.forEach((el) => {
    if (el.dataset.code === e.code) {
      el.classList.add('keyboard__key--active')
      /**
       * Change language
       */
      if (e.ctrlKey && e.altKey && !e.repeat) {
        ['.en', '.ru'].forEach((lang) => {
          document.querySelectorAll(lang).forEach((item) => {
            if (item.classList.contains('hidden')) {
              item.classList.remove('hidden')
              item.querySelector('.shift-release').classList.remove('hidden')
            } else {
              item.classList.add('hidden')
              item.querySelector('.shift-release').classList.add('hidden')
            }
          })
        })
        globalLang = globalLang === 'en' ? 'ru' : 'en'
        localStorage.setItem('VK-language', globalLang)
      }
      /* let key = ''
      switch (e.code) {
        case 'Enter':
          key = '\n'
          break
        case 'Backquote':
          key = '`'
          break
        case 'ArrowUp':
          key = '↑'
          break
        case 'ArrowDown':
          key = '↓'
          break
        case 'ArrowLeft':
          key = '←'
          break
        case 'ArrowRight':
          key = '→'
          break
        case 'Tab':
          key = '\t'
          break
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'CapsLock':
        case 'ControlLeft':
        case 'ControlRight':
        case 'MetaLeft':
        case 'AltLeft':
        case 'AltRight':
        case 'Delete':
        case 'Backspace':
          break
        default:
          key = getKey(e.code)
      } */
      addText(getKey(e.code), textarea)
    }
  })
}

function mouseDownEvent(e, textarea) {
  let targetKey
  if (e.target.classList.contains('keyboard__key')) {
    targetKey = e.target
  } else {
    targetKey = e.target.closest('.keyboard__key')
  }

  targetKey?.childNodes.forEach((el) => {
    if (!el.classList.contains('hidden')) {
      // console.log(el)
      el.childNodes.forEach((key) => {
        if (!key.classList.contains('hidden')) {
          addText(key.textContent, textarea)
          textarea.focus()
        }
      })
    }
  })
}

function mouseUpEvent(e, keys) {
  keys.forEach((el) => {
    el.classList.remove('keyboard__key--active')
  })
}

function keyUpEvent(e, keys) {
  keys.forEach((el) => {
    if (el.dataset.code === e.code) {
      el.classList.remove('keyboard__key--active')
    }
  })
}

/**
 * add mousedown event
 */
document.querySelector('.keyboard').addEventListener('mousedown', (e) => mouseDownEvent(e, targetTextarea))
/**
 * add mouseup event
 */
document.querySelector('.keyboard').addEventListener('mouseup', (e) => mouseUpEvent(e, keyButtons))
/**
 * add keydown event
 */
document.addEventListener('keydown', (e) => {
  keyDownEvent(e, keyButtons, targetTextarea)
})
/**
 * add keyup event
 */
document.addEventListener('keyup', (e) => {
  keyUpEvent(e, keyButtons)
})
