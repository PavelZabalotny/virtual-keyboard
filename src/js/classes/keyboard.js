// eslint-disable-next-line import/extensions
import pattern from '../pattern.js'
// eslint-disable-next-line import/extensions
import keysData from '../keys/index.js'
// eslint-disable-next-line import/extensions
import Key from './key.js'

export default class Keyboard {
  static init() {
    const keyboard = pattern.map((row) => {
      const el = document.createElement('div')
      el.classList.add('keyboard__row')
      /**
       *
       */
      const rowMap = row.map((patternCode) => {
        const keyElement = document.createElement('div')
        keyElement.classList.add('keyboard__key')
        /**
         *
         */
        Object.entries(keysData).forEach((keys) => {
          const currentLanguage = keys[0]
          const currentLanguageKeys = keys[1]
          currentLanguageKeys.forEach(({ code, value, shiftValue }) => {
            if (code === patternCode) {
              /**
               * create key for all languages
               */
              const element = new Key(code, value, shiftValue, currentLanguage)
              keyElement.append(element.render())
              // add necessary class for big buttons
              const bigButtonPatterns = ['ShiftLeft', 'ShiftRight', 'Tab', 'Backspace', 'CapsLock', 'Enter', 'Space']
              if (bigButtonPatterns.includes(code)) {
                keyElement.classList.add(code.toLowerCase())
              }
            }
          })
        })
        /**
         *
         */
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
    footerInfo.innerHTML = 'Pavel Zabalotny (RS School - 2022)'
    wrapper.append(keyboardDiv, footerInfo)
    keyboardSection.append(wrapper)

    return keyboardSection
  }
}
