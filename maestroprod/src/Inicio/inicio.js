import './inicio.css';
import logo from '../logo.jpg'
import {Link} from 'react-router-dom'
function Inicio() {
    return (
      <div id="main-container">
  
          <div id="containerlogueo">
  
              <div className="box">
                  <Link to ='/'> <section className="logo">
                      <img src={logo} alt ="logo" className="imgprincipal"/>
                  </section></Link>
                 
                  <div className="modulo">
                      <p>Modulo administrador de productos:</p>
                      <div className="botonlat">
                          <a href="">Registro de Productos</a>
                      </div>
                      <div className="botonlat">
                        <Link to= '/maestrodProduct'>Maestro de Productos</Link>
                      </div>
                  </div>
                  <div className="modulo">
                      <p>Modulo administrador de ventas:</p>
                      <div className="botonlat">
                        <a href="">Registro de Ventas</a>
                      </div>
                      <div className="botonlat">
                        <a href>Maestro de Ventas</a>
                      </div>
                  </div>
                  <div className="modulo1">
                      <div className="botonlat">
                          <a href="">Gestión de Usuarios</a>
                      </div>
                  </div>
                  <div className="salir">
                      <div className="botonlat1">
                          <a href="">Cerrar Sesión</a>
                      </div>
                  </div>
  
  
              </div>
              
          </div>
      </div>
    );
  }
  
  export default Inicio;