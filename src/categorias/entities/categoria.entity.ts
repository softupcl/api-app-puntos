import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'categorias'}) 
export class Categoria {
    
    @PrimaryGeneratedColumn('increment')
    id: string

    @Column('text',{
        unique: true
    })
    nombre:string

    @Column('text',{
        nullable: true
    })
    descripcion: string
    
    @Column('text',{
        nullable: true
    })
    imagen:string

    @Column('bool',{
        default: true
    })
    activo: boolean;

}
