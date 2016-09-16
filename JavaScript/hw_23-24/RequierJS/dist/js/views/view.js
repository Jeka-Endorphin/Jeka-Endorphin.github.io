define('view',
    ["jquery", 'lodash', 'model'],
function ( $, _ ) {
  return function View (model) {
    let init = () => {
      let wrapper = _.template($('#wrapper-template').html());
      $('body').prepend(wrapper);
      this.elements = {
        input: $('.item-value'),
        addBtn: $('.item-add'),
        listContainer: $('.item-list')
      };
      this.renderList(model.data);
    };

    this.renderList = data => {
      let list = _.template( $('#list-template').html());
      this.elements.listContainer.html( list({data: data}) );
    };
    init();
  }
});