import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto,ProductoImagen } from './entities';
import { AuthModule } from '../auth/auth.module';


@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports:[
    TypeOrmModule.forFeature([Producto, ProductoImagen]),
    AuthModule,
  ],
  exports:[
    ProductosService ,
    TypeOrmModule,
  ]
})
export class ProductosModule {}
