'use strict';

// Model

function Model(data) {
	var _this = this;

	this.data = data;

	this.addItem = function (item) {
		if (item.length === 0) return; //проверка корректности на пустую строку

		_this.data.push(item);

		return _this.data;
	};

	this.removeItem = function (item) {
		var index = _this.data.indexOf(item);
		_this.data.splice(index, 1);

		if (index === -1) return;

		return _this.data;
	};

	this.saveChangesItem = function (item) {
		var index = _this.data.indexOf(item.defaultValue);
		var changedValue = item.value;
		_this.data[index] = changedValue;

		if (index === -1) return;

		return _this.data;
	};
}

// View
function View(model) {
	var _this2 = this;

	var init = function init() {
		var wrapper = _.template($('#wrapper-template').html());
		$('body').prepend(wrapper);

		_this2.elements = {
			input: $('.item-value'),
			addBtn: $('.item-add'),
			listContainer: $('.item-list')
		};

		_this2.renderList(model.data);
	};

	this.renderList = function (data) {
		var list = _.template($('#list-template').html());
		_this2.elements.listContainer.html(list({ data: data }));
	};

	init();
}

// Controller
function Controller(model, view) {
	view.elements.addBtn.on('click', addItem);
	view.elements.input.on('keypress', function (key) {
		var enter = 13;
		if (key.keyCode == enter) addItem();
	});
	view.elements.listContainer.on('click', '.item-delete', removeItem);
	view.elements.listContainer.change(saveChangesItem);

	function addItem() {
		var newItem = view.elements.input.val();
		model.addItem(newItem);
		view.renderList(model.data);
		view.elements.input.val('');
	};

	function removeItem() {
		var item = $(this).attr('data-value');
		model.removeItem(item);
		view.renderList(model.data);
	}

	function saveChangesItem(e) {
		var item = e.target;
		model.saveChangesItem(item);
		view.renderList(model.data);
	}
}

$(function () {
	var firstToDolist = ['выучить что-то новое', 'купить девушке цветы', 'сходить на тренировку', 'купить подарок на ДР'];
	var model = new Model(firstToDolist);
	var view = new View(model);
	var controller = new Controller(model, view);
});