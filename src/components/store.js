export default class Store {
  constructor(storage, key) {
    this._storage = storage;
    this._key = key;
  }

  getItems() {
    return this._getAll();
  }

  setItem(item) {
    const items = this._getAll();
    items[item.id] = item;

    try {
      this._storage.setItem(this._key, JSON.stringify(items));
    } catch (err) {
      throw new Error(`Storage error: ${err}`);
    }
  }

  setItems(items) {
    items.map((it) => this.setItem(it));
  }

  removeItem(id) {
    const items = this._getAll();
    delete items[id];

    try {
      this._storage.setItem(this._key, JSON.stringify(items));
    } catch (err) {
      throw new Error(`Storage error: ${err}`);
    }
  }

  _getAll() {
    const emptyObj = {};
    let jsonItems = null;
    let items = null;

    try {
      jsonItems = this._storage.getItem(this._key);
    } catch (err) {
      throw new Error(`Storage error: ${err}`);
    }

    if (jsonItems) {
      try {
        items = JSON.parse(jsonItems);
      } catch (err) {
        throw new Error(`Storage JSON parse error: ${err}`);
      }
    }

    if (!items) {
      return emptyObj;
    } else {
      return items;
    }
  }
}
