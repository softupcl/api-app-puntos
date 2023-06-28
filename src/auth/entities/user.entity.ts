import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from '../../productos/entities/producto.entity';

@Entity('usuarios')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true,
    })
    email:string;

    @Column('text',{
        select: false
    })
    password: string;
    
    @Column('text')
    nombre: string;

    @Column('text',{
        nullable: true
    })
    apellido: string;

    @Column('text',{
        nullable: true
    })
    telefono: string;

    @Column('text',{
        nullable: true
    })
    avatar: string;

    @Column('bool',{
        default: true
    })
    activo: boolean;

    @Column('text',{
        array: true,
        default:['user']
    })
    roles: string[];


    @OneToMany(
        ()=> Producto,
        (producto) => producto.usuario
    )
    producto : Producto;


    @BeforeInsert()
    checkEmailInsert(){
        this.email= this.email.toLowerCase().trim();    
    }

    @BeforeUpdate()
    checkEmailUpdate(){
        this.email= this.email.toLowerCase().trim();    
    }


}
