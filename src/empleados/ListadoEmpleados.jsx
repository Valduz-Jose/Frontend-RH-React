import { useEffect, useState } from "react";
import axios from "axios"; //cliente http para hacer solicitudes a la API
import { NumericFormat } from "react-number-format"; // formatea números, especialmente para mostrar sueldos con formato de moneda
import { urlBase } from "../config.js";

export default function ListadoEmpleados() {
  //Estados de la aplicación
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await axios.get(urlBase);
        setEmpleados(Array.isArray(data) ? data : []); // Asegura que data sea un array
      } catch (error) {
        setError("No se pudo cargar el listado de Empleados. ", error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  //renderizado condicional para mostrar mensajes de carga o error
  if (cargando) return <p className="text-secondary">Cargando...</p>;
  if (error)
    return (
      <p className="alert alert-danger" role="alert">
        {error}
      </p>
    );

  return (
    <div className="container mt-4">
      <table className="table table-striped table-hover mt-4 text-center">
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
                <button className="btn btn-warning btn-sm me-2">Editar</button>
                <button className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
