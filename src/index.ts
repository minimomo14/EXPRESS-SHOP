// require the express module
import express from 'express';
import shopRoutes from './routes/shop-routes';
import path from 'path';
 
// require the cors module
import cors from 'cors';
 
// creates an instance of an Express server
const app = express();

//configuring handlebars
app.use(express.urlencoded({ extended: false }));  //allows us to use form data
app.set('views', path.join(__dirname, 'views')); //tells the view files are in view folder
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
 
// enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors())
 
// allow POST and PUT requests to use JSON bodies
app.use(express.json())

//routes files
app.use("/", shopRoutes); //localhost:3000
app.use("/api/shop",shopRoutes)
 
// define the port
const port = 3000;
 
// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));