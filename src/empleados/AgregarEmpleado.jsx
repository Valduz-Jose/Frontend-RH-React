import { useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { useNavigate, Link } from "react-router-dom";
import { urlBase } from "../config";

export default function AgregarEmpleado() {
  const [nombre, setNombre] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [enviando, setEnviando] = useState(false); //Bandera para evitar envíos múltiples
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault(); //Impide que se recargue la página al enviar el formulario
    setError("");

    const nombreOk = nombre.trim();
    const departamentoOk = departamento.trim();
    const sueldoOk = Number(sueldo) || 0;

    if (!nombreOk || !departamentoOk || sueldoOk <= 0) {
      setError("Por favor, complete todos los campos correctamente.");
      return;
    }

    try {
      setEnviando(true);
      await axios.post(urlBase, {
        nombre: nombreOk,
        departamento: departamentoOk,
        sueldo: sueldoOk,
      });
      navigate("/");
    } catch (error) {
      setError("Error al agregar el empleado.", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 border rounded p-4 mt-2 shadow">
          <h3 className="text-center mb-4">Agregar Empleado</h3>

          {error && <div className="alert alert-danger">{error}</div>}

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
                {enviando ? "Guardando..." : "Guardar"}
              </button>
              <Link to="/" className="btn btn-danger">
                Regresar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
