import $ from 'jquery';
import store from './store';
import item from './item';

const generateItemElement = function (item) {
  let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
  if (!item.checked) {
    itemTitle =  
    `
      <span class='shopping-item'>${item.name}</span>
    `;
  }
  if (item.editing){
    itemTitle = generateEditHtml(item.name);
  }
  if (!item.checked){
    return `
      <li class='js-item-element' data-item-id='${item.id}'>
        ${itemTitle}
        <div class='shopping-item-controls'>
          <button class='shopping-item-toggle js-item-toggle'>
            <span class='button-label'>check</span>
          </button>
          <button class='shopping-item-delete js-item-delete'>
            <span class='button-label'>delete</span>
          </button>
          <button class='shopping-item-edit js-item-edit'>
          <span class='button-label'>edit</span>
          </button>
        </div>
      </li>`;
  } else {
    return `
      <li class='js-item-element' data-item-id='${item.id}'>
        ${itemTitle}
        <div class='shopping-item-controls'>
          <button class='shopping-item-toggle js-item-toggle'>
            <span class='button-label'>check</span>
          </button>
          <button class='shopping-item-delete js-item-delete'>
            <span class='button-label'>delete</span>
          </button>
        </div>
      </li>`;
  }
};

//generate HTML for form to be inserted if editing is set to true
const generateEditHtml = function (itemName) {
  return `
    <form id= "editSubmit">
      <label for="shopping-list-edit"></label>
      <input type="text" name="shopping-list-edit" class="js-shopping-list-edit" placeholder=${itemName}
      </input>
        <button type="submit">Submit</button>
    </form>`;
};

const generateShoppingItemsString = function (shoppingList) {
  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join('');
};

const render = function () {
  // Filter item list if store prop is true by item.checked === false
  let items = [...store.items];
  if (store.hideCheckedItems) {
    items = items.filter(item => !item.checked);
  }

  // render the shopping list in the DOM
  const shoppingListItemsString = generateShoppingItemsString(items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
};

const handleNewItemSubmit = function () {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    store.addItem(newItemName);
    render();
  });
};

const handleItemCheckClicked = function () {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const id = getItemIdFromElement(event.currentTarget);
    store.findAndToggleChecked(id);
    render();
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};

const handleDeleteItemClicked = function () {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the index of the item in store.items
    const id = getItemIdFromElement(event.currentTarget);
    // delete the item
    store.findAndDelete(id);
    // render the updated shopping list
    render();
  });
};

//event handler, on click of edit button, turn editing to true for event target item
const handleEditClicked = function () {
  $('.js-shopping-list').on('click', '.js-item-edit', event => {
    const id = getItemIdFromElement(event.currentTarget);
    store.toggleEditForListItem(id);
    render();
  });
};

const handleEditShoppingItemSubmit = function () {
  $('.js-shopping-list').on('submit','#editSubmit', event => {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-edit').val();
    const id = getItemIdFromElement(event.currentTarget);
    store.toggleNameForListItem(id, newItemName);
    render();
  });
};

const handleToggleFilterClick = function () {
  $('.js-filter-checked').click(() => {
    store.toggleCheckedFilter();
    render();
  });
};

const handleEdit = function () {
  handleEditClicked();
  handleEditShoppingItemSubmit();
};

const bindEventListeners = function () {
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEdit();
  handleToggleFilterClick();
};

// This object contains the only exposed methods from this module:
export default {
  render,
  bindEventListeners
};