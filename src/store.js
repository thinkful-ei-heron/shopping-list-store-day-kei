import item from './item';

const items = [];
let hideCheckeditems = false;

const findById = function(id) {
  return this.items.find(item => item.id === id);
};

const addItem = function(name) {
  try {
    item.validateName(name);
    this.items.push(item.create(name));
  } catch (e) {
    console.log(e.message);
  }
};

const findAndToggleChecked = function (id) {
  const item = this.findById(id);
  item.checked = !item.checked;
};

const findAndUpdateName = function (id, name) {
  try {
    item.validateName(name);
    const newItem = this.findById(id);
    newItem.name = name;
  } catch (e) {
    console.log('Cannot update name: ' + e.message);
  }
};

const findAndDelete = function (id) {
  this.items = this.items.filter(item => item.id !== id);
};

const toggleCheckedFilter = function () {
  this.hideCheckedItems = !this.hideCheckedItems;
};

//edit store to set iitem name to passed parameter, editing to false
const toggleNameForListItem = function (id, newItemName) {
  const foundItem = this.items.find(item => item.id === id);
  foundItem.name = newItemName;
  foundItem.editing = false;
};

const toggleEditForListItem = function (id){
  const foundItem = this.items.find(item => item.id === id);
  foundItem.editing = true;
};


export default {
  items,
  hideCheckeditems,
  findById,
  addItem,
  findAndToggleChecked,
  findAndUpdateName,
  findAndDelete,
  toggleCheckedFilter,
  toggleNameForListItem,
  toggleEditForListItem
};