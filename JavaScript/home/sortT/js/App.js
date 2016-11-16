"use strict"
let App;

App = (function () {
  let Constr;

  Constr = function () {
    
    this.dataBigHash = {"id":"ID","firstName":"Имя","lastName":"Фамилия","gender":"Пол","company":"Компания","job":"Должность"};
    this.dataSmallHash = {"firstName":"Имя","lastName":"Фамилия","job":"Должность"};
    this.dataCustomHash = {};
    this.isFiltered = false;
    this.isSorted = false;
    this.selectedRow = null;
    this.name = null;
    
    this.div = null;
    this.pagination = null;
    this.table = null;
    
    this.newData = [];
    this.currentData = [];
  };
    
  Constr.prototype = {
    constructor: App,
    version: 1,
    db: function () {
    try {
      return JSON.parse(localStorage.getItem('datab'));
    } catch (e) {
      alert( "Извините, в данных ошибка, мы попробуем получить их ещё раз" );
      alert(`${e.name}: ${e.message}`);
    }
    },

    getNewData: function (hash) {
      let data = this.db();
      let array = [],
          keys = Object.keys(hash),
          keysLength = keys.length,
          i,
          n = data.length;

      array[0] = hash;
      for (i = 1; i < n; i += 1) {
        let currentArr = [],
            key; 
        for (key in data[i]) { 
          for (let j = 0; j < keysLength; j += 1) { 
            if (key == keys[j]) {
              currentArr.push(data[i][key]);
            }
          };
        };
        array.push(currentArr);
      };

      this.newData = array;
      this.currentData = array;
    },

    initDOM: function (data) {
      this.div = document.createElement('div');
      this.div.className = 'table-wrapper';
      this.div.innerHTML = `<p><label>Search: <input type="search"></label></p>`;
      this.selectedRow = document.createElement('div');
      this.selectedRow.classList.add('selected-row'); 
      this.div.appendChild(this.selectedRow);
      document.getElementById('wrapper').insertBefore(this.div, document.getElementById('additional'));
      this.renderTableHead(this.newData);
      this.paginateDataAndRenderTbody();
    },

    setTableName: function (name) {
      let caption = this.table.createCaption();
      caption.innerHTML = `<h3>Таблица с набором данных "${name}"</h3>`;
    },

    renderTableHead: function (data) {
      this.table = document.createElement('table');
      let input = document.createElement('input'),
          thead = this.table.createTHead(),
          that = this, 
          row, th, cell, key;

      row = thead.insertRow();

      for (key in data[0]) {
        th = document.createElement('TH');
        th.innerText = data[0][key];
        
        (function () {
          let direction = 1;
          th.addEventListener('click', function (i) {
            let index = i.target.cellIndex;
            that.sortData(index, (direction = 1 - direction));
          });
        }());
      
        row.appendChild(th);
      };
      this.div.insertBefore(this.table, this.selectedRow);
    },

    paginateDataAndRenderTbody: function () {
      //bench start
      let sum = 0, d = new Date;

      let data = this.newData.slice(),
          max = data.length - 1,
          linesInPage = 50,
          pages = Math.ceil(max/linesInPage),
          p = document.createElement('p'),
          ul = document.createElement('ul'),
          arr = [], 
          newdata;

      if (this.pagination) {
        this.div.removeChild(this.div.lastChild);
      }

      for (let i = 0; i < pages; i += 1) {
        let link = document.createElement('a'),
            li = document.createElement('li'),
            that = this,
            dataclone = data;

        link.setAttribute('href', '#');
        link.innerHTML = i + 1;
        li.appendChild(link);
        ul.appendChild(li);
        ul.classList.add('pagination__list');

        link.addEventListener('click', function (ev) {
          let index = i * linesInPage + 1;
          ev.preventDefault();
          arr[0] = dataclone[0];
          newdata = arr.concat(dataclone.slice(index, index + linesInPage));
          that.renderTBody(newdata);
        });
      };

      arr[0] = data[0];
      newdata = arr.concat(data.slice(1, linesInPage + 1 ));
      this.renderTBody(newdata);

      p.innerHTML = `<span>Pages: </span>`;
      p.classList.add('pagination');
      p.appendChild(ul);
      this.div.appendChild(p);
      this.pagination = p;
        
      //end of bench
      sum += new Date - d; 
      console.log('--App-- рендер занял: ' + sum + 'мс'); 
    },

    renderTBody: function (data) {
      let tbody,
          i,
          j = data.length - 1;

      if (this.table.tBodies[0]) {
        tbody = this.table.tBodies[0];
        tbody.innerHTML = '';
      } else {
        tbody = this.table.createTBody();
      };

      for (i = 1; i <= j; i +=1 ) {
        let row = tbody.insertRow(),
            iLeng = data[i].length,
            cell, k;
        for(k = 0; k < iLeng; k += 1){
          cell = row.insertCell(-1);
          cell.innerText = data[i][k];
        };
      };

      tbody.addEventListener('click', (ev) => {
        this.selectedRow.innerHTML = `Выбранная строка: <span>${ev.target.parentElement.innerText}</span>`;
      });

      this.table.appendChild(tbody);
    },


    sortData: function (col, reverse) {
      let data = this.isFiltered ? this.newData.slice() : this.currentData.slice(),
          arrays,
          hash,
          sorted,
          newdata = [];

      reverse = -((+reverse) || -1);

      arrays = data;
      if (!arrays[0].length){
        hash = arrays.shift();
      };

      sorted = arrays.sort(function (a, b) {
        let aСell = a[col],
            bСell = b[col],
            isNumber = !isNaN(aСell || bСell);

        if (isNumber){ 
          return reverse * (parseFloat(bСell) - parseFloat(aСell)); 
        };
        return reverse * (bСell.localeCompare(aСell));
      });

      newdata.push(hash);
      for(let i = 0, n = arrays.length; i < n; i +=1){ 
        newdata.push(sorted[i]);
      };
      this.isSorted = true;
      this.newData = newdata; 
      this.paginateDataAndRenderTbody();
    },

    filterTBody: function (phrase) {
      try {
        let words = phrase.toLowerCase().split(" "),
            data = this.currentData.slice(),
            elem, r, n, 
            newData = [];

        if (!phrase) {
          this.isFiltered = false;
        };
        newData[0] = data.shift(); 
        for (r = 0, n = data.length; r < n ; r += 1){
            elem = data[r].join();
            for (let i = 0, l = words.length; i < l; i++) {
                if (elem.toLowerCase().indexOf(words[i])>=0) {
                  newData.push(data[r]);
              this.isFiltered = true;
                };
            }
        };
        this.newData = newData; 
        this.paginateDataAndRenderTbody();
      } catch(e) {
        alert(`Ошибка ${e.name}: ${e.message}`);
      }
    },

    render: function (hash) {
      this.getNewData(hash);
      this.initDOM();
    },

    hideButtons: function () {
      document.getElementById('additional').classList.add('hide');
      document.getElementById('btn_add').classList.remove('hide');
    }
  };

  return Constr;

}());


