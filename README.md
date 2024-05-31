## Description
An app for picking names from a group who raise thier hands. Users go to a room, add thier name and raise thier hands when they want to volunteer for a activity. The organiser rolls the dice to pick a random name from the list.

The App uses `socket.io`/`websockets` to create a shared room between all the users so its a shared instance of a random name generator.

## How to contribute
1. cd into `frontend/`, run `npm install` and then `npm run dev` then go to `http://localhost:5173/`
2. cd into `backend/`, run `npm install` and then `npm run dev`. The server should be running on `http://localhost:3000/`
3. Create a pull request if you want to contribute
4. Once the pull request is approved and merged, it will auto deploy on netlify (frontend) and railway (backend)

### Screenshots
![image](https://github.com/nmpereira/name-picker/assets/45009203/a6fcf21e-c77c-4081-9ad4-8bad3a8d1265)
![image](https://github.com/nmpereira/name-picker/assets/45009203/3c7f6a99-7e68-4550-8417-cb6d31f8e394)
