'use strict'
var newDom = {
  elem: null,
  title: 'Тест по програмированию',
  parentElem: document.body,
  textNode: document.createTextNode('\n'),
  create: function (tag) {
    this.elem = document.createElement(tag);
  },
  inner: function (text) {
    this.elem.innerHTML = text;
  },
  parent: function (param) {
    this.parentElem = document.querySelectorAll(param);    
  },
  append: function (index) {
    this.parentElem[index].appendChild(this.elem);
  },
  setAttribute: function (atr1, value1, atr2, value2, atr3, value4) {
    this.elem.setAttribute(atr1, value1);
    this.elem.setAttribute(atr2, value2);
    this.elem.setAttribute(atr3, value4);
  },
  buid: function () {
    this.create('form');
    this.setAttribute('method', 'get', 'action', '#');
    this.parent('body');
    this.append(0);
    this.create('h2');
    this.inner(this.title);
    this.parent('form');
    this.append(0);
    this.create('ol'); 
    this.parent('form');
    this.append(0);
    for (var i = 0; i < 3; i++) {
      this.create('li'); // 1й уровень li
      this.parent('ol');
      this.append(0);
      this.create('h4');
      this.inner('Вопрос №' +(i+1));
      this.parent('ol > li');
      this.append(i);
      for (var j = 0; j<3; j++){
        this.create('input');
        this.parent('ol>li');
        this.setAttribute('type', 'checkbox', 'name', 'tip'+(i), 'id', 'tip'+i+'answ'+j);
        this.append(i);
        this.create('label');
        this.setAttribute('for', 'tip'+i+'answ'+j);
        this.inner('Вариант ответа №' +(j+1) + '</br>');
        this.append(i);
      }; 
    }; 
    this.create('input');
    this.setAttribute('type', 'submit', 'value', 'Проверить мои результаты', 'id', 'submit');
    this.parent('form');
    this.append(0);
  } //bild
};

newDom.buid();
