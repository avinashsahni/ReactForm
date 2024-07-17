import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { City, Country, State } from "country-state-city";
import Selector from "./Selector";
import './app.css';
import DisplayData from "./DisplayData";

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
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
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
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      // Redirect to the DisplayData component with form data
      navigate("/display-data", { state: { ...formData, country, state, city } });
    }
  };

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-teal-900">Frequent Research Form</h2>
        <br />
        <form onSubmit={handleSubmit} className="South">
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
            <Selector data={countryData} selected={country} setSelected={setCountry} />
          </div>
          {state && (
            <div className="state">
              <label>State:</label>
              <Selector data={stateData} selected={state} setSelected={setState} />
            </div>
          )}
          {city && (
            <div className="city">
              <label>City:</label>
              <Selector data={cityData} selected={city} setSelected={setCity} />
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
