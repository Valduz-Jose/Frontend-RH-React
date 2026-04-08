import { Link } from "react-router-dom";

export default function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Sistema RRHH
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Empleados
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/agregar">
                Agregar Empleado
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
