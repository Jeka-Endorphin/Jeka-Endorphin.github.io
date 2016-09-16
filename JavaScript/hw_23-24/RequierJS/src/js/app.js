requirejs.config({
  paths: {
    'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery',
    'lodash': 'libs/lodash',
    'model': 'models/model',
    'view': 'views/view',
    'controller': 'controllers/controller'
  },
  //изменение имён модулей, указываются модули без define
  shim: {
    'jquery': {
      exports: 'jQuery' //что именно экспортируем
    },
  }
});

require(
  [ //dependensies list
    'model',
    'view',
    'controller',
    'jquery',
    'lodash'
  ],

  //start of application -->
function (Model, View, Controller, $, _ ) {
  const firstToDolist = ['выучить что-то новое', 'купить девушке цветы', 'сходить на тренировку', 'купить подарок на ДР'];
  let model = new Model(firstToDolist);
  let view = new View(model);
  let controller = new Controller(model, view);
});
