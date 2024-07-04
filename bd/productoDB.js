const ConectarBD = require("./conexionBD.js");

class ProductoDB extends ConectarBD {
    constructor() {
        super();
    }

    async nuevoProducto(producto) {
        const sql = "INSERT INTO productos VALUES(null, '"+producto.nombre+"', '"+producto.descripcion+"', '"+producto.cantidad+"');";
        try {
            await this.conectarMySQL();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Dato insertado a MySql");
        } catch (error) {
            console.error("Error al insertar datos en MySql" +error);
            console.error(sql);
        }
    }

    async mostrarProductos(){
        const sql = "SELECT * FROM productos";
        var productoBD;
        try{
            await this.conectarMySQL();
            [productoBD]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Producto Recuperados");
            return productoBD;
        } catch (error){
            console.error("Error al recuperar los datos de producto "+error);
            console.error(sql);
        }
    }
    async buscarProductoPorID(idProducto){
        const sql="SELECT * FROM productos WHERE idproducto="+ idProducto;
        try {
            await this.conectarMySQL();
            const producto=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Producto registrado correctamente");
            return producto;
        } catch (error){
            console.error("Error al recuperar el producto "+ error);
            console.error(sql);
        }
    }

    async editarProducto(producto){
        const sql2=`
        UPDATE producto SET
        nombre="${producto.nombre}",
        descripcion="${producto.celular}",
        cantidad="${producto.cantidad}"
        WHERE idproducto="${producto.idproducto}"
        `;
        try {
            await this.conectarMySQL();
            await this.conexion.execute(sql2);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al editar producto"+error);
            console.error(sql2);
        }
    }

    async borrarProducto(idproducto){
        const sql="DELETE FROM productos WHERE idproducto="+idproducto;
        try {
            await this.conectarMySQL();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al borrar el producto"+error);
            console.error(sql);
        }
    }
}
module.exports = ProductoDB;