import { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditarEmpleado() {
  const urlBase = "http://127.0.0.1:8080/api/empleados";
  const navigate = useNavigate();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarEmpleado();
  }, []);

  const cargarEmpleado = async () => {
    const resultado = await axios.get(`${urlBase}/${id}`);
    setNombre(resultado.data.nombre);
    setDepartamento(resultado.data.departamento);
    setSueldo(resultado.data.sueldo);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setEnviando(true);
      await axios.put(`${urlBase}/${id}`, {
        nombre,
        departamento,
        sueldo: Number(sueldo),
      });
      navigate("/");
    } catch (error) {
      console.error("Error al editar:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 border rounded p-4 mt-2 shadow">
          <h3 className="text-center mb-4">Editar Empleado</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Departamento</label>
              <input
                type="text"
                className="form-control"
                required
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Sueldo</label>
              <NumericFormat
                className="form-control"
                required
                value={sueldo}
                onValueChange={(values) => setSueldo(values.value)}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale
              />
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary me-3"
                disabled={enviando}
              >
                {enviando ? "Guardando..." : "Guardar Cambios"}
              </button>
              <Link to="/" className="btn btn-outline-danger">
                Regresar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
