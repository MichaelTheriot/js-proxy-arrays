var getProp = (target, property) => typeof property !== 'symbol' && target.length && property < 0 && property >= -target.length ? +property + target.length : property;

var handler = {
  get: (target, property, receiver) => Reflect.get(target, getProp(target, property), receiver),
  set: (target, property, value, receiver) => Reflect.set(target, getProp(target, property), value, receiver)
};

var InvertedArray = new Proxy(function InvertedArray(arg1) {}, {
  construct: (target, arguments, newTarget) => new Proxy(Reflect.construct(Array, arguments, InvertedArray), handler)
});

Reflect.setPrototypeOf(InvertedArray, Array);
InvertedArray.prototype = Object.create(Array.prototype);

module.exports = InvertedArray;
