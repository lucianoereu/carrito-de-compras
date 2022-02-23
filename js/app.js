 /* ***************constantes******************* */
/* container producots */
const contenedorProductos = document.querySelector('#contenedor-productos');
/* carrito */
const itemsCarrito = document.querySelector('#items');
/* pie carrito */
const footerCarro = document.querySelector('#footer-carrito');
/*  template card*/
const template = document.querySelector('#template-producto').content;
/* boton comprar */
const btnComprar = document.getElementById("btn-compra");
/* carrito de compras */
let carrito = {};

/* llamado DOM */
document.addEventListener("DOMContentLoaded", () => {articulos 
/* respaldo de carrito en localstorage */
if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'));
    productosCarrito();
}  });

/* recorro data json */
/* ajax */
let  articulos = "";
$.ajax({
    url: "js/api.json",
    dataType: "json",
    success: (respuesta) => {
        articulos = respuesta;
        pintarProductos(articulos);
        detectarBoton(articulos);
    },
});


function data () {
    console.log(carrito);
}


/* dibujamos tarjetas */
/* llamo data para dibujar tarjetas */
const pintarProductos = (articulos) => {
        
        const fragmento = document.createDocumentFragment();
    /* console.log(template); */
     
    
    /* recorro json para dibujar elementos */
    articulos.forEach(producto => {
            // console.log(producto); 
            /* llamo cada elemento del recorrido */
            template.querySelector('img').setAttribute('src', producto.url);
            template.querySelector('h5').textContent = producto.title;
            template.querySelector('p').textContent = producto.precio +'$';
            template.querySelector('button').dataset.id = producto.id;

            /* clono tarjetas */
            const clone = template.cloneNode(true);
            fragmento.appendChild(clone);
        });

        /* duplico e imprimo tarjetas */
        /* agregando al dom */
        contenedorProductos.appendChild(fragmento);

        
/*  animaciones con jquery */
        
        
    };
   
       

    /* detectar botnoes */
const detectarBoton = (articulos) => {
    /* boton de las tarjetas */
    const botones = document.querySelectorAll('#bonton-agregar');
    /* console.log(botones); */
    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            /* vista de botones */
            // console.log("me diste click");
            //console.log(e.target.dataset.id);    
            const producto = articulos.find(item => item.id === parseInt(btn.dataset.id))
            //console.log(producto); 
            producto.cantidad = 1;
            /* sumar al carrito */
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1;
            }  
            /* sprite operador */
            carrito[producto.id]= {...producto}
            // console.log(carrito);
            /* llamo funcion */
            productosCarrito();
            
        });
});

};
/*  */

/* funcion carrito */
const productosCarrito = () => {
    itemsCarrito.innerHTML = '';
    const template = document.querySelector('#template-carrito').content;
    const fragmento = document.createDocumentFragment();
    Object.values(carrito).forEach(producto => {
        
        template.querySelectorAll('td')[0].textContent = producto.title;
        template.querySelectorAll('td')[1].textContent = producto.cantidad;
        template.querySelector('span').textContent = producto.precio * producto.cantidad;

        /* botones suma y resta */
        template.querySelector('#suma').dataset.id = producto.id;
        template.querySelector('#resta').dataset.id = producto.id;


        const clone = template.cloneNode(true);
        fragmento.appendChild(clone);
})
itemsCarrito.appendChild(fragmento);

/* funciones del carrito */
pintarFooterCarrito();
accionBotones();
/* llamada al local para cargar el carrito de compras */
localStorage.setItem('carrito', JSON.stringify(carrito));
};

/* pintar footer del carrito */
const pintarFooterCarrito = () => {

    footerCarro.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        footerCarro.innerHTML = '<p>Carrito vacio :(</p>';
    return};


    const template = document.querySelector('#template-footer').content;
    const fragmento = document.createDocumentFragment();
    /*  sumar los totales y la cantidad */
    /* cantidad de productos en el carrito */
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad})=> acc + cantidad, 0);
    //console.log(nCantidad);
    /* suma total */
    const nTotal = Object.values(carrito).reduce((acc, {precio, cantidad})=> acc + (precio * cantidad), 0);
    //console.log(nTotal);
    template.querySelectorAll('td')[0].textContent = nCantidad;
    template.querySelector('span').textContent = nTotal;

    const clone = template.cloneNode(true);
    fragmento.appendChild(clone);
    footerCarro.appendChild(fragmento);

/* vaciar carrito */
const botonVaciar = document.querySelector('#vaciar-carrito');
botonVaciar.addEventListener('click', () => {
    carrito = {};
    pintarFooterCarrito();
    productosCarrito();

});
/* cambio de boton comprar */
if (Object.keys(carrito).length === 0) {
    btnComprar.innerHTML = '<p>Carrito vacio :(</p>';
    
} else { (Object.keys(carrito).length !== 0) 
    btnComprar.innerHTML = '<p>Comprar</p>';
    btnComprar.classList.add('btn-primary');
        btnComprar.classList.remove('disabled');
    
};
};




/* accion botones */
const accionBotones = () => {
    const botonAgregar = document.querySelectorAll('#suma');
    const botonEliminar = document.querySelectorAll('#resta');
    
    botonAgregar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const producto = carrito[e.target.dataset.id];
            producto.cantidad++;
            productosCarrito();
        });
    });
    botonEliminar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const producto = carrito[e.target.dataset.id];
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                delete carrito[e.target.dataset.id];
            }
            productosCarrito();
            
            
        });
    });

    
};
/* funcion boton comprar */
btnComprar.addEventListener('click', () => {
const modal = document.querySelector('#exampleModalLabel');
//console.log(modal);

if (Object.keys(carrito).length === 0) {
    btnComprar.innerHTML = '<p>Carrito vacio :(</p>';
        btnComprar.classList.add('disabled');
        btnComprar.classList.remove('btn-primary');
        modal.innerHTML = '<p>Carrito vacio :(</p>';
        
        ;
    return
        
    } else { (Object.keys(carrito).length !== 0) 
        btnComprar.innerHTML = '<p>Comprar</p>';
        //console.log('carrito lleno');
        modal.innerHTML = '<p>Compra Exitosa</p>';
    carrito = {};
    pintarFooterCarrito();
    productosCarrito();
    }
});

/* texto animado */

const typed = new Typed('.typed', {
    strings: ['<i class="animarTxt">Coequiper.</i>', '<i class="animarTxt">amigo.</i>', '<i class="animarTxt">compañero peculiar.</i>', '<i class="animarTxt">secuas.</i>'],
    typeSpeed: 50,
    startDaley: 1000,
    backSpeed: 50,
    loop: true,
    shufle: true,
    loopCount: false,
    showCursor: false,
    /* contentType: 'html', */
});

$("body").prepend('<div id="miModal" class="modal fade slow overlay" role="dialog" aria-hidden="true"><div class="modal-dialog modal-lg"><div style="width:500px text-color:white" class="form-group modal-content"><div class="container row text-center modal-dialog modal-dialog-centered modal-dialog-scrollable"><h1 class="text-secondary">Somos los Coworkers</h1><br><p>y te acompañaremos</p><br> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum numquam incidunt, itaque, dolore porro fuga cum ea sequi enim suscipit amet illo, voluptatibus totam! Quos illo suscipit beatae adipisci error.</p></div></div></div></div>');


/*  animaciones con jquery */
        $ ('#logo').on('click', function(){ 
            $('#miModal').modal('show', {backdrop: 'static', keyboard: false});
        });
        

            
