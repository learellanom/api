import { Router, Request, Response } from "express";
import { types } from "./types";

const myProducts = require('./Data/products.json');

const router = Router();

const products: types[] = myProducts;

function getTopCheapestAvailable(){
    let products3 = products;
    products3.sort((a, b) => {
        if (a.price < b.price) return 1;
        if (a.price > b.price) return -1;
        return 0;
        // return a.price - b.price; // b - a para descendente
    });     
    products3 = products.filter( (item)=> {
        return String(item.isAvailable) ==  'true';
    });    
    let i = 0;
    products3 = products3.filter( (item,index)=> {
       i++;
       if (i <= 3) return item;
   });  
   
   return products3;
}
router.get("/getTopCheapestAvailable", (req: Request, res: Response) => {

    res.json(getTopCheapestAvailable());
});

// 
router.get("/products", (req: Request, res: Response) => {

    const sort = req.query.sort;
    const order = req.query.order;
    const available = req.query.available;
    const limit = req.query.limit;
    const search = req.query.search;


    let products3 = products;
    
    if(search){

        products3 = products.filter((item) => {
            let myString = JSON.stringify(item).replace(/\\/g, '');

            let encuentra = myString.includes(String(search));
            

                return encuentra == true;
        });
        

    }

    switch (sort){
        case 'price':
            switch (order){
                case 'desc':
                    products3.sort((a, b) => {
                        if (a.price < b.price) return 1;
                        if (a.price > b.price) return -1;
                        return 0;
                        // return a.price - b.price; // b - a para descendente
                    }); 
                    // products3 = products;
                    
                    break;
                case 'asc':
                    products3.sort((a, b) => {
                        if (a.price < b.price) return -1;
                        if (a.price > b.price) return 1;
                        return 0;
                        // return a.price - b.price; // b - a para descendente
                    });          
                    // products3 = products;        
                    break;
            }
        case 'name':
            switch (order){
                case 'asc':
                    products3.sort((a, b) => {
                        const nombreA = a.name.toUpperCase(); // Ignora mayúsculas/minúsculas
                        const nombreB = b.name.toUpperCase();

                        if (nombreA < nombreB) {
                            return -1; // a va antes que b
                        }
                        if (nombreA > nombreB) {
                            return 1;  // a va después que b
                        }
                        return 0;    // los nombres son iguales            

                    });
                   // products3 = products;
                    break;
                case 'desc':
                    products3.sort((a, b) => {
                        const nombreA = a.name.toUpperCase(); // Ignora mayúsculas/minúsculas
                        const nombreB = b.name.toUpperCase();

                        if (nombreA < nombreB) {
                            return 1; // a va antes que b
                        }
                        if (nombreA > nombreB) {
                            return -1;  // a va después que b
                        }
                        return 0;    // los nombres son iguales            

                    });
                    // products3 = products;
                    break;                
            }
    }

    if (available){
        products3 = products.filter( (item)=> {
            return String(item.isAvailable) == available;
        });
    
    }
    if (limit){
        let i = 0;
         products3 = products3.filter( (item,index)=> {
            i++;
            if (i <= Number(limit)) return item;
        });

    }
    res.json(products3);

  });
//
router.get("/products/:id", (req: Request, res: Response) => {
    // const productId = parseInt(req.params.id);

    const productId = req.params.id;
    const product = products.find(b => b.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });

  router.get('/img/:img', function(req, res){
    
    const img = req.params.img;
    console.log(`In router: ${req.method}:${req.originalUrl}`);

    res.sendFile( __dirname + `/img/${img}` );
  });

export default router;