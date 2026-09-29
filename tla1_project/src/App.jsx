import { useState } from 'react';
import './App.css';

function App() {
  // Declarative React State
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [error, setError] = useState('');

  // Handle Form Submission / Button Click
  const handleAddCategory = (e) => {
    e.preventDefault();

    // Guard Clause Validation
    if (!catName.trim() || !catDesc.trim()) {
      setError('Please complete both input fields.');
      return;
    }

    // Clear error and add new category to state array
    setError('');
    setCategories([...categories, { name: catName.trim(), desc: catDesc.trim() }]);

    // Reset Form Inputs
    setCatName('');
    setCatDesc('');
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          
          {/* Registration Card */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h1 className="h5 mb-0 fw-bold">Income Category Registration</h1>
            </div>
            <div className="card-body p-4">
              
              {/* Error Feedback Alert */}
              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleAddCategory}>
                <div className="mb-3">
                  <label htmlFor="txtCatName" className="form-label fw-semibold">
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
                  <label htmlFor="txtCatDesc" className="form-label fw-semibold">
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
                <button
                  type="submit"
                  id="btnAdd"
                  className="btn btn-primary px-4 fw-semibold"
                >
                  Save Category
                </button>
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
                    <th scope="col" className="w-35" style={{ width: '35%' }}>
                      Category Name
                    </th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody id="listIncomeCat">
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="text-center text-muted py-3">
                        No categories registered yet.
                      </td>
                    </tr>
                  ) : (
                    categories.map((item, index) => (
                      <tr key={index}>
                        <td className="fw-semibold text-dark">{item.name}</td>
                        <td className="text-secondary">{item.desc}</td>
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