# USSF Stuff Tracker

## Recreate
1. Open Terminal
2. 'cd' into the folder that you want to install to
3. 'git clone https://github.com/keithvandyck/ussf-stuff-tracker.git'
4. 'cd ussf-stuff-tracker'
5. 'npm install'
6. 'npm uninstall punycode'
7. 'npm run dev'
8. Open web browser & navigate to http://localhost:3000


## Starting the Project from Scratch
1. npx create-next-app@latest
2. npm install @prisma/client prisma bcryptjs jsonwebtoken
3. npx prisma generate
4. npx prisma db push
5. npm install jose

## Continuity
- Color scheme: https://flatuicolors.com/palette/us
- Font: Saira Condensed

## Stories Checklist
- ~As an inventory manager I want to be able to create an account so that I can track my inventory.~
- ~As an inventory manager I want to be able to log into my account so that I can see my inventory of items.~
  - ~After logging in, the inventory manager should be redirected to their inventory of items.~
- ~As an inventory manager I want to be able to create a new item so that I can share my item details with the world.~
  - ~After the item is created, the inventory manager should be redirected to their inventory of items.~
  - ~An item displays name, description, and quantity.~
- ~As an inventory manager I want to be able to see a my entire inventory of items.~
  - ~The inventory of items should display the first 100 characters of each item description, with “...” at the end if the description is longer than 100 characters.~
- ~As an inventory manager I want to be able to see any individual item I have added.~
  - ~The full item information should be displayed.~
- ~As an inventory manager I want to be able to edit an item so that I can fix any mistakes I made creating it.~
  - ~When the user toggles edit mode, the page remains the same and the fields become editable.~
- ~As an inventory manager I want to be able to delete an item so that I can remove any unwanted content.~
  - ~When the user deletes the item they should be redirected to their inventory of items.~
- ~As a visitor, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item.~
  - ~Unauthenticated users should be able to view all items, and any single item.~
  - ~The items should only display the first 100 characters of its description with “...” at the end if it is longer than 100 characters.~
- ~As a visitor, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details.~
  - ~Unauthenticated users should be able to view all items, and any single item.~
- ~As an inventory manager I want to be able to view all items created by every inventory manager so that I can browse every item.~
  - ~Unauthenticated users should be able to view all items, and any single item.~
