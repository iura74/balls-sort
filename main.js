
const basketSize = 4;

function ball(ballType) {
  this.ballType = ballType;
  this.css = `color-${ballType}`;
  this.equals = other => this.ballType === other.ballType;
}

function basket(init = [], index = 0) { 
  this.balls = ko.observableArray(init.map(x => new ball(x))); 
  this.index = index;
  this.canGet =() => this.balls().length > 0;
  this.canPut = (ball) => this.balls().length === 0 || 
                          this.balls().length < basketSize && this.top().equals(ball);
  this.top = () => this.balls()[0];
  this.get = () => this.balls.shift();
  this.put = (ball) => this.balls.unshift(ball);
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
      if (this !== vm.preGetBasket() && this.canPut(vm.preGetBasket().top())) {
        this.put(vm.preGetBasket().get());
        vm.history.push([vm.preGetBasket().index, this.index]);
      }
      vm.preGetBasket(null);
    }
  }
}

const vm = {
  baskets: ko.observableArray(),
  preGetBasket: ko.observable(null),
  history: ko.observableArray(),
  win: ko.pureComputed(() => vm.baskets().every(basket => basket.trust())),
  nextLevel() {
    nextLevel();
    vm.loadLevel();
  },
  loadLevel() {
    vm.baskets(currentLevelData().map((x, i) => new basket(x, i)));
  },
  back() {
    vm.preGetBasket(null);
    const [to, from] = vm.history.pop();
    vm.baskets()[to].put(vm.baskets()[from].get());
  }
}

ko.applyBindings(vm);
vm.loadLevel();