const m = {
    x: 42,
    getX: function() {
      return this.x;
    }
  };

  const unboundGetX =  m.getX;

  console.log(unboundGetX()) // undefined  The function gets invoked at the global scope

  const boundGetX = unboundGetX.bind(m)

  console.log(boundGetX())  // 42