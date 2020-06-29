const levels = [];

levels.push([[0, 0, 1, 1], [1, 1, 0, 0], []]);
levels.push([[0, 0, 1, 2], [1, 1, 2, 0], [2, 1, 0, 2], []]);
levels.push([[3, 0, 1, 2], [1, 1, 2, 0], [2, 1, 0, 3], [0, 3, 2, 3], []]);


let curLavel = 0;
const nextLevel = () => {
  curLavel = (curLavel < levels.length - 1) ? curLavel + 1: 0;  
};
const currentLevelData = () => {  
  return levels[curLavel];
};