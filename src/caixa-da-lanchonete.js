class CaixaDaLanchonete {

  calcularValorDaCompra(metodoDePagamento, itens) {

    const productsTable = [
      { code: 'cafe', description: 'Café', amount: 3, extra: null },
      { code: 'chantily', description: 'Chantily (extra do Café)', amount: 1.5, extra: 'cafe' },
      { code: 'suco', description: 'Suco Natural', amount: 6.2, extra: null },
      { code: 'sanduiche', description: 'Sanduíche', amount: 6.5, extra: null },
      { code: 'queijo', description: 'Queijo (extra do Sanduíche)', amount: 2, extra: 'sanduiche' },
      { code: 'salgado', description: 'Salgado', amount: 7.25, extra: null },
      { code: 'combo1', description: '1 Suco e 1 Sanduíche', amount: 9.5, extra: null },
      { code: 'combo2', description: '1 Café e 1 Sanduíche  ', amount: 7.5, extra: null }
    ]
    
    const foodList = []
    let itemsPrice = 0
    let hasInvalidFoodAccompaniment = false
    let hasInvalidFoodQuantity = false
    let hasInvalidFoodItem = false

    itens?.map((item) => {
      const commaIdx = item.indexOf(',')
      if (commaIdx === -1)
      {return hasInvalidFoodItem = true }      
      const food = item.slice(0, commaIdx)
      const quantity = item.slice(commaIdx + 1)
      foodList.push({ food, quantity })
    })

    foodList?.map((item) => {
      const productList = productsTable.map((item)=>item.code)
      if(productList.indexOf(item.food) === -1){
        hasInvalidFoodItem = true
      }
    })

    foodList?.map((item) => {
      itemsPrice += productsTable?.find((product) => product.code === item.food)?.amount * item.quantity
    })

    foodList?.map((item) => {
      let extra = productsTable?.find((product) => product.code === item.food)?.extra
      if (extra !== null) {
        const itens = foodList.map((el)=>el.food)
        if (itens.indexOf(extra) === -1) {
          hasInvalidFoodAccompaniment = true
        }
      }
    })

    foodList?.map((item)=> {
      if(item.quantity < 1){ 
        hasInvalidFoodQuantity = true
      }
    })

    if (!(['dinheiro', 'debito', 'credito'].includes(metodoDePagamento))) {
      return ('Forma de pagamento inválida!')
    }
    if(hasInvalidFoodQuantity){
      return ('Quantidade inválida!')
    }
    if(hasInvalidFoodItem){
      return ('Item inválido!')
    }
    if (metodoDePagamento && itens.length < 1) {
      return ('Não há itens no carrinho de compra!')
    }
    if (hasInvalidFoodAccompaniment === true) {
      return ('Item extra não pode ser pedido sem o principal')
    }
    if (metodoDePagamento === 'dinheiro') {
      const amount = (itemsPrice - itemsPrice * 0.05).toFixed(2) 
      return Number(amount).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
    if (metodoDePagamento === 'debito') {
      const amount =  (itemsPrice).toFixed(2) 
      return Number(amount).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
    if (metodoDePagamento === 'credito') {
      const amount = (itemsPrice + itemsPrice * 0.03).toFixed(2) 
      return Number(amount).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
  }

}
export { CaixaDaLanchonete };

// - Caso item extra seja informado num pedido que não tenha o respectivo item principal, apresentar mensagem "Item extra não pode ser pedido sem o principal".
// - Combos não são considerados como item principal.
// - É possível pedir mais de um item extra sem precisar de mais de um principal.
// - Se não forem pedidos itens, apresentar mensagem "Não há itens no carrinho de compra!"
// - Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!".
// - Se o código do item não existir, apresentar mensagem "Item inválido!"
// - Se a forma de pagamento não existir, apresentar mensagem "Forma de pagamento inválida!"
