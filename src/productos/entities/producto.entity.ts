import { Entity ,PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, ManyToOne} from "typeorm";
import { ProductoImagen } from './';
import { User } from '../../auth/entities/user.entity';

@Entity({name: 'productos'})
export class Producto {
    @PrimaryGeneratedColumn ('uuid')
    id: string;

    @Column('text',{
        unique: true,
    })
    titulo:string;

    @Column('numeric',{
        default:0
    })
    precio: number;

    @Column('text',{
        nullable: true
    })
    descripcion: string;

    @Column('text',{
        unique: true
    })
    slug: string

    @Column('int',{
        default:0
    })
    stock: number;

    @Column('text',{
        array: true
    })
    tallas: string[];

    @Column('text',{
        array: true
    })
    colores: string[];

    @Column('text',{
        array: true,
        default: []
    })
    tags: string[];


    //Relacion de unon a muchos contra tabla imagenes
    @OneToMany(
        ()=> ProductoImagen,
        (productoImagen) => productoImagen.producto,
        {cascade: true, eager: true}
    )
    imagenes?: ProductoImagen[];


    //Relacion de productos con tabla usuarios
    @ManyToOne(
        ()=> User,
        (usuario) => usuario.producto,
        {eager: true}    
    )
    usuario: User;

    
    @BeforeInsert() 
    checkSlugInsert(){
        if(!this.slug){
            this.slug = this.titulo;
        }
        this.slug = this.slug 
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

    @BeforeUpdate()
    checkSlugUpdate(){
        this.slug = this.slug 
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }


}
