Function.prototype.myBind = function(object) {
  var func = this;
  return function () {
    func.apply(object);
  }
}


// `times` is the same:
function times(num, fun) {
  for (var i = 0; i < num; i++) {
    fun(); // call is made "function-style"
  }
}

var cat = {
  age: 5,

  ageOneYear: function () {
    this.age += 1;
  }
};

// Function argument is different:
times(10, cat.ageOneYear.myBind(cat));