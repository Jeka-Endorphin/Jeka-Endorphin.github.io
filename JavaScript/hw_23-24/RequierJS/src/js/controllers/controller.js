define( 'controller', ['jquery', 'view', 'model'],

function ( $ ) {
  return function Controller (model, view) {
    view.elements.addBtn.on('click', addItem);
    view.elements.input.on('keypress', (key) => {
      let enter = 13;
      if (key.keyCode == enter)
        addItem();
    });
    view.elements.listContainer.on('click', '.item-delete', removeItem);
    view.elements.listContainer.change(saveChangesItem);

    function addItem() {
      let newItem = view.elements.input.val();
      model.addItem(newItem);
      view.renderList(model.data);
      view.elements.input.val('');
    };

    function removeItem() {
      let item = $(this).attr('data-value');
      model.removeItem(item);
      view.renderList(model.data)
    }

    function saveChangesItem(e) {
      let item = e.target;
      model.saveChangesItem(item);
      view.renderList(model.data)
    }
  }
});