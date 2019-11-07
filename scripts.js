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
  let itemtext;

  function init(_form, _items) {
    items = _items;
    textarea = _form.querySelector(".form__input");
    checked = items.querySelectorAll(".item__checkbox");
    itemtext = items.querySelectorAll(".item__text");
    deletee = items.querySelectorAll(".item__button");

    for (i = 0; i < checked.length; i++) {
      checked[i].addEventListener('change', finish);
      deletee[i].addEventListener('click', deleteItem);
      itemtext[i].addEventListener('click', edit);
    }

    _form.addEventListener('submit', formHandler);
  }

  function formHandler(e) {
    e.preventDefault();

    // Ef texti er ekki í lagi stoppar fallið hér.
    if (!validateText(textarea.value)) {
      return;
    }

    //Bý til nýtt niv með tilheyrandi börnum og event listeners.
    var divElement = el("li", "item");
    var inp = el("input", "item__checkbox");
    inp.setAttribute("type", "checkbox");
    inp.addEventListener('change', finish);
    divElement.appendChild(inp);
    var sp = el("span", "item__text");
    var y = document.createTextNode(textarea.value);
    sp.addEventListener('click', edit);
    sp.appendChild(y);
    divElement.appendChild(sp);
    var bt = el("button", "item__button");
    bt.classList.add("item__button");
    var z = document.createTextNode("Eyða");
    bt.addEventListener('click', deleteItem);
    bt.appendChild(z);
    divElement.appendChild(bt);
    add(divElement);
    textarea.value = '';

  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle("item--done");
    event.stopPropagation();
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    e.preventDefault();
    //Swissa út span fyrir input-text.
    var prevtext = e.target.textContent;
    var nyrtextarea = el('input', "item__text");
    nyrtextarea.setAttribute("type", "text");
    nyrtextarea.textContent = prevtext;
    var parent = e.target.parentElement;
    var x = e.target.nextSibling;
    parent.removeChild(e.target);
    parent.insertBefore(nyrtextarea, x);
    nyrtextarea.value = prevtext;
    nyrtextarea.addEventListener('keypress', commit);
    nyrtextarea.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.keyCode == ENTER_KEYCODE) {
      //swissa út intput-text fyrir span.
      var textarea = e.target;
      var prevtext = textarea.value;
      var nyrtextarea = el('span', "item__text");
      nyrtextarea.textContent = prevtext;
      var parent = e.target.parentElement;
      var x = e.target.nextSibling;
      parent.removeChild(e.target);
      parent.insertBefore(nyrtextarea, x);
      nyrtextarea.value = prevtext;
      nyrtextarea.addEventListener('click', edit);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {

    items.appendChild(value);

  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.preventDefault();
    var currentItem = e.target.parentElement;
    currentItem.parentElement.removeChild(currentItem);
    //console.log('delete');
    //console.log(e.target);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    var divElement = document.createElement(type);
    divElement.classList.add(className);

    return divElement;
  }

  // hjalparfall til að athuga hvort texti sé >0 eða <65
  function validateText(text) {
    if (text.length > 0 && text.length < 65) {
      return true;
    }
    else {
      return false;
    }
  }

  return {
    init: init
  }
})();
