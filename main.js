
const basketSize = 4;

function ball(ballType) {
  this.ballType = ballType;
  this.css = `color-${ballType}`;
  this.equals = other => this.ballType === other.ballType;
}

function basket(init = []) {
  if (init.length > basketSize) throw new Error('Too Many Balls in the basket');
  this.balls = ko.observableArray(init.map(x => new ball(x)));
  this.canGet = ko.computed(() => this.balls().length > 0);
  this.canPut = ko.computed(() => this.balls().length < basketSize);
  this.get = () => {
    if (!this.canGet()) throw new Error('You can`t get ball from basket');
    return this.balls.pop();
  };
  this.put = (ball) => {
    if (!this.canPut()) throw new Error('You can`t get ball from basket');
    return this.balls.push(ball);
  };
  this.trust = ko.computed(() => {
    const ballsArr = this.balls();
    return ballsArr.length === 0 || 
      ballsArr.length === basketSize && ballsArr.every(ball => ball.equals(ballsArr[0]));
  });
  this.active = ko.pureComputed(() => this === vm.preGetBasket());

  this.preGet = () => {
    if (this.canGet()) {
      vm.preGetBasket(this);
    } else {
      vm.preGetBasket(null);
    }
  }
  this.click = () => {   
    if (!vm.preGetBasket()){
      this.preGet();
    } else {
      if (this !== vm.preGetBasket() && this.canPut()) {
        this.put(vm.preGetBasket().get());
      }
      vm.preGetBasket(null);
    }
  }
}

const vm = {
  baskets: ko.observableArray(),
  preGetBasket: ko.observable(null),
  win: ko.pureComputed(() => vm.baskets().every(basket => basket.trust())),
  nextLevel() {
    vm.baskets(nextLevelData().map(x => new basket(x)));
  },
  revertLevel() {
    vm.baskets(currentLevelData().map(x => new basket(x)));
  }
}

ko.applyBindings(vm);
vm.nextLevel();