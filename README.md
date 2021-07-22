# To Do List 2.0 (aka Two Do List)
  I kept it simple with this one. It similar to the to-do apps from earlier in the course, but with a few upgrades. It contains all the required attributes, including 
  -React front end
  -express back end with get, post, put, patch, and delete routes
  -Postgres database (through heroku deployed backend app)
  -CSS Styling to make it look less ugly
  -All deployed on Heroku at 
    https://crud-app-raykell-frontend.herokuapp.com/
    &&
    https://crud-app-raykell-backend.herokuapp.com/

## Navbar
Every page has access to a persistent navbar with links to the home page, add item page, and completed items page as well as a search bar where to-do items can be searched by name, through a database query via the express backend. All pages are linked through react-router-dom and the entire app functions as a single page application.

## Home
To Do List 2.0 loads opens on its home page which displays a list of incomplete to do items by their name and date, pulled from the database. Clicking on a to do item displays a detailed description of the item below its name. Each item also includes a complete button to mark an item complete, and an edit button to modify attributes of each item. Completing an item will remove it from the to do list and place it in the completed items list.

## Add an Item
Add an item allows a user to inupt information about a new items name, due date and description to submit to the to do list. Entering no information in the input fields results in the creation of a task with the default values of:
  Name: 'I need a name'
  Due date: 'anytime'
  Description: 'no description'

If incorrect data is entered when adding an item, the edit button can be used to update the database via a patch request. The submit button's on click funtionality includes an invocation of preventDefault to avoid a page re-render. Instead it acts as a react router-link back to the home page in addition to sending a request to the back-end.

## Completed
The `Completed` page shows a list of all items that have been marked as complete. From here, completed items can be marked uncomplete and returned to the to do list or deleted from the database entirely through use of their respective buttons.
 