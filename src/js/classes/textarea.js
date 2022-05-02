export default class Textarea {
  static init() {
    /**
     * Helper function
     */
    function createElement(tag = '', classes = [], text = '', attr = []) {
      const element = document.createElement(tag)
      // add class name
      if (classes.length) {
        element.classList.add(...classes)
      }
      // add attributes
      if (attr.length) {
        attr.forEach((item) => {
          element[item?.name] = item?.value
        })
      }
      // add inner text
      element.innerHTML = text
      return element
    }

    const container = createElement('div', ['container'])
    const section = createElement('section', ['textarea-section'])
    const wrapper = createElement('div', ['wrapper'])
    const title = createElement('h1', ['title'], 'RSS Virtual keyboard')
    const paragraph = createElement('p', ['info'], 'Keyboard created in the Windows operating system')
    const label = createElement('label')
    const textarea = createElement('textarea', ['textarea'], '', [{
      name: 'autofocus',
      value: true,
    },
    {
      name: 'spellcheck',
      value: false,
    },
    ])
    label.append(textarea)
    wrapper.append(title, paragraph, label)
    section.append(wrapper)
    container.append(section)

    return container
  }
}
