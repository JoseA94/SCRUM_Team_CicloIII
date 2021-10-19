import useActivateRoute from 'hooks/useActiveRoute';

import { Link } from 'react-router-dom';
import ImagenLogo from './ImagenLogo';

const Sidebar=()=>{
    return(
        
        <nav className="hidden sm:flex sm:w-72  border border-gray-300 h-full bg-gray-300  flex-col p-4 sidebar" >
            <Link to = "/admin">
            <ImagenLogo/>
            </Link>
            <div className = "my-4">
            <Ruta icono='fas fa-user' ruta="/admin/perfil" nombre="Perfil"/>
            <Ruta icono='fas fa-car' ruta="/admin/productos" nombre="Productos"/>
            <Ruta icono='fas fa-cash-registrer' ruta="/admin/ventas" nombre="Ventas"/>
            <Ruta icono='fas fa-users' ruta="/admin/usuarios" nombre="Usuarios"/>
            </div>
        
            <button>Cerrar sesion</button>
        </nav>
        
        
       
    );
};

const Ruta =({icono,ruta,nombre}) =>{
    const isActive = useActivateRoute(ruta);
    return(
        <Link to={ruta}>
            <button className = {`p-1 my-2 bg-${isActive? 'indigo': 'gray' }-700 hover:bg-indigo-900 w-full flex items-start text-white rounded-md`}>
                <i className={`${icono}w-10`}/>
                {nombre}
                </button>
            </Link>
    )
}

export default Sidebar;