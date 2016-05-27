var getProp = (target, property) => typeof property !== 'symbol' && target.length && property < 0 && property >= -target.length
  ? +property + target.length
  : property;

var handler = {
  get: (target, property, receiver) => Reflect.get(target, getProp(target, property), receiver),
  set: (target, property, value, receiver) => Reflect.set(target, getProp(target, property), value, receiver)
};

function InvertedArray(arg1) {
  return new Proxy(Reflect.construct(Array, arguments, new.target || InvertedArray), handler);
}
Reflect.setPrototypeOf(InvertedArray, Array);
Reflect.setPrototypeOf(InvertedArray.prototype, Array.prototype);

module.exports = InvertedArray;
