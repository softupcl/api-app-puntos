import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from './';

@Entity({name:'productos_imagenes'})
export class ProductoImagen{

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url:string;

    @ManyToOne(
        () => Producto,
        (producto) => producto.imagenes,
        {onDelete: 'CASCADE'}
    )
    producto: Producto

}