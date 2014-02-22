
/**
 * Module dependencies.
 */

var visit = require('rework-visit');

/**
 * Add defaults to all rules.
 *
 * Example:
 *
 *
 * @param {Object} props
 * @return {Function}
 * @api public
 */

module.exports = function(props){
  return function(style){
    visit(style, function(declarations){
      var keys = defined(declarations);
      var defs = Object.keys(props);

      for (var i = 0; i < defs.length; ++i) {
        if (keys[defs[i]]) continue;
        declarations.push({
          type: 'declaration',
          property: defs[i],
          value: props[defs[i]]
        });
      }
    });
  };
};

/**
 * Get all defined properties in `declarations`.
 *
 * @param {Array} declarations
 * @return {Object}
 * @api private
 */

function defined(declarations){
  return declarations.reduce(function(obj, item){
    if (!item.property) return obj;
    if (!item.value) return obj;
    obj[item.property] = true;
    return obj;
  }, {});
}
