
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
  return function(style, rule){
    style.rules.unshift(rule = {});
    rule.selectors = [];
    rule.type = 'rule';
    rule.declarations = [];

    for (var i = 1; i < style.rules.length; ++i) {
      if (!style.rules[i].selectors) continue;
      for (var j = 0; j < style.rules[i].selectors.length; ++j) {
        var selector = style.rules[i].selectors[j];
        if (~rule.selectors.indexOf(selector)) continue;
        rule.selectors.push(selector);
      }
    }

    rule.declarations = toDeclarations(props);
  };
};

/**
 * Transform object to declarations.
 *
 * @param {Object} props
 * @return {Array}
 * @api private
 */

function toDeclarations(props){
  var keys = Object.keys(props);
  return keys.reduce(function(ret, key){
    return ret.concat({
      type: 'declaration',
      property: key,
      value: props[key]
    });
  }, []);
};