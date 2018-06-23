var carrinho = new Vue({
    el: '#meuCarrinho',
    data: {
        carros: [
            {nome: 'Gol', preco: 16000.00},
            {nome: 'Fusca', preco: 3450.00},
            {nome: 'Uno', preco: 9000.00},
            {nome: 'Camaro', preco: 190000.00}
        ],
        carrinho: [],
        subTotal: 0.00,
    },
    watch: {
        carrinho: function(){
            this.atualizarSubTotal();
        }
    },
    methods: {
        atualizarSubTotal: function(){
            var qtd = this.carrinho.length;
            var total = 0;
            for(var i = 0; i<qtd; i++){
                total = total+this.carrinho[i].preco;
            }
            this.subTotal = total;
        },
        comprar: function(carro){
            this.carrinho.push(carro);
        },
    },
})