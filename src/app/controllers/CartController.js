const Cart = require('../../lib/cart');
const loadProductsService = require('../services/LoadProductService')

module.exports = {
  async index(req, res) {
    try {
      let { cart } = req.session;

      // gerenciador de carrinho
      cart = Cart.init(cart);

      return res.render('cart/index', { cart });
    } catch (err) {
      console.log(err);
    }
  },
  async addOne(req, res) {
    //pegar o id do produto e o produto
    const { id } = req.params;
    const product = await loadProductsService.load('product', { where: { id } });
    //pegar o carrinho da senssão
    let { cart } = req.session;

    cart = Cart.init(cart).addOne(product);
    req.session.cart = cart;

    return res.redirect('/cart');

  },
  removeOne(req, res) {
    //pegar o id do produto
    const { id } = req.params;
        //pegar o carrinho da sessãp
    let { cart } = req.session;
    //se não tiver carrinho só retornar
    if (!cart) return res.redirect('/cart');

    //iniciar o carrinho
    cart = Cart.init(cart).removeOne(id);
    req.session.cart = cart;

    return res.redirect('/cart');
  },
  delete(req, res) {
    const { id } = req.params;
    let { cart } = req.session;

    if (!cart) return;

    req.session.cart = Cart.init(cart).delete(id);

    return res.redirect('/cart');
  }
};
