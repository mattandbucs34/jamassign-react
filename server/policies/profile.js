const ApplicationPolicy = require('./application');

module.exports = class ProfilePolicy extends ApplicationPolicy {
  destroy() {
    return this._isCoordinator();
  }
}