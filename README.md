# Dragonvale Habitat Planner

[Dragonvale](http://www.backflipstudios.com/games/dragonvale/) is a mobile game by Backflip Studios. This app attempts to solve a problem encountered by high-level players who have hundreds of dragons and dozens of habitats and want to maximize the “earnings” their dragons produce.

By choosing a habitat here, you can then try out different combinations of dragons to discover how to get the most out of each habitat.

This app is not associated in any way with Backflip.

## Notes

* In this habitat
* With these dragons
* At these levels
* How long until max coins are reached? (in hours)

1. Choose habitat
2. Number of dragons is given
3. Eligible dragons are loaded
4. Pick a dragon and its level
5. When all dragons selected, get total time until full (or — total per hour?)

## Progress to date

* (17 Feb) Table created for all habitats that earn 1 million coins or more. Data in JSON (array of objects).
* Habitat table is sortable on all columns (DataTables library).
* (18 Feb) Two sections: "selectHab" for the habitat table, and "dragons" for the forms. These hide and show alternately (jQuery).
* Habitat table rows are clickable. Selecting a row grabs data for that one habitat from the JSON object, and writes it into a DL in "dragons" section.
* (21–23 Feb) Added most of the functionality for choosing dragons and the level for each of them. Earnings per minute fills automatically whenever you change the level. Level and Earnings both reset when you change to another dragon. Earnings for all dragons are added together and multiplied by 60 to give your earnings per hour, and the time needed to reach the habitat maximum is also calculated and displayed.
& (24 Feb) Done! 

## Left to do
* **Populate the dragon menu for two remaining groups, the combo Moon and Sun, and All.** (24 Feb: Done.)
* **Hide any extra fieldsets, e.g. when a habitat holds only 4 dragons, hide 2 of the 6 fieldsets.** (24 Feb: Done.)
* **Fix decimal places in "Time until habitat max."** (24 Feb: Done. Used `.toFixed(2)` to truncate and round up.)
