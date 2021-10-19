import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';



const Productos = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos] = useState([])
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto')
    const [colorBoton, setColorBoton] = useState('indigo')
    const [ejecutarConsulta, setEejecutarConsulta] = useState(true)

    useEffect(()=>{
        const obtenerProductos = async () => {
            const options = { method: 'GET', url: 'http://localhost:5000/productos' };
            await axios.request(options)
                .then(function (response) {
                    console.log();
                    setProductos(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        };
        if (ejecutarConsulta){
            obtenerProductos();
            setEejecutarConsulta(false)
        }
    },[ejecutarConsulta]);

    //useEffect para leer los datos en de la base de datos 
    useEffect(() => { 
        //obtener lista de productos desde el fronten
        if (mostrarTabla) {  
            setEejecutarConsulta(true) 
        }
    }, [mostrarTabla]);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear Nuevo Producto');
            setColorBoton('indigo')
        } else {
            setTextoBoton('Mostrar Todos los Productos')
            setColorBoton('red')
        }

    }, [mostrarTabla])
    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col'>
                <h2 className='text-3xl font-extrabold text-gray-900 '>Página de administración de productos</h2>
                <button
                    onClick={() => {
                        setMostrarTabla(!mostrarTabla);
                    }}
                    className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}>{textoBoton}</button>

            </div>

            {mostrarTabla ? (
            <TablaProductos
            listaProductos={productos} 
            setEejecutarConsulta={setEejecutarConsulta}/>
            ) :
                (
                <FormularioCreacionProductos 
                   setMostrarTabla={setMostrarTabla}
                    listaProductos={productos}
                    setProductos={setProductos}
                />)}
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
            />

        </div>
    );
};
const TablaProductos = ({ listaProductos, setEejecutarConsulta }) => {

    const [busqueda,setBusqueda]=useState(''); //busqueda es el valor que se está tomando del cuadro de busqueda
    const [productosFiltrados,setProductosFiltrados] = useState(listaProductos) //estados que en un inicio tiene tdo los productos del backend
    useEffect(()=>{
       
        
        //filter crea un objeto de la lista de prodcutos y a ese objeto hay que buscar las plabras incluidas en el nombre  o valor, etc. 
        //setProductos filtrados cambia el valor de porductosFiltrados, ahora la tabla solo muestra los valores filtrados
        //ya que en la tabla se hace map a productosFiltrados 
        setProductosFiltrados(listaProductos.filter((elemento)=>{
            console.log('elemento', elemento)
            //return elemento.nombre.includes(busqueda); // forma de buscar por una columna especifica
            //return elemento.nombre.toLowerCase().includes(busqueda.toLowerCase()) //forma de buscar sin porblema de mayusculas
            //como elemento(por el JSON) y busqueda son strings se cambian ambas a minusculas para evitar errores de camelsensitive
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase()); //JSON.stringify convierte a estring todo el elemento y busca entre todo las coincidencias, esto forma busca en todas las columnas 
        }));
    },[busqueda,listaProductos])
   
    /* //este useEffect sirve solo cuando se muestra la tabla con todos los elementos traidos del backend, pero se cambia por el useEffect
        // de arriba que utiliza el filtrado
    useEffect(() => {
        console.log("este es el estado del listado de productos en el componente de tabla", listaProductos)
    }, [listaProductos])
    */
 
    
    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <input
            value={busqueda}
            onChange={(e)=> setBusqueda(e.target.value)} 
            placeholder='Buscar' 
            className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'/>
            <h2 className='text-2xl font-extrabold text-green-800'>Todos los productos</h2>
          
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre del Producto</th>
                        <th>Valor del Producto</th>
                        <th>Descripcion del Producto</th>
                        <th>Estado del Producto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                 
                     {productosFiltrados.map((producto) => {
                        return (
                            <FilaProducto 
                            key={nanoid()} 
                            producto={producto} 
                            setEejecutarConsulta={setEejecutarConsulta}
                            />
                            )
                    })}
                </tbody>
            </table>
        </div>

    );
};

