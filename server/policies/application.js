module.exports = class ApplicationPolicy {
  constructor(user, record, collaborator) {
    this.user = user;
    this.record = record;
    this.collaborator = collaborator;
  }

  _isUser() {
    return this.record && (this.record.userId == this.user.id);
  }

  _isAdmin() {
    return this.user && this.user.role == "admin";
  }

  _isCoordinator() {
    return this.user && this.user.role == "coordinator";
  }

  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

  show() {
    return this.user != null;
  }

  edit() {
    return this.new() &&  this.record && this._isUser();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}