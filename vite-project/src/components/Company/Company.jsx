import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Company = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/companies");
        console.log(response.data);
        setCompanies(response.data);
      } catch (error) {
        console.log("Error in fetching the companies", error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <section className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">🏢 Explore Top Companies</h2>
        <p className="text-muted">Discover the best places to work and grow your career</p>
      </div>

      {companies.length === 0 ? (
        <p className="text-center">No Companies Found</p>
      ) : (
        <div className="row g-4">
          {companies.map((company, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">{company.name}</h5>
                  <p className="card-text">{company.description}</p>
                  <p className="card-text"><strong>Location:</strong> {company.location}</p>
                  <a href={company.website} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Company;
