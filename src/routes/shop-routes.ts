import express from "express";
import Shop from "../models/Shop";
const shopRoutes = express.Router();

const shops: Shop[] = [
    { id: 111, name: "Pepper's Pizza", rating: 4.5 },
    { id: 222, name: "Clive's Chives", rating: 3.4 },
    { id: 333, name: "Bretty's Brews", rating: 4.3 },
    { id: 444, name: "Sylvester's Shoes", rating: 3.8 },
    { id: 555, name: "Teddy's Tunes", rating: 4.7 }
];

let nextId: number = 666;

//GET /homepage
shopRoutes.get("/", function (req, res){
    res.render('home');
});

//GET /shop-list
shopRoutes.get("/shop-list", function (req,res){
    res.render('shop-list', {shops});  
});

//GET /shop-details/:id
shopRoutes.get("/shop-details/:id", function (req, res) {
	let idNum: number = parseInt(req.params.id);
	let match = shops.find((shop) => shop.id === idNum);
	if (match) {
		res.render("shop-details", { match });
	} else {
		res.status(404).render("404", {idNum});
	}
});

//GET /search-form
shopRoutes.get("/shop-search-form/:id", function (req,res) {
    res.render('shop-search-form');
});



//Query ?minRating=4.0
shopRoutes.get("/api/shop", function(req, res){
    let minRatingParam: string = req.query.minRating as string;
    if(minRatingParam){
        //req.query.minRating
        let minRating: number = Number.parseFloat(minRatingParam);
        // if shops[i].rating >= req.query.minRating
        console.log(minRating);
        let filteredShops: Shop[] = shops.filter(shop => shop.rating >= minRating);
        res.json(filteredShops);
    } else {
        res.json(shops);
    }
});

shopRoutes.post("/api/shop", function(req, res){
    let newShop: Shop = {id: nextId, name: req.body.name, rating: req.body.rating};
    // newShop.id = nextId;
    nextId += 111;
    shops.push(newShop);
    res.status(201);
    res.json(newShop);
});

shopRoutes.delete("/api/shop/:id", function(req, res){
    //use id parameter to delete the corresponding Shop object from shops []
    let inputId: number = Number.parseInt(req.params.id);
    //loop through shops array
        //if inputId matches the shop[i].id
        //shops.splice(i);
    //use the find method and test if shop.id matches inputId
        //return that shop
    let shopIndex: number = shops.findIndex(shop => shop.id === inputId);
    console.log(shopIndex);
    shops.splice(shopIndex, 1);
    res.status(204);
    res.json("");
});

shopRoutes.get("/:id", function(req, res){
    // req.params.id shops[i].id
    //search shop array
    for(let i=0; i<shops.length; i++){
        let inputId: number = Number.parseInt(req.params.id);
        //find shop by id property
        if(shops[i].id === inputId) {
            //return the json response with the shop object
            res.json(shops[i]);
            break;
        }
    }
    res.status(404);
    res.send({"Error": "Shop not found"});
});


export default shopRoutes;