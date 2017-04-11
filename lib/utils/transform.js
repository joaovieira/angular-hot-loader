module.exports = function (name, def) {
  let newDef = Object.assign({}, def);

  if (def.template) {
    newDef.template = () => this.templateCache[name];
  }

  if (def.controller && typeof def.controller === 'function') {
    const that = this;
    newDef.controller = function ($injector, $scope, $element, $attrs, $transclude) {
      return $injector.invoke(
        that.classTransform(that.controllerCache[name]),
        this,
        {
          $scope,
          $element,
          $attrs,
          $transclude
        }
      );
    };
  }

  return newDef;
};
