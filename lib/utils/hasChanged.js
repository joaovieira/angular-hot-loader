/**
 * Get content of all the methods in the class definition,
 * (e.g. constructor and any other prototype methods).
 *
 * @param {Function|Array} cls - Controller class or function definition.
 * @return {string}
 */
function getClassContent (cls) {
  if (!cls.prototype) {
    const fn = Array.isArray(cls) ? cls[1] : cls;
    return fn.toString();
  }

  let content = '';
  const props = Object.getOwnPropertyNames(cls.prototype);
  for (let prop of props) {
    content += cls.prototype[prop].toString();
  }
  return content;
}

module.exports = function (name, def) {
  if (!this.templateCache[name]) return true;
  const templateChanged = def.template.toString() !== this.templateCache[name].toString();

  // No need to check class, if template already changed.
  // Assuming template is smaller than controller class.
  if (templateChanged) return true;

  if (!this.controllerCache[name]) return true;
  const controllerChanged = getClassContent(def.controller) !== getClassContent(this.controllerCache[name]);

  return controllerChanged;
};
