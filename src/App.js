import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { City, Country, State } from "country-state-city";
import Selector from "./Selector";
import './app.css';

const App = () => {
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    age: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setStateData([]);
    setCityData([]);
    setState();
    setCity();
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData([]);
    setCity();
    if (state) {
      setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }
  }, [state, country]);

  useEffect(() => {
    if (stateData.length) {
      setState(stateData[0]);
    } else {
      setState();
    }
  }, [stateData]);

  useEffect(() => {
    if (cityData.length) {
      setCity(cityData[0]);
    } else {
      setCity();
    }
  }, [cityData]);

  useEffect(() => {
    if (formData.dob) {
      const age = calculateAge(formData.dob);
      setFormData({ ...formData, age });
    }
  }, [formData.dob]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          error = "Must accept alphabets only";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "dob":
        const age = calculateAge(value);
        if (age < 14 || age > 99) {
          error = "Age must be between 14 and 99 years";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      setCountry(countryData.find((c) => c.isoCode === value));
    } else if (name === "state") {
      setState(stateData.find((s) => s.isoCode === value));
    } else if (name === "city") {
      setCity(cityData.find((c) => c.name === value));
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      navigate("/display-data", { state: { ...formData, country, state, city } });
    }
  };

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-teal-900">Frequent Research Form</h2>
        <br />
        <form onSubmit={handleSubmit} className="flex flex-wrap bg-teal-300 South">
          <div>
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
          <div>
            <label>E-Mail:</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="country">
            <label>Country:</label>
            <select name="country" value={country?.isoCode} onChange={handleChange}>
              {countryData.map((c) => (
                <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
              ))}
            </select>
          </div>
          {state && (
            <div className="state">
              <label>State:</label>
              <select name="state" value={state?.isoCode} onChange={handleChange}>
                {stateData.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                ))}
              </select>
            </div>
          )}
          {city && (
            <div className="city">
              <label>City:</label>
              <select name="city" value={city?.name} onChange={handleChange}>
                {cityData.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label>Gender:</label>
            <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> Male&nbsp;&nbsp;
            <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Female
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>
          <div>
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>
          <div>
            <label>Age:</label>
            <input type="text" name="age" value={formData.age} readOnly />
          </div>
          <button className="save" type="submit">Save</button>
        </form>
      </div>
    </section>
  );
};

const DisplayData = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <h2>Form Data</h2>
      <p>First Name: {data.firstName}</p>
      <p>Last Name: {data.lastName}</p>
      <p>Email: {data.email}</p>
      <p>Gender: {data.gender}</p>
      <p>Date of Birth: {data.dob}</p>
      <p>Age: {data.age}</p>
      <p>Country: {data.country.name}</p>
      <p>State: {data.state?.name}</p>
      <p>City: {data.city?.name}</p>
    </div>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/display-data" element={<DisplayData />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
