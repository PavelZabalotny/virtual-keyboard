export default class Key {
  constructor(code, value, shiftValue, lang, globalLang) {
    this.code = code
    this.value = value
    this.shiftValue = shiftValue
    this.lang = lang
    this.globalLang = globalLang
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

    // create classes depend of global language
    let langClass
    if (this.lang === this.globalLang) {
      langClass = [this.globalLang]
    } else if (this.lang !== this.globalLang && this.globalLang === 'en') {
      langClass = ['ru', 'hidden']
    } else {
      langClass = ['en', 'hidden']
    }
    // create common span
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
      'ArrowUp',
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
    const shiftReleaseClass = langClass.length > 1 ? ['shift-release', 'hidden'] : ['shift-release']
    const shiftRelease = createElement('span', this.value, shiftReleaseClass)
    // create caps span
    const capsPattern = /Key|Bracket|Semi|Quote|Comma|Period|Backquote/
    const capsValue = capsPattern.test(this.code) ? this.value.toUpperCase() : this.value
    const caps = createElement('span', capsValue, ['caps', 'hidden'])
    const shiftCapsPatternEn = /Key/
    const shiftCapsPatternRu = capsPattern
    const shiftCapsPattern = this.lang === 'en' ? shiftCapsPatternEn : shiftCapsPatternRu
    const shiftCapsValue = shiftCapsPattern.test(this.code) ? this.value : this.shiftValue
    const shiftCaps = createElement('span', shiftCapsValue, ['shift-caps', 'hidden'])
    commonSpan.append(shiftPress, shiftRelease, caps, shiftCaps)
    return commonSpan
  }
}
