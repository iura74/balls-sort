
const basketSize = 4;

function ball(ballType) {
  this.ballType = ballType;
  this.css = `color-${ballType}`;
  this.equals = other => this.ballType === other.ballType;
}

function basket(init = [], index = 0) { 
  this.balls = ko.observableArray(init.map(x => new ball(x))); 
  this.index = index;
  this.canGet = () => !this.trust() ;
  this.canPut = (ball) => this.balls().length === 0 || 
                          this.balls().length < basketSize && this.top().equals(ball);
  this.top = () => this.balls()[this.balls().length - 1];
  this.get = () => this.balls.pop();
  this.put = (ball) => this.balls.push(ball);
  this.empty = ko.computed(() => !this.balls().length);
  this.fullSome = ko.computed(() => this.balls().every(ball => ball.equals(this.balls()[0])));
  this.fillTrust = ko.computed(() => this.balls().length === basketSize && this.fullSome());
  this.trust = ko.computed(() => this.empty() || this.fillTrust());
  this.active = ko.computed(() => this === vm.preGetBasket());  

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
    vm.baskets(currentLevelData().map((x, i) => new basket(x, i))).history([]);
  },
  back() {
    vm.preGetBasket(null);
    const [to, from] = vm.history.pop();
    vm.baskets()[to].put(vm.baskets()[from].get());
  }
}

ko.applyBindings(vm);
vm.loadLevel();