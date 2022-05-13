import Keyboard from './classes/keyboard.js'
import Textarea from './classes/textarea.js'

let globalLang = localStorage.getItem('VK-language') || 'en'
const app = Textarea.init()
app.append(new Keyboard(globalLang).init())
document.body.append(app)
const targetTextarea = document.querySelector('.textarea')
const keyButtons = document.querySelectorAll('.keyboard__key')
let isShift = false
let isCapsLock = false

function handleShift() {
  isShift = !isShift

  keyButtons.forEach((el) => {
    el.childNodes.forEach((item) => {
      if (!item.classList.contains('hidden')) {
        item.childNodes.forEach((s) => {
          if (!isCapsLock) {
            if (s.classList.contains('shift-press') || s.classList.contains('shift-release')) {
              s.classList.toggle('hidden')
            }
          } else if (isShift) {
            if (s.classList.contains('shift-caps')) {
              s.classList.remove('hidden')
            } else {
              s.classList.add('hidden')
            }
          } else if (s.classList.contains('caps')) {
            s.classList.remove('hidden')
          } else {
            s.classList.add('hidden')
          }
        })
      }
    })
  })
}

function addText(key, textarea) {
  let newKey
  let selectionStart
  let selectionEnd
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
    case 'Backspace':
      selectionStart = textarea.selectionStart > 0
        ? textarea.selectionStart
        : 0
      textarea.setRangeText('', selectionStart, textarea.selectionEnd, 'select')
      return
    case 'Del':
      selectionEnd = textarea.selectionEnd > textarea.length
        ? textarea.length
        : textarea.selectionEnd
      textarea.setRangeText('', textarea.selectionStart, selectionEnd, 'select')
      return
    case 'Shift':
      return
    case 'CapsLock':
    case 'Ctrl':
    case 'Win':
    case 'Alt':
      newKey = ''
      break
    default:
      newKey = key
  }
  textarea.setRangeText(newKey, textarea.selectionStart, textarea.selectionEnd, 'end')
}

function handleCaps() {
  keyButtons.forEach((el) => {
    el.childNodes.forEach((item) => {
      if (!item.classList.contains('hidden')) {
        item.childNodes.forEach((capsElem) => {
          if (!isCapsLock) {
            if (!isShift) {
              if (capsElem.classList.contains('caps')) {
                capsElem.classList.toggle('hidden')
              } else {
                capsElem.classList.add('hidden')
              }
            } else if (isShift) {
              if (capsElem.classList.contains('shift-caps')) {
                capsElem.classList.toggle('hidden')
              } else {
                capsElem.classList.add('hidden')
              }
            }
          } else if (!isShift) {
            if (capsElem.classList.contains('shift-release')) {
              capsElem.classList.toggle('hidden')
            } else {
              capsElem.classList.add('hidden')
            }
          } else if (isShift) {
            if (capsElem.classList.contains('shift-press')) {
              capsElem.classList.toggle('hidden')
            } else {
              capsElem.classList.add('hidden')
            }
          }
        })
      }
    })
  })
}

/**
 * add mouse down event
 */
function mouseDownEvent(e, textarea, isKeyboard = false) {
  let targetKey
  if (!isKeyboard) {
    if (e.target.classList.contains('keyboard__key')) {
      targetKey = e.target
    } else {
      targetKey = e.target.closest('.keyboard__key')
    }
    // shift down
    if (/Shift/.test(targetKey?.dataset.code)) {
      targetKey.classList.toggle('keyboard__key--active')
      handleShift()
    }
    if (/Caps/.test(targetKey?.dataset.code)) {
      targetKey.classList.toggle('keyboard__key--active')
      handleCaps()
      isCapsLock = !isCapsLock
    }
  }

  if (isKeyboard) {
    keyButtons.forEach((elem) => {
      if (elem.dataset.code === e.code) {
        targetKey = elem
      }
    })
  }

  targetKey?.childNodes.forEach((el) => {
    if (!el.classList.contains('hidden')) {
      el.childNodes.forEach((key) => {
        if (!key.classList.contains('hidden')) {
          addText(key.textContent, textarea)
          textarea.focus()
        }
      })
    }
  })
}

/**
 * add keydown event
 */
function keyDownEvent(e, keys, textarea) {
  e.preventDefault()
  // shift down
  if (e.shiftKey && e.key === 'Shift' && !e.repeat) {
    handleShift()
  }
  if (e.code === 'CapsLock') {
    handleCaps(e)
    isCapsLock = !isCapsLock
  }

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
              if (isCapsLock) {
                item.querySelector('.caps').classList.remove('hidden')
              } else {
                item.querySelector('.shift-release').classList.remove('hidden')
              }
            } else {
              item.classList.add('hidden')
              item.childNodes.forEach((elem) => {
                elem.classList.add('hidden')
              })
            }
          })
        })
        globalLang = globalLang === 'en' ? 'ru' : 'en'
        localStorage.setItem('VK-language', globalLang)
      }
    }
  })
  mouseDownEvent(e, textarea, true)
}

function mouseUpEvent(e, keys) {
  if (e.target?.closest('.shiftleft') || e.target?.closest('.shiftright')) {
    handleShift()
  }
  keys.forEach((el) => {
    if (['CapsLock'].includes(el.dataset.code)) {
      return
    }
    el.classList.remove('keyboard__key--active')
  })
}

/*
* add key up event
 */
function keyUpEvent(e, keys) {
  if (e.code === 'CapsLock' && isCapsLock) {
    return
  }
  keys.forEach((el) => {
    if (el.dataset.code === e.code) {
      el.classList.remove('keyboard__key--active')
    }
  })
  // shift up
  if (isShift && e.key === 'Shift') {
    handleShift()
  }
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
