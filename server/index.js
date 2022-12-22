const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cookieParser = require("cookie-parser")
const db = require('./db/database')
const route = require('./routes/routes')
db.connect()
app.use(express.json())
app.use(cookieParser())

// app.get("/", route.default1);
app.get("/priviledges", route.getPriviledges); //OK
app.get("/filters", route.getFilters); //OK

app.put("/addGame", route.verify, route.addGame); 
app.put("/modifyGame", route.verify, route.modifyGame);
app.delete("/deleteGame", route.verify, route.deleteGame);

app.post("/users", route.verify, route.getUsers);
app.put("/modifyUser", route.verify, route.modifyUser);
app.delete("/deleteUser", route.verify, route.deleteUser);

app.post("/library", route.verify, route.library); //OK
app.post("/addLibrary", route.verify, route.addLibrary); //OK
app.post("/deleteLibrary", route.verify, route.deleteLibrary); //OK

app.post("/search", route.search); //OK
app.post("/allgames", route.allgames);
app.post("/game", route.game); //OK
app.post("/getReview", route.getReview); //OK

app.put("/addReview", route.verify, route.addReview); //OK
app.put("/modifyReview", route.verify, route.modifyReview); //OK
app.delete("/deleteReview", route.verify, route.deleteReview); //OK
app.post("/myReviews", route.verify, route.myReviews); 

app.post("/signin", route.signin); //OK
app.post("/signup", route.signup); //OK 
app.post("/signout", route.signout ); //OK

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

