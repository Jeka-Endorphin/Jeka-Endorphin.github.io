'use strict';

// Model

function Model(data) {
	var _this = this;

	this.data = data;

	this.addItem = function (item) {
		if (item.length === 0) {
			//проверка корректности на пустую строку
			return;
		}
		_this.data.push(item);

		return _this.data;
	};

	this.removeItem = function (item) {
		// debugger
		var index = _this.data.indexOf(item);
		_this.data.splice(index, 1);

		if (index === -1) {
			return;
		}
		return _this.data;
	};
}

// View
function View(model) {
	var _this2 = this;

	var init = function init() {
		// переписать на стрелочную ф-цию
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
	view.elements.listContainer.on('click', '.item-delete', removeItem);

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
}

$(function () {
	var firstToDolist = ['learn js', 'learn html', 'learn css', 'learn something'];
	var model = new Model(firstToDolist);
	var view = new View(model);
	var controller = new Controller(model, view);
});