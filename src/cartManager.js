import fs from "fs";

let carts = [];
const pathFile = "./src/data/carts.json";

const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
  const cartsPars = JSON.parse(cartsJson);
  carts = cartsPars || [];
};

const createCart = async () => {
  await getCarts();
  const newCart = {
    id: carts.length + 1,
    products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  return newCart;
};

const getCartById = async (cid) => {
  
  await getCarts();
  const cart = carts.find((c) => c.id === cid);
  return cart;
};

const addProductToCart = async (cid, pid) => {
  await getCarts();
  const index = carro.findIndex((cart)=>cart.id === cid);
  const cart = carro [index];

  //Busco el producto dentro del carrito
  const productIndex = cart.products.findIndex((product)=>product.propduct === pid);

  if(productIndex !==-1){
    //lo encontre entonces ++1
    cart.products[productIndex].quantity+=1;

  }else{
    //no existe entonces lo agrego
    const product = {
      product:pid,
      quantify:1,
    };
    cart.products.push(product);
    }


  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  
  return carts[index];
};

export default {
  getCarts,
  getCartById,
  addProductToCart,
  createCart,
};