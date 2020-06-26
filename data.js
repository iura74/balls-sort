const lvl1 = [[0, 0, 1, 1], [1, 1, 0, 0], []];
const lvl2 = [[0, 0, 1, 2], [1, 1, 2, 0], [2, 1, 0, 2], []];
const levels = [lvl1, lvl2];

let curLavel = -1;
const nextLevelData = () => {
  curLavel = (curLavel < levels.length - 1) ? curLavel + 1: 0;
  return levels[curLavel];
};