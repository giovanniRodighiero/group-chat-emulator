# Project description
Very simple CHAT web application that runs exclusively in the browser.
UI will be composed by a Messages' List and a TextInput that simulates 3 users that send messages to each others.

* User 1: you
* User 2: Mario: he will reply to your messages with a joke from https://api.humorapi.com/jokes/
random
* User 3: Luigi. He will send random insults taken from https://api.humorapi.com/insult at a set or
random interval
* User can fill the TextInput, and pressing "Enter" the message will be sent to the Messages List
together with username and datetime, these will appear in the Messages List in a well-styled
way (some CSS required).
* If TextInput is empty when "Enter" is pressed an error will appear.
* User can delete a Message by pressing some icon that appear only on mouseover, contained in
the Message element.
* Messages will appear from bottom to top in the Messages List.

Bonus: persist the state of the application, allowing refresh page without losing data. (Didn't do it xD)

## Tech stack
* Vite, Vitest, Prettier, Testing Library
* Tailwindcss, clsx, PostCSS, Autoprefixer
* Typescript, React, Axios

## Dev Instructions
* `npm install`
* rename `.env-sample` to `.env` and change the variables values accordingly
* `npm run dev` starts the web server in development `localhost:3000`
* `npm run test` runs the unit tests`
* `npm run build` bundles the code for production
* Luigi is set to send his message every 10 seconds
