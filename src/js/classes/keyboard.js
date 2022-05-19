import pattern from '../pattern.js'
import keysData from '../keys/index.js'
import Key from './key.js'

export default class Keyboard {
  constructor(globalLang) {
    this.globalLang = globalLang
  }

  init() {
    const keyboard = pattern.map((row) => {
      const el = document.createElement('div')
      el.classList.add('keyboard__row')

      const rowMap = row.map((patternCode) => {
        const keyElement = document.createElement('div')
        keyElement.classList.add('keyboard__key')

        Object.entries(keysData).forEach((keys) => {
          const currentLanguage = keys[0]
          const currentLanguageKeys = keys[1]
          currentLanguageKeys.forEach(({ code, value, shiftValue }) => {
            if (code === patternCode) {
              /**
               * create key for all languages
               */
              const element = new Key(code, value, shiftValue, currentLanguage, this.globalLang)
              keyElement.append(element.render())
              // add necessary class for big buttons
              const bigButtonPatterns = [
                'ShiftLeft',
                'ShiftRight',
                'Tab',
                'Backspace',
                'CapsLock',
                'Enter',
                'Space',
                'Delete',
                'ControlLeft',
                'ControlRight',
                'MetaLeft',
                'AltLeft',
                'AltRight',
              ]
              if (bigButtonPatterns.includes(code)) {
                keyElement.classList.add(code.toLowerCase())
              }
              // add data-code
              keyElement.dataset.code = code
            }
          })
        })

        return keyElement
      })
      el.append(...rowMap)
      return el
    })

    const keyboardSection = document.createElement('section')
    keyboardSection.classList.add('keyboard-section')
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    const keyboardDiv = document.createElement('div')
    keyboardDiv.classList.add('keyboard')
    keyboardDiv.append(...keyboard)
    const footerInfo = document.createElement('h4')
    footerInfo.classList.add('description')
    footerInfo.innerHTML = 'Press left Ctrl + Alt for change language'
    const author = document.createElement('h4')
    const authorLink = document.createElement('a')
    authorLink.href = 'https://github.com/PavelZabalotny/virtual-keyboard/tree/virtual-keyboard'
    authorLink.target = '_blank'
    authorLink.innerHTML = 'Pavel Zabalotny (RS School - 2022)'
    author.classList.add('author')
    author.append(authorLink)
    wrapper.append(keyboardDiv, footerInfo, author)
    keyboardSection.append(wrapper)

    return keyboardSection
  }
}
