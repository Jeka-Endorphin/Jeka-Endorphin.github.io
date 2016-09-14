'use strict'

// Model
function Model(data) {
	this.data = data ;
	
	this.addItem = (item) => {
		if (item.length === 0) 	return; //проверка корректности на пустую строку
		
		this.data.push(item);

		return this.data;
	};

	this.removeItem = (item) => {
		let index = this.data.indexOf(item);
		this.data.splice(index, 1);

		if (index === -1) return;

		return this.data;
	};

	this.saveChangesItem = (item) => {
		let index = this.data.indexOf(item.defaultValue);
		let changedValue = item.value;
		this.data[index] = changedValue;

		if (index === -1) return;

		return this.data;
	};
}

// View
function View(model) {
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

// Controller
function Controller(model, view) {
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

$(function() {
	const firstToDolist = ['выучить что-то новое', 'купить девушке цветы', 'сходить на тренировку', 'купить подарок на ДР'];
	let model = new Model(firstToDolist);
	let view = new View(model);
	let controller = new Controller(model, view);
});
