**THE FROG'S PROBLEM**

A frog is crossing a river. The river is divided into some number of units, and at each unit, there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water. Given a list of stones' positions (in units) in sorted ascending order, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be 1 unit.

If the frog's last jump was k units, its next jump must be either k - 1, k, or k + 1 units. The frog can only jump in the forward direction.

Example 1:
Input: stones = [0,1,3,5,6,8,12,17]
Output: true

Example 2:
Input: stones = [0,1,2,3,4,8,9,11]
Output: false

Constraints:

2 <= stones.length <= 2000
0 <= stones[i] <= 231 - 1
stones[0] == 0
stones are sorted in a strictly increasing order.

**EXPLANATION**

I started by separating the parts of the problem into several functions to keep the code cleaner through separation of concerns. I created a function isValidStones that is responsible for validating all the conditions that the list of stones must meet, and it uses another function isSortedAscending to verify that the list is correctly sorted in ascending order.

Once the main function obtained true values in the checks of the conditions for the list of stones, the part that solves the problem begins. We enforce that the very first jump must be length 1 (from stone 0 to stone 1); if not, the algorithm terminates immediately.

In order to validate the list of stones, I chose to store in a map the list of possible jumps associated with each position of the list of stones. This is necessary because you have to take previous jumps into account to know the future ones; that is why it is important to keep in each stone the “jumps” with which you can reach it: from each of those jumps you must try k-1, k and k+1 because they will be the candidates for the “next jump.”

Before traversal, we seed stone 0 with a jump of length 0 to initialize the algorithm.

Once you start traversing the list, you check that there is at least one possible jump associated with the current stone, then for each possible jump you verify k-1, k and k+1. In case the possible jump lands on another stone, it is then stored. This process repeats until finishing traversing the list and at the end, if there is at least one valid jump associated with the last position, then the frog will be able to cross the river.

###Choice of Data Structures

**Map**: allows you to associate each stone position with its set of possible jumps in O(1), and it also maintains insertion order, which matches the way you traverse positions.  

**Set**: ensures that jumps for each stone are unique and supports insertion and lookup in O(1), avoiding duplicates and keeping the solution efficient.  
