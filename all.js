var app = new Vue({
    el: '#app',
    data: {
      dishes:{
        eggplant:{
            name:'魚香茄子',
            img:'https://images.unsplash.com/photo-1547647612-be4eb49541e4',
            main:[{name:'絞肉',num:'100g', checked:false},{name:'茄子',num:'兩條', checked:false}],
            seasoning:[{name:'豆瓣醬',num:'100g', checked:false},{name:'醬油',num:'兩湯匙', checked:false}],
            howto:['1.茄子切段後過油','2.絞肉炒香混入調味料','3.混合肉醬和茄子'],
            //火狐無法顯示 <ul class="howto"><li v-for="item in dish.howto">{{item}}</li></ul>
        },
        chicken:{name:'三杯雞',
            img:'https://images.unsplash.com/photo-1525755662778-989d0524087e',
            main:[{name:'雞肉',num:'半隻', checked:false},{name:'蒜頭、薑片',num:'適量', checked:false},{name:'九層塔',num:'適量', checked:false}],
            seasoning:[{name:'麻油',num:'兩湯匙', checked:false},{name:'醬油',num:'兩湯匙', checked:false},{name:'米酒',num:'兩湯匙', checked:false}],
            howto:['1.雞肉表面煎至金黃','2.爆香辛香料','3.加入調味料收乾','4.起鍋前加入九層塔'],
        },
        beef:{name:'牛肉麵',
            img:'https://images.unsplash.com/photo-1577859714523-5f0b6c98ece7',
            main:[{name:'牛腱肉',num:'1kg', checked:false},{name:'蘿蔔',num:'一條', checked:false}],
            seasoning:[{name:'豆瓣醬',num:'100g', checked:false},{name:'市售滷包',num:'一份', checked:false},{name:'醬油',num:'120ml', checked:false},],
            howto:['1.牛腱肉過水後切至小塊','2.炒香牛肉及醬料','3.加入滷包和水燉煮2小時','4.燉煮完畢後再加入切塊蘿蔔煮30分'],
        },
      },
      dish:[],
      cart:[],
      cartForOther:[],
      tempCart:'',
      phase:'home',
    },

    methods:{
        checkPhase: function(){
            let vm = this;
            let memoPhase = localStorage.getItem('phase');
            let memoCart = localStorage.getItem('cart');
            if(memoPhase == 'recipe'){
                vm.phase = localStorage.getItem('phase');
                vm.dish = JSON.parse(localStorage.getItem('dish'));
            }else if(memoPhase == 'cart'){
                vm.phase = localStorage.getItem('phase');
                if(memoCart){
                    vm.dish = JSON.parse(localStorage.getItem('dish'));
                    vm.cart = JSON.parse(localStorage.getItem('cart'));
                    vm.cartForOther = JSON.parse(localStorage.getItem('cartForOther'));
                }else{
                    vm.dish = JSON.parse(localStorage.getItem('dish'));
                }
                
            }
            
        },

        gotoRecipe: function(item){
            let vm = this;
            vm.dish = item;
            vm.phase='recipe';
            //localstorage
            let dishLS =JSON.stringify(vm.dish);
            localStorage.setItem('phase',vm.phase);
            localStorage.setItem('dish',dishLS);
            console.log(vm.dish);
        },
        goHome:function(){
            let vm = this;
            vm.phase = 'home';
            localStorage.setItem('phase',vm.phase)
            localStorage.removeItem("dish");
        },
        goList:function(){
            let vm = this;
            vm.phase = 'cart';
            localStorage.setItem('phase',vm.phase)
        },
        goBack:function(){
            let vm = this;
            vm.phase = 'recipe';
            localStorage.setItem('phase',vm.phase)
        },
        otherCartPlus:function(){
            let vm = this;
            if(vm.tempCart !== ''){
                let addchecked = new Object();
                addchecked.name=vm.tempCart;
                addchecked.checked=false;
                vm.cartForOther.push(addchecked);
                vm.tempCart = '';
            };
            
        },
        cartDel:function(index){
            let vm = this;
            console.log(index);
            vm.cartForOther.splice(index,1);
        },
        goCart:function(){
            let vm = this;
            vm.dish.main.forEach(item=>{
                if(item.checked){
                    item.checked = false;
                    vm.cart.push(item);
                    
                }
            });
            vm.dish.seasoning.forEach(item=>{
                if(item.checked){
                    item.checked = false;
                    vm.cart.push(item);
                }
            });
            vm.cartForOther = vm.cartForOther;
            let cartLS =JSON.stringify(vm.cart);
            let cartForOtherLS =JSON.stringify(vm.cartForOther);

            localStorage.setItem('cart',cartLS);
            localStorage.setItem('cartForOther',cartForOtherLS);    
        },
        backtoRecipe:function(){
            let vm = this;
            vm.cart=[];
            vm.cartForOther=[];
            localStorage.removeItem("cart");
            localStorage.removeItem("cartForOther");
        },

    },
    created(){
        this.checkPhase();
    },

    
  });
