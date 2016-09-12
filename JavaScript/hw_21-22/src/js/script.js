'use strict';

const app = {
  test: {
    questions: ['Вопрос №1', 'Вопрос №2', 'Вопрос №3', 'Вопрос №4'],
    answers: [ 
              ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
              ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3', 'Вариант ответа №4', 'Вариант ответа №5'],
              ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
              ['Вариант ответа №1', 'Вариант ответа №2'] 
             ],
    rightAnsw: ['q0a0', 'q1a0', 'q2a0', 'q3a0']
  },
  radioAll: null,
  checkedRadioValues: null,
  result: null,
  genModal: () => {
    const mod = $('<div id="openModal" class="modalDialog"></div>');
    const closeLink = $('<a href="#close" title="Закрыть" class="close">X</a>');
    const innerMod = $('<div ></div>').attr('id', 'innerMod'); 
    innerMod.prepend(closeLink, '<h2></h2>');
    mod.prepend(innerMod).prependTo('body');
  },  
  getUserAnswers: () => {
    app.radioAll = $('input[type=radio]');
    $.each(app.radioAll, (i) => {
      if (app.radioAll[i].checked) {
        console.log(app.radioAll[i]);
        app.checkedRadio.push(app.radioAll[i].getAttribute('value'));
      };  
    })
    return app.checkedRadio;
  },
  checkResult: () => {
    app.cleanResults();
    app.getUserAnswers();
    return app.result = app.checkedRadio == String(app.test.rightAnsw) ? true : false;
  },
  cleanResults: () => { 
    app.checkedRadio = [];
  },
  restoreChekedRadio: () => {
    $.each(app.radioAll, (i) => {
      if (app.radioAll[i].checked) 
        app.radioAll[i].checked = !app.radioAll[i].checked;
    })
  },
  showResultInModal: () => {
    app.checkResult();

    if( app.result ) { //не понятно с this - вместо app не подходит
      $(openModal).addClass('modalDialog--active')
                  .css('background', 'rgba(100,250,100,0.8)')
                  .find('h2')
                  .html(`Тест пройден успешно!`);
    } else {
      $(openModal).addClass('modalDialog--active')
                  .css('background', 'rgba(0,0,0,0.8)')
                  .find('h2')
                  .html(`Тест провален. Попробуйте еще.`);
    };

    app.restoreChekedRadio();
    return false;
  },

  closeModalLink: () => {
    $(openModal).removeClass('modalDialog--active')
  },

  closeModal: (e) => {
    if ($(e.target).closest('#innerMod').length == 0 && $(e.target).attr('id') != 'submit' ) {
      $(openModal).removeClass('modalDialog--active');
    }
  }
};

try {
  $(function () {
    const tmpl = $('#html').html();
    $('body').prepend(_.template(tmpl));

    app.genModal();

    $('#submit').on('click', app.showResultInModal);
    $('.close').on('click', app.closeModalLink);
    $(document).on('click', app.closeModal);
  });
} catch(e) {
   console.log('error:', e);
};
