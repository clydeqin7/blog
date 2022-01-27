# this

## 前言

`this`关键字是 JavaScript 中很重要的一个概念，本文主要参考 MDN 上的内容<sup>[1]</sup>，梳理总结而成。总结思维导图如下

![this 思维导图](./img/this-mindmap.png)
## this的值

`this`的值是当前执行代码的环境对象，在非严格模式下，总是指向一个对象，在严格模式<sup>[2]</sup>下可以是任意值 

## 全局环境

无论是否在严格模式下，在全局执行环境中（在任何函数体外部）`this`都指向全局对象。

```js
// 在浏览器中, window 对象同时也是全局对象：
console.log(this === window); // true
```

## 函数（运行内）环境

### 简单调用

不在严格模式下，且调用函数时未设置 `this` 的值，`this`的值默认为全局对象。

```js
function fn() {
	return this;
}

fn() === window; // true
```

严格模式下，`this` 将保持它进入执行环境的值，默认是`undefined`。

```js
function fn() {
	'use strict'; // 使用严格模式的声明
	return this;
}

fn() === undefined; // true 
window.fn() === window; // true
```

### call和apply设置this值

我们可以`call`和`apply`修改代码的执行环境对象。

```js 
var obj = { a: 'aplpah' };
var a = 'global';
function whatsThis(arg) {
    return this.a;
}
whatsThis(); // "global"
whatsThis.call(obj); // "aplpah"
whatsThis.apply(obj); // "aplpah"
```

使用`call`和`apply`函数的时候要注意，如果传递给 `this` 的值不是一个对象，JavaScript 会尝试使用内部  `ToObject` 操作将其转换为对象。因此，如果传递的值是一个原始值比如 `7` 或 `'foo'`，那么就会使用相关构造函数将它转换为对象，所以原始值 `7` 会被转换为对象，像`new Number(7)` 这样，而字符串`'foo'` 转化成 `new String('foo')` 这样，例如：

```js
function bar() {
  console.log(Object.prototype.toString.call(this));
}

//原始值 7 被隐式转换为对象
bar.call(7); // [object Number]
bar.apply('foo'); // [object String]
```

## bind方法

调用`f.bind(someObject)`会创建一个与`f`具有相同函数体和作用域的函数，但是在这个新函数中，`this`将永久地被绑定到`bind`的第一个参数，无论这个函数是如何被调用的。

+ `bind`只生效一次
+ 不管这个函数是如何被调用的，包括`call`和 `apply` 等方法

```js
function f() {
    return this.a;
}
var g = f.bind({ a: 'alpha' });
g(); // "alpha"
var h = g.bind({ a: 'bravo' });
h(); // "alpha"
var l = g.call({ a: 'charlie' });
l; // "alpha"
var o = { a: 37, f: f, g: g, h: h, l: l };
console.log(o.a, o.f(), o.g(), o.h(), o.l); // 37 37 "alpha" "alpha" "alpha"
```

## 箭头函数

在箭头函数中，`this`与封闭词法环境的`this`保持一致。在全局代码中，它将被设置为全局对象：

```js
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true
```

> 注意：如果将`this`传递给 `call`、 `bind` 、或者`apply` 来调用箭头函数，它将被忽略。不过你仍然可以为调用添加参数，不过第一个参数（`thisArg`）应该设置为`null`。

```js
// 接着上面的代码
// 作为对象的一个方法调用
var obj = {foo: foo};
console.log(obj.foo() === globalObject); // true

// 尝试使用call来设定this
console.log(foo.call(obj) === globalObject); // true

// 尝试使用bind来设定this
foo = foo.bind(obj);
console.log(foo() === globalObject); // true
```

无论如何，`foo`的`this`被设置为他被创建时的环境（在上面的例子中，就是全局对象）。这同样适用于在其他函数内创建的箭头函数：这些箭头函数的`this`被设置为封闭的词法环境的。

```js
// 创建一个含有bar方法的obj对象，
// bar返回一个函数，
// 这个函数返回this，
// 这个返回的函数是以箭头函数创建的，
// 所以它的this被永久绑定到了它外层函数的this。
// bar的值可以在调用中设置，这反过来又设置了返回函数的值。
var obj = {
  bar: function() {
    var x = (() => this);
    return x;
  }
};

// 作为obj对象的一个方法来调用bar，把它的this绑定到obj。
// 将返回的函数的引用赋值给fn。
var fn = obj.bar();

// 直接调用fn而不设置this，
// 通常(即不使用箭头函数的情况)默认为全局对象
// 若在严格模式则为undefined
console.log(fn() === obj); // true

// 但是注意，如果你只是引用obj的方法，
// 而没有调用它
var fn2 = obj.bar;
// 那么调用箭头函数后，this指向window，因为它从 bar 继承了this。
console.log(fn2()() == window); // true
```

