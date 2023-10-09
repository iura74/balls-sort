const levels = [];

/*levels.push([[0, 0, 1, 1], [1, 1, 0, 0], []]);
levels.push([[0, 0, 1, 2], [1, 1, 2, 0], [2, 1, 0, 2], []]);
levels.push([[3, 0, 1, 2], [1, 1, 2, 0], [2, 1, 0, 3], [0, 3, 2, 3], []]);
levels.push([[3, 4, 1, 2], [1, 1, 4, 0], [2, 4, 4, 3], [0, 3, 2, 3], [0, 2, 1, 0], [], []]);*/
levels.push([[0, 1, 2, 3], [3, 4, 5, 2], [6, 0, 2, 3], [6, 1, 5, 7], [4, 8, 5, 7], [9, 0, 8, 9], 
             [2, 0, 1, 8], [3, 4, 7, 5], [4, 9, 8, 6], [6, 1, 7, 9], [], []]);

let curLavel = 0;
const nextLevel = () => {
  curLavel = (curLavel < levels.length - 1) ? curLavel + 1: 0;  
};
const currentLevelData = () => {  
  return levels[curLavel];
};
