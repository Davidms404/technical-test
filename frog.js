const stones = [0,1,3,5,6,8,12,17];
const stones2 = [0,1,2,3,4,8,9,11];

function isSortedAscending(list) {
  //verify if the array is sorted ascending
  
  for (let i = 1; i < list.length; i++) {
    if (list[i] < list[i - 1]) {
      return false;
    }
  }

  return true;
}

function isValidStones (stones) {
  /*
  Constraints:
  * 2 ≤ stones.length ≤ 2000
  * 0 ≤ stones\[i] ≤ 2³¹ − 1
  * stones\[0] == 0
  * stones are sorted in a strictly increasing order. 
  * the first jump must be 1 unit. 
  */
  const lowerLimit = 2, upperLimit = 2000;
  const numStones = stones.length;
  const MAX_INT_32 = Math.pow(2, 31) - 1;

  if (numStones < lowerLimit || numStones > upperLimit) return false;
  if (!isSortedAscending(stones)) return false;

  if (stones[0] === 0 && stones[1] === 1) {
    for (let i = 0; i < numStones; i++) {
      if (stones[i] < 0 || stones[i] > MAX_INT_32) {
        return false;
      }
    }
  }
  else {
    return false;
  }

  return true;
}

function canCrossRiver (stonePositions) {
  //validations
  if (!isValidStones(stonePositions)) return false;
  if ((stonePositions[1] - stonePositions[0]) !== 1) return false;

  const numStones = stonePositions.length, lastStone = stonePositions[numStones - 1];

  //using this map, every stone has an empty jump set. Here will be stored every possible jump for each stone
  const jumpsForStone = new Map(
    stonePositions.map((position) => [position, new Set()])
  );
  
  //first position, there is a '0' distance to reach the first position
  jumpsForStone.get(0).add(0);
  
  //begin iterating through the list
  for (const position of stonePositions) {
    const possibleJumps = jumpsForStone.get(position);

    // skip this stone if it’s unreachable
    if (possibleJumps.size === 0) continue;
    
    for (const jump of possibleJumps) {
      //try k-1, k and k+1 for every jump of the possible jumps set

      for (let step = (jump - 1); step <= (jump + 1); step++) {
        if (step > 0 && jumpsForStone.has(position + step)) {
          //if there is a way to reach other position, that jump distance will be stored in the map of jumps for the specific stone
          jumpsForStone.get(position + step).add(step);
        }
      }
    }
  }

  //if upon arrival of last position, there is at least one valid jump, the result will be true
  return jumpsForStone.get(lastStone).size > 0;
}

console.log(canCrossRiver(stones2));