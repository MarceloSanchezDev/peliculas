import { Link } from "react-router";
import Buscador from "./Buscador";

export default function Nav({ logout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#">
          App Movie
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="d-flex flex-grow-1 justify-content-between align-items-center mt-2 mt-lg-0">
            <div className="d-flex ms-auto align-items-center gap-2">
              <Buscador />
              <button
                className="btn btn-outline-danger text-nowrap"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
