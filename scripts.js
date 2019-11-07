const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  let textarea;
  let checked;
  let deletee;

  function init(_form, _items) {
    items = _items;
    textarea = _form.querySelector("input");
    checked = _items.querySelector(".item__checkbox");
    deletee = _items.querySelector(".item__button");
    _form.addEventListener('submit', formHandler);
    checked.addEventListener('change', edit);
    deletee.addEventListener('click',deleteItem);
    
   

    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();

    console.log('halló heimur');
    var div = el("li", "item", formHandler);
    add(div);
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    e.preventDefault();
    items.classList.add("item--done");
    console.log("Halló maður");
    event.stopPropagation();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {

    items.appendChild(value);

  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.preventDefault();

    console.log('halló heimur2');
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    var divElement = document.createElement(type);
    divElement.classList.add(className);
    var inp = document.createElement("input");
    inp.classList.add("item__checkbox");
    inp.setAttribute("type","checkbox");
    divElement.appendChild(inp);
    var sp = document.createElement("span");
    sp.classList.add("item__text");
    var y = document.createTextNode(textarea.value);
    sp.appendChild(y);
    divElement.appendChild(sp);
    var bt = document.createElement("button");
    bt.classList.add("item__button");
    var z = document.createTextNode("Eyða");
    bt.appendChild(z);
    divElement.appendChild(bt);

    
  
    return divElement;
  }

  return {
    init: init
  }
})();