在上面的例子中，一个赋值给了 `obj.bar`的函数（称为匿名函数 A），返回了另一个箭头函数（称为匿名函数 B）。因此，在`A`调用时，函数B的`this`被永久设置为obj.bar（函数A）的`this`。当返回的函数（函数B）被调用时，它`this`始终是最初设置的。在上面的代码示例中，函数B的`this`被设置为函数A的`this`，即obj，所以即使被调用的方式通常将其设置为 `undefined` 或全局对象（或者如前面示例中的其他全局执行环境中的方法），它的 `this` 也仍然是 `obj` 。

##  作为对象的方法

当函数作为对象里的方法被调用时，它们的 `this` 是调用该函数的对象。

```js
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f()); // 37
```

`this` 的绑定只受最靠近的成员引用的影响。

```js
var o = {prop: 37};

function independent() {
  return this.prop;
}

o.f = independent;
console.log(o.f()); // 37

o.b = {g: independent, prop: 42};
console.log(o.b.g()); // 42
```

### 原型链中的this

> 对于在对象原型链上某处定义的方法，同样的概念也适用。如果该方法存在于一个对象的原型链上，那么`this`指向的是调用这个方法的对象，就像该方法在对象上一样。

```js
var o = {
  f: function() { 
    return this.a + this.b; 
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```

### getter与setter中的this

再次，相同的概念也适用于当函数在一个 `getter` 或者 `setter` 中被调用。用作 `getter` 或 `setter` 的函数都会把 `this` 绑定到设置或获取属性的对象。

```js
function sum() {
  return this.a + this.b + this.c;
}

var o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3;
  }
};

Object.defineProperty(o, 'sum', {
    get: sum, enumerable: true, configurable: true});

console.log(o.average, o.sum); // logs 2, 6
```

## 作为构造函数

当一个函数用作构造函数时（使用new关键字<sup>[3]</sup>），它的`this`被绑定到正在构造的新对象。

> 虽然构造器返回的默认值是`this`所指的那个对象，但它仍可以手动返回其他的对象（如果返回值不是一个对象，则返回`this`对象）。

```js
/*
 * 构造函数这样工作:
 *
 * function MyConstructor(){
 *   // 函数实体写在这里
 *   // 根据需要在this上创建属性，然后赋值给它们，比如：
 *   this.fum = "nom";
 *   // 等等...
 *
 *   // 如果函数具有返回对象的return语句，
 *   // 则该对象将是 new 表达式的结果。 
 *   // 否则，表达式的结果是当前绑定到 this 的对象。
 *   //（即通常看到的常见情况）。
 * }
 */

function C(){
  this.a = 37;
}

var o = new C();
console.log(o.a); // logs 37


function C2(){
  this.a = 37;
  return {a:38};
}

o = new C2();
console.log(o.a); // logs 38
```

在刚刚的例子中（`C2`），因为在调用构造函数的过程中，手动的设置了返回对象，与`this`绑定的默认对象被丢弃了。（这基本上使得语句 “`this.a = 37;`”成了“僵尸”代码，实际上并不是真正的“僵尸”，这条语句执行了，但是对于外部没有任何影响，因此完全可以忽略它）

## 作为一个DOM事件处理函数

当函数被用作事件处理函数时，它的`this`指向触发事件的元素（一些浏览器在使用非`addEventListener`的函数动态添加监听函数时不遵守这个约定）。

```js
// 被调用时，将关联的元素变成蓝色
function bluify(e){
  console.log(this === e.currentTarget); // 总是 true

  // 当 currentTarget 和 target 是同一个对象时为 true
  console.log(this === e.target);        
  this.style.backgroundColor = '#A5D9F3';
}

// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*');

// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for(var i=0 ; i<elements.length ; i++){
  elements[i].addEventListener('click', bluify, false);
}
```

## 作为一个内联事件处理函数

当代码被内联on-event 处理函数<sup>[4]</sup>调用时，它的`this`指向监听器所在的DOM元素：

```html
<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>
```

上面的 alert 会显示`button`。注意只有外层代码中的`this`是这样设置的：

```html
<button onclick="alert((function(){return this})());">
  Show inner this
</button>
```

在这种情况下，没有设置内部函数的`this`，所以它指向 global/window 对象（即非严格模式下调用的函数未设置`this`时指向的默认对象）。

## 参考引用

[1] this：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this

[2] 严格模式：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode

[3] new关键字：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new

[4] on-event 处理函数：https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Event_handlers