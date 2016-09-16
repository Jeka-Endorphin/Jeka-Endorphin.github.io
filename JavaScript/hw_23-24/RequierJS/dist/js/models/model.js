define('model', [],
  
function () {
  return function Model (data) {
    this.data = data ;
    this.addItem = (item) => {
      if (item.length === 0)  //проверка корректности на пустую строку
        return;
      
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
});