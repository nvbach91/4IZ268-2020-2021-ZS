import ApiService from "./api-service";
import Utilities from "./utilities";

export default class Autocomplete {


  constructor(inputId, labelText, placeholder) {
    this.init(inputId, labelText, placeholder);
    this.setAutoComplete();
  }

  init(inputId, labelText, placeholder) {
    this.formGroup = Utilities.createFormGroup(
      'text',
      ['form__control', 'form__control__input'],
      inputId,
      ['form__control'], labelText);

    this.placesElm = Utilities.createElement('div', ['autocomplete__list']);

    this.inputElm = this.formGroup.querySelector(`#${inputId}`);
    this.inputElm.placeholder = placeholder;
    this.inputElm.autocomplete = 'off';
    this.inputElm.insertAdjacentElement('afterend', this.placesElm);

    document.addEventListener("click", () => {
      this.closeList();
    });
  }

  getValue() {
    if (this.idValue) {
      this.inputElm.classList.remove('form__control__input--invalid');
    } else {
      this.inputElm.classList.add('form__control__input--invalid');
    }
    return this.idValue;
  }

  setValue(location) {
    this.idValue = location.id;
    this.inputElm.value = location.location;
  }

  clear() {
    this.inputElm.value = ''
    this.idValue = null;
  }

  getFullLocation() {
    return {
      location: this.inputElm.value,
      id: this.idValue
    }
  }


  setAutoComplete() {
    let timeoutId;
    this.inputElm.addEventListener('keyup', (e) => {
      this.idValue = null;
      clearTimeout(timeoutId); // doesn't matter if it's 0
      timeoutId = setTimeout(this.getFilteredResultCount.bind(this), 500);
    })
  }

  getFilteredResultCount() {
    if (this.inputElm.value.length > 1) {
      ApiService.getPlaces(this.inputElm.value).then(
        r => this.createAutoCompleteList(r)
      )
    }
  }

  createAutoCompleteList(items) {
    this.closeList();
    const places = items.Places;
    for (const place of places) {
      const placeElm = document.createElement('div');
      const placeId = place.PlaceId;
      placeElm.textContent = `${place.PlaceName} (${placeId.substr(0, placeId.indexOf('-'))})`;
      placeElm.className = "autocomplete__item"
      placeElm.dataset.id = place.PlaceId;
      placeElm.addEventListener('click', () => {
        this.inputElm.value = placeElm.textContent;
        this.idValue = placeElm.dataset.id;
        this.closeList()
      })
      this.placesElm.append(placeElm);
    }
  }

  closeList() {
    //better performance then innerHTML
    this.placesElm.textContent = '';
  }

  render() {
    return this.formGroup;
  }

}
