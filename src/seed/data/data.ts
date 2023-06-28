interface SeedProduct {
    descripcion: string;
    imagenes: string[];
    stock: number;
    precio: number;
    tallas: ValidSizes[];
    slug: string;
    tags: string[];
    titulo: string;
    colores: ValidColores[];
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidColores = 'negro'|'blanco'|'beige';

interface SeedUser{
    email: string;
    nombre: string;
    password: string;
    roles: string[];
}

interface SeedData {
    usuarios : SeedUser[];
    productos: SeedProduct[];
}


export const initialData: SeedData = {

    usuarios:[
        {
            email:"admin@softup.cl",
            nombre: "Admon negocio",
            password : "Admin1269",
            roles:["usuario","admin"]
        },
        {
            email:"luis@softup.cl",
            nombre: "Luis Urzúa",
            password : "Admin1269",
            roles:["usuario"]
        },
    ],    

    productos: [
        {
            titulo: "Bolsa Shopper ",
            precio: 3990,
            descripcion: "Bolsas de algodon",
            slug: "bolsa_shopper",
            stock: 0,
            tallas: ["S","M","L", "XL"],
            colores: ["negro", "blanco", "beige"],
            tags: [ "bolsa", "tote bags" ],
            imagenes: [ 
                '1740169-00-A_0_2000.jpg',
                '1740169-00-A_1.jpg',
            ]
        },
        {
            titulo: "Bolsa algodon daca",
            precio: 3990,
            descripcion: "Bolsas de algodon",
            slug: "Bolsa_algodon_daca",
            stock: 0,
            tallas: ["S","M","L", "XL"],
            colores: ["negro", "blanco", "beige"],
            tags: [ "bolsa", "tote bags" ],
            imagenes: [ 
                '1740170-00-A_0_2000.jpg',
                '1740170-00-A_1.jpg',
            ]
        },
        {
            titulo: "Bolsa algodon basic",
            precio: 3990,
            descripcion: "Bolsas de algodon",
            slug: "Bolsa_algodon_basic",
            stock: 0,
            tallas: ["S","M","L", "XL"],
            colores: ["negro", "blanco", "beige"],
            tags: [ "bolsa", "tote bags" ],
            imagenes: [ 
                '1740171-00-A_0_2000.jpg',
                '1740171-00-A_1.jpg',
            ]
        },
        {
            titulo: "Bolsa algodon basic10",
            precio: 3990,
            descripcion: "Bolsas de algodon",
            slug: "Bolsa_algodon_basic10",
            stock: 0,
            tallas: ["S","M","L", "XL"],
            colores: ["negro", "blanco", "beige"],
            tags: [ "bolsa", "tote bags" ],
            imagenes: [ 
                '1740172-00-A_0_2000.jpg',
                '1740172-00-A_1.jpg',
            ]
        },
        {
            titulo: "Bolsa algodon basic20",
            precio: 3990,
            descripcion: "Bolsas de algodon",
            slug: "Bolsa_algodon_basic20",
            stock: 0,
            tallas: ["S","M","L", "XL"],
            colores: ["negro", "blanco", "beige"],
            tags: [ "bolsa", "tote bags" ],
            imagenes: [ 
                '1740173-00-A_0_2000.jpg',
                '1740173-00-A_1.jpg',
            ]
        },
        {
            titulo: "Bolsa algodon basic30",
            precio: 3990,
            descripcion: "Bolsas de algodon",
            slug: "Bolsa_algodon_basic30",
            stock: 0,
            tallas: ["S","M","L", "XL"],
            colores: ["negro", "blanco", "beige"],
            tags: [ "bolsa", "tote bags" ],
            imagenes: [ 
                '1740174-00-A_0_2000.jpg',
                '1740174-00-A_1.jpg',
            ]
        },
        {
            titulo: "Bolsa algodon basic40",
            precio: 3990,
            descripcion: "Bolsas de algodon",
            slug: "Bolsa_algodon_basic40",
            stock: 0,
            tallas: ["S","M","L", "XL"],
            colores: ["negro", "blanco", "beige"],
            tags: [ "bolsa", "tote bags" ],
            imagenes: [ 
                '1740175-00-A_0_2000.jpg',
                '1740175-00-A_1.jpg',
            ]
        },
        {
            titulo: "Bolsa algodon basic50",
            precio: 3990,
            descripcion: "Bolsas de algodon",
            slug: "Bolsa_algodon_basic50",
            stock: 0,
            tallas: ["S","M","L", "XL"],
            colores: ["negro", "blanco", "beige"],
            tags: [ "bolsa", "tote bags" ],
            imagenes: [ 
                '1740175-00-A_0_2000.jpg',
                '1740175-00-A_1.jpg',
            ]
        },
        {
            titulo: "Bolsa algodon basic60",
            precio: 3990,
            descripcion: "Bolsas de algodon",
            slug: "Bolsa_algodon_basic60",
            stock: 0,
            tallas: ["S","M","L", "XL"],
            colores: ["negro", "blanco", "beige"],
            tags: [ "bolsa", "tote bags" ],
            imagenes: [ 
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ]
        },
        {
            titulo: "Bolsa algodon basic70",
            precio: 3990,
            descripcion: "Bolsas de algodon",
            slug: "Bolsa_algodon_basic70",
            stock: 0,
            tallas: ["S","M","L", "XL"],
            colores: ["negro", "blanco", "beige"],
            tags: [ "bolsa", "tote bags" ],
            imagenes: [ 
                '1740177-00-A_0_2000.jpg',
                '1740177-00-A_1.jpg',
            ]
        },
    ]  
   
}