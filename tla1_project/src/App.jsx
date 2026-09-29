import { useState } from "react";
import "./App.css";

function App() {
  // Declarative React State
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [error, setError] = useState("");

  // Edit State Tracking
  const [editIndex, setEditIndex] = useState(null);

  // Handle Form Submission / Button Click (Supports both Add and Update)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Guard Clause Validation
    if (!catName.trim() || !catDesc.trim()) {
      setError("Please complete both input fields.");
      return;
    }

    setError("");

    if (editIndex !== null) {
      // Update existing category
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = {
        name: catName.trim(),
        desc: catDesc.trim(),
      };
      setCategories(updatedCategories);
      setEditIndex(null);
    } else {
      // Add new category to state array
      setCategories([
        ...categories,
        { name: catName.trim(), desc: catDesc.trim() },
      ]);
    }

    // Reset Form Inputs
    setCatName("");
    setCatDesc("");
  };

  // Handle Delete Action
  const handleDelete = (indexToDelete) => {
    setCategories(categories.filter((_, index) => index !== indexToDelete));
    // If the user was currently editing this item, reset the form
    if (editIndex === indexToDelete) {
      setEditIndex(null);
      setCatName("");
      setCatDesc("");
    }
  };

  // Handle Edit Action (Loads data back into inputs)
  const handleEdit = (indexToEdit) => {
    setEditIndex(indexToEdit);
    setCatName(categories[indexToEdit].name);
    setCatDesc(categories[indexToEdit].desc);
    setError("");
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          {/* Registration Card */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-dark text-white py-3">
              <h1 className="h5 mb-0 fw-bold">
                {editIndex !== null
                  ? "Edit Income Category"
                  : "Income Category Registration"}
              </h1>
            </div>
            <div className="card-body p-4">
              {/* Error Feedback Alert */}
              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="txtCatName"
                    className="form-label fw-semibold"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="txtCatName"
                    className="form-control"
                    placeholder="e.g., Consulting"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="txtCatDesc"
                    className="form-label fw-semibold"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="txtCatDesc"
                    className="form-control"
                    placeholder="e.g., Enterprise technical support contract"
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    id="btnAdd"
                   className={`btn ${editIndex !== null ? "btn-success" : "btn-secondary"} px-4 fw-semibold`}
                  >
                    {editIndex !== null ? "Update Category" : "Save Category"}
                  </button>
                  {editIndex !== null && (
                    <button
                      type="button"
                      className="btn btn-secondary px-3 fw-semibold"
                      onClick={() => {
                        setEditIndex(null);
                        setCatName("");
                        setCatDesc("");
                        setError("");
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Ledger Table Card */}
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h2 className="h6 mb-0 text-secondary fw-bold text-uppercase">
                Registered Categories
              </h2>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{ width: "30%" }}>
                      Category Name
                    </th>
                    <th scope="col" style={{ width: "45%" }}>
                      Description
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: "25%" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody id="listIncomeCat">
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-3">
                        No categories registered yet.
                      </td>
                    </tr>
                  ) : (
                    categories.map((item, index) => (
                      <tr key={index}>
                        <td className="fw-semibold text-dark">{item.name}</td>
                        <td className="text-secondary">{item.desc}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2 px-3 fw-semibold"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger px-3 fw-semibold"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
