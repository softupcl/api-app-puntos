import { Entity ,PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, ManyToOne, OptimisticLockVersionMismatchError} from "typeorm";
import { ProductoImagen } from './';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'productos'})
export class Producto {

    @ApiProperty({
        example:  '811fb711-9d5a-44df-84e3-777ac9c43a13',
        description: 'ID del producto',
        uniqueItems : true
    })
    @PrimaryGeneratedColumn ('uuid')
    id: string;

    @ApiProperty({
        example:  'Bolsa algodon',
        description: 'Nombre del  producto',
        uniqueItems : true
    })
    @Column('text',{
        unique: true,
    })
    titulo:string;

    @ApiProperty({
        example:  0,
        description: 'Precio del producto',
    })
    @Column('numeric',{
        default:0
    })
    precio: number;

    @ApiProperty({
        example:  'Bolsa algodon basic40',
        description: 'Descripción del producto',
        default : null
    })
    @Column('text',{
        nullable: true
    })
    descripcion: string;

    @ApiProperty({
        example:  'bolsa_algodon_basic40',
        description: 'SLUG del producto para rutas SEO',
        uniqueItems : true
    })
    @ApiProperty()
    @Column('text',{
        unique: true
    })
    slug: string

    
    @ApiProperty({
        example:  10,
        description: 'Sotck del producto ',
        default: 0
    })
    @Column('int',{
        default:0
    })
    stock: number;

    @ApiProperty({
        example:  '[S,L,M,XL]',
        description: 'Tamaños del producto',
        uniqueItems : true
    })
    @Column('text',{
        array: true
    })
    tallas: string[];


    @ApiProperty({
        example:  '[Blanco,Rojo,Negro]',
        description: 'Colores del producto ',
    })
    @Column('text',{
        array: true
    })
    colores: string[];

    @ApiProperty({
        example:  '[Bolsas, totebag]',
        description: 'Tags del producto para rutas SEO',
    })
    @Column('text',{
        array: true,
        default: []
    })
    tags: string[];


    //Relacion de unon a muchos contra tabla imagenes
    @ApiProperty({
        example:  '[1740172-00-A_1.jpg,740172-00-A_0_2000.jpg]',
        description: 'Imagenes del producto',
    })
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
