export default class Utilities {

  static createElement(type, classes, id, textContent, attributes) {
    const elm = document.createElement(type);
    if (id) {
      elm.id = id;
    }
    if (classes) {
      elm.classList.add(...classes);
    }
    if (textContent) {
      elm.textContent = textContent;
    }
    if (attributes && attributes.length > 0) {
      for (const attribute of attributes) {
        elm.setAttribute(attribute.name, attribute.value)
      }
    }
    return elm;
  }

  static createFormGroup(inputType, inputClasses, inputId, labelClass, labelText) {
    const groupElm = Utilities.createElement('div', ['form__group']);
    const inputElm = Utilities.createElement('input', inputClasses, inputId);
    inputElm.type = inputType;
    const labelElm = Utilities.createElement('label', labelClass, null, labelText);
    labelElm.htmlFor = inputId;
    groupElm.append(labelElm, inputElm);
    return groupElm;
  }

  static getLanguage() {
    return navigator.language;
  }

  static getModal(id) {
    const modal = Utilities.createElement('div', ['infobox']);
    modal.innerHTML = `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Info</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Tuto lentenku máte již přidanou.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Rozumím</button>
      </div>
    </div>
  </div>
</div>`;
    document.getElementById('app').append(modal);

  }

}
