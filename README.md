# Automate Mental Modeler Scenarios: Run Exhaustive Combinations with Minimal Effort
An example of automating running factorial combinations of defined scenarios in the fuzzy cognitive mapping (FCM) application, Mental Modeler.

## How to Use
Note: Mental Modeler is a password protected website. To request access, fill out the information on the following page: https://www.mentalmodeler.com/

1. Create a model and define linkages.
2. Conceptually define the scenarios that you are trying to run.
3. Edit your copy of the script to include your defined scenarios.
4. Open Mental Modeler.
5. Copy the entire script edited with your values into the browser console (browser console can be accessed by typing the "F12" key).
6. Hit Enter and make sure no errors appear in the console.
7. Type runScenarios() in the browser console and hit Enter to run the script.
8. By default, a message will be posted in the browser console with the number of scenarios run at intervals of 25 scenarios.
9. The scenario outputs will be posted in the browser console as an array. The array will automatically be broken down into chunks of 100 by the browser. Expand each section of 100 scenarios and manually copy all the values.
10. Paste the values into Excel.
11. Ensure all the pasted cells are still highlighted, then open the "Data" tab in the top menu, and select the "Text to Columns" option in the "Data Tools section".
12. Choose the "Delimited" radio button and select the "Next" button.
13. Select "Comma" from the list of Delimiters and use the "Data Preview" to make sure it is separately correctly.
14. Click "Finish".
15. Get rid of the unnecessary double quotes (") using Find and Replace, which can be accessed by typing CTRL+F and selecting the "Replace" tab. Simply type a double quote into the first text box, then leave the second text box blank, and select "Replace All".
