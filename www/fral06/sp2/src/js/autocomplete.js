import ApiService from "./api-service";

export default class Autocomplete {


  constructor(inputElm) {
    this.inputElm = inputElm;
    this.init();
    this.setAutoComplete();
  }

  init() {
    this.placesElm = document.createElement('div');
    this.placesElm.className = 'autocomplete__list';
    this.inputElm.insertAdjacentElement('afterend', this.placesElm);

    document.addEventListener("click", () => {
      this.closeList();
    });
  }

  getValue() {
    if(this.idValue != null ) {
      this.inputElm.classList.remove('form__control__input--invalid');
    } else {
      this.inputElm.classList.add('form__control__input--invalid');
    }
    return this.idValue;
  }


  setAutoComplete() {
    let timeoutId;
    this.inputElm.addEventListener('keyup', (e) => {
      this.idValue = null;
      clearTimeout(timeoutId); // doesn't matter if it's 0
      timeoutId = setTimeout(this.getFilteredResultCount.bind(this), 1000);
    })
  }

  getFilteredResultCount() {
    if(this.inputElm.value.length > 1) {
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
    this.placesElm.textContent ='';
  }

  render() {
    //TODO render input from here
  }

}