/* ---- Listeners ---------*/
document.getElementsByClassName('btn_small')[0].addEventListener('click', function () {
  let obj = new App();
  obj.render(obj.dataSmallHash);
  obj.div.querySelector('input').addEventListener('input', function () {
    obj.filterTBody(this.value);
  });
  obj.setTableName(this.innerHTML);
  obj.hideButtons()
});

document.getElementsByClassName('btn_big')[0].addEventListener('click', function () {
  let obj = new App();
  obj.render(obj.dataBigHash);
  obj.div.querySelector('input').addEventListener('input', function () {
    obj.filterTBody(this.value);
  });
  obj.setTableName(this.innerHTML);
  obj.hideButtons()
});

document.getElementsByClassName('btn_custon')[0].addEventListener('click', function (ev) {
  ev.preventDefault();
  let obj = new App(),
      form = ev.target.parentElement,
        checkboxes = form.elements.customTable,
        length = checkboxes.length,
        i;

  for (i = 0; i < length; i += 1 ){
    if (checkboxes[i].checked) {
      obj.dataCustomHash[(checkboxes[i].placeholder)] = checkboxes[i].value; 
    };
  };
  if ( !Object.keys(obj.dataCustomHash).length ) {
    return;
  };

  obj.render(obj.dataCustomHash);
  obj.div.querySelector('input').addEventListener('input', function () {
    obj.filterTBody(this.value);
  });
  obj.setTableName(this.innerHTML);
  obj.hideButtons()
});

document.getElementById('btn_add').addEventListener('click', function (ev) {
  document.getElementById('additional').classList.remove('hide');
  this.classList.add('hide');
});
