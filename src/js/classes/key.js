export default class Key {
  constructor(code, value, shiftValue, lang) {
    this.code = code
    this.value = value
    this.shiftValue = shiftValue
    this.lang = lang
  }

  render() {
    /**
     * Helper function
     */
    function createElement(tagName, value, classes = []) {
      const element = document.createElement(tagName)
      if (classes.length) {
        element.classList.add(...classes)
      }
      element.innerHTML = value
      return element
    }

    // create common span
    const langClass = this.lang === 'ru' ? ['ru', 'hidden'] : ['en']
    const commonSpan = createElement('span', '', langClass)
    // create shiftPress span
    const shiftPattern = [
      'ShiftLeft',
      'ShiftRight',
      'Tab',
      'Backspace',
      'CapsLock',
      'Enter',
      'Space',
      'ControlLeft',
      'MetaLeft',
      'AltLeft',
      'AltRight',
      'ArrowLeft',
      'ArrowDown',
      'ArrowRight',
      'ControlRight',
      'Backspace',
      'Delete',
    ]
    const shiftPressValue = shiftPattern.includes(this.code) ? this.value : this.shiftValue
    const shiftPress = createElement('span', shiftPressValue, ['shift-press', 'hidden'])
    // create shiftRelease span
    const shiftRelease = createElement('span', this.value, ['shift-release'])
    // create caps span
    const capsValue = /Key/.test(this.code) ? this.value.toUpperCase() : this.value
    const caps = createElement('span', capsValue, ['caps', 'hidden'])
    const shiftCaps = createElement('span', this.value, ['shift-caps', 'hidden'])
    commonSpan.append(shiftPress, shiftRelease, caps, shiftCaps)
    return commonSpan
  }
}
