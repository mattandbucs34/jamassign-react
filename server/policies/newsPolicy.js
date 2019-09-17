const AppPolicy = require('./application');

module.exports = class CoordinatorPolicy extends AppPolicy {

  new() {
    return this._isCoordinator();
  }

  create() {
    return this.new();
  }

  edit() {
    return this._isCoordinator();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}