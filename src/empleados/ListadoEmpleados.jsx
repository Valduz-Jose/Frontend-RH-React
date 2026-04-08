import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { urlBase } from "../config.js";
import { Link } from "react-router-dom";

export default function ListadoEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null); // Estado para controlar qué ID se está borrando

  // Función para cargar los empleados, envuelta en useCallback para evitar renders infinitos
  const cargar = useCallback(async () => {
    try {
      const { data } = await axios.get(urlBase);
      setEmpleados(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("No se pudo cargar el listado de Empleados.");
      console.error(err);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  // Función para eliminar empleado
  const eliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este empleado?");
    if (!confirmar) return;

    try {
      setEliminandoId(id); // Bloqueamos el botón específico
      await axios.delete(`${urlBase}/${id}`);
      await cargar(); // Refrescamos la lista tras eliminar
    } catch (err) {
      alert("Error al intentar eliminar el registro.");
      console.error(err);
    } finally {
      setEliminandoId(null); // Liberamos el estado
    }
  };

  if (cargando)
    return (
      <div className="container mt-5 text-center">
        <p className="text-secondary">Cargando...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5">
        <p className="alert alert-danger">{error}</p>
      </div>
    );

  return (
    <div className="card mt-4 shadow">
      <div className="card-header bg-primary text-white text-start">
        <h5 className="mb-0">Listado de Empleados</h5>
      </div>
      <div className="card-body p-0">
        {empleados.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-secondary mb-0">No hay empleados registrados.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0 text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Departamento</th>
                  <th scope="col">Sueldo</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado) => (
                  <tr key={empleado.idEmpleado}>
                    <td>{empleado.idEmpleado}</td>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.departamento}</td>
                    <td>
                      <NumericFormat
                        value={empleado.sueldo}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={2}
                        fixedDecimalScale
                      />
                    </td>
                    <td>
                      <Link
                        to={`/editar/${empleado.idEmpleado}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => eliminar(empleado.idEmpleado)}
                        disabled={eliminandoId === empleado.idEmpleado}
                      >
                        {eliminandoId === empleado.idEmpleado
                          ? "..."
                          : "Eliminar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
