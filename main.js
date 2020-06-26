
const colors = ['white', 'green', 'yellow', 'red', 'blue'];

function ball(ballType) {
  this.ballType = ballType;
  this.color = colors[ballType] || 'black';
}

function basket(init = []) {
  if (init.length > 4) throw new Error('Too Many Balls in the basket');
  this.balls = ko.observableArray(init.map(x => new ball(x)));
  this.canGet = ko.computed(() => this.balls().length > 0);
  this.canPut = ko.computed(() => this.balls().length < 4);
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
    return ballsArr.length === 4 && ballsArr.every(ball => ball.ballType === ballsArr[0].ballType);
  });
}

const vm = {
  baskets: ko.observableArray(getLevelData().map(x => new basket(x)))  
}

ko.applyBindings(vm);