const FilaProducto = ({producto,setEejecutarConsulta}) => {
    const [edit,setEdit]= useState(false)
    const [openDialog,setOpenDialog]= useState(false)
    const [infoNuevoProducto,setInfoNuevoProducto] = useState({
        _id: producto._id,
        nombre: producto.nombre,
        valor: producto.valor,
        descripcion: producto.descripcion,
        estado: producto.estado,
    });
    const actualizarProducto= async ()=>{
        console.log("esta es toda la info del formulario",infoNuevoProducto);
        //enviar la info al backend 
        var data = new FormData();
        data.append('nombre',infoNuevoProducto.nombre)
        const prueba = await axios.post('http://localhost:5000/dproductos/6168b12a0d46eca33e85cccf',data)
        console.log("esta es la prueba", prueba) 
        /*const options = { 
            method: 'POST', 
            //url: `http://localhost:5000/productos/${infoNuevoProducto._id}/`,
            url:'http://localhost:5000/dproductos/6168b12a0d46eca33e85cccf',
            //headers:{'Content-Type':'aplication/json'},
            
        };
            await axios.request(options,{"valor": 20,
            "descripcion": "AZUL"})
                .then(function (response) {
                    console.log("esta es la respuesta del BD", response.data);
                    toast.success("Producto editado con éxito");
                    setEdit(false);
                    setEejecutarConsulta(true);
                    
                })
                .catch(function (error) {
                    toast.error("Error editando el producto");
                    console.error(error);
                }); */
        };
    const eliminarProducto= async ()=>{
        const options = {
            method: 'DELETE',
            url: `http://localhost:5000/productos/${producto._id}/`,
            headers: {'Content-Type': 'application/json'},
            //data: {id: producto._id}
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Producto eliminado");
            setEejecutarConsulta(true);
          }).catch(function (error) {
            console.error(error);
            toast.error("no se pudo eliminar")
          });
          setOpenDialog(false);
    };
    return (
        <tr>
            {edit? (
            <>
                <td>{infoNuevoProducto._id.slice(20)}</td>
                <td>
                    <input 
                        className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-2'
                        type='text'
                        value={infoNuevoProducto.nombre}
                    onChange={(e)=>setInfoNuevoProducto({ ...infoNuevoProducto,nombre: e.target.value})}/>
                    </td>
                <td><input className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-2'
                type='number' value={infoNuevoProducto.valor}
                onChange={(e)=>setInfoNuevoProducto({ ...infoNuevoProducto,valor: e.target.value})}/></td>
                <td><input className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-2'
                 type='text' value={infoNuevoProducto.descripcion}
                 onChange={(e)=>setInfoNuevoProducto({ ...infoNuevoProducto,descripcion: e.target.value})}/></td>
                <td><input className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-2'
                 type='text' value={infoNuevoProducto.estado}
                 onChange={(e)=>setInfoNuevoProducto({ ...infoNuevoProducto,estado: e.target.value})}/></td>
               
            </>
            ):(
            <>
            <td>{producto._id.slice(20)}</td>
            <td>{producto.nombre}</td>
            <td>{producto.valor}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.estado}</td>
            </>
            )}
            
            
            <td>
                <div className='flex w-full justify-around'>
                    {edit ? (
                        <>
                    <Tooltip title='Confirmar edición' arrow>
                        <i
                     onClick={()=> actualizarProducto()} 
                     className='fas fa-check text-green-700 hover:text-blue-500'/>
                     </Tooltip>

                     <Tooltip title='Cancelar edición' arrow>
                        <i onClick={()=> setEdit(!edit)} 
                        className='fas fa-ban text-yellow-700 hover:text-yellow-500' /></Tooltip>
                        </>
                   
                    
                    ):(
                        <>
                        <Tooltip title='Editar producto' arrow>
                        <i onClick={()=> setEdit(!edit)} 
                        className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500' /></Tooltip>
                        <Tooltip title='Eliminar producto' arrow >
                        <i onClick={()=>setOpenDialog(true)} className='fas fa-trash text-red-700 hover:text-red-500' />
                        </Tooltip>
                        </>
                        )}
                </div>
                <Dialog open={openDialog}>
                    <div className='p-8 flex flex-col'>
                        <h1 className='text-gray-900 text-2xl font-bold'>Está seguro de querer eliminar el producto?</h1>
                        <div className='flex w-full items-center justify-center my-4'>
                        <button onClick={()=>eliminarProducto()} className='mx-2 my-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 runded-md shadow-md'>Si</button>
                        <button onClick={()=>setOpenDialog(false)} className='mx-2 my-4 px-4 py-2 bg-red-500 text-white hover:bg-red-700 runded-md shadow-md'>No</button>
                        </div>
                    </div>
                </Dialog>
            </td>

        </tr>
    )
}
const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
    const form = useRef(null); //se coloca null para que no rellene por defecto



    const submitForm = async (e) => {
        e.preventDefault() //ayuda a rvisar que las validaciones iniciales se cumplan, como que se llenen los formularioa y no se exeda el limite 
        const fd = new FormData(form.current);
        //esto me ayuda a no trabajar con onChance para cada input, nuevo producto es el diccionario que entraría al backend
        // FormatData trae los datos que están dentro de un form de un formulario, este formulario se trae con form.current 
        //utilizando useRef para el formulario y el boton submit 
        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        });
        //options para agregar un nuevo producto en la BD 
        const options = {
            method: 'POST',
            url: 'http://localhost:5000/productos',
            headers: { 'Content-Type': 'application/json' },
            data: { nombre: nuevoProducto.nombre, valor: nuevoProducto.valor, descripcion: nuevoProducto.descripcion, estado: nuevoProducto.estado }
        }
        await axios.request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success("Producto agregado con éxito")
            }).catch(function (error) {
                console.error(error);
                toast.error("Error creando producto")
            });


        //setMostrarTabla(true)
        //setProductos([...listaProductos,nuevoProducto])
        //identificar el caso de exito y mostrar el toast de éxito 

        //identificar el caso de error y c mostar un toast de error 

    }
    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-extrabold text-green-800'>Crear nuevo producto</h2>
                <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                    <label className="flex flex-col" htmlFor="nombre">
                        Nombre del producto
                        <input
                            name="nombre"
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
                            type='text'
                            placeholder='Zapatos'
                            required
                        />
                    </label>

                    <label className="flex flex-col" htmlFor="valor">
                        Valor del producto
                        <input
                            name="valor"
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
                            type='number'
                            min={1}
                            placeholder='1'
                            required
                        />
                    </label>

                    <label className="flex flex-col" htmlFor="descripcion">
                        Descripcion del producto
                        <input
                            name="descripcion"
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
                            type='text'
                            placeholder='Negros'
                            required
                        />
                    </label>

                    <label className="flex flex-col" htmlFor='estado'>
                        Estado del producto
                        <select
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
                            name='estado'
                            required
                            defaultValue={0}
                        >
                            <option disabled value={0}>Slececcione una opción</option>
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                    </label>

                    <button
                        type='submit'
                        className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
                    >Guardar Producto</button>
                </form>
            </div>
        </div>
    );
};
export default Productos;