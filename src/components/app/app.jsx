import React, { useState, useEffect } from "react";
import Page from "../page/page";
import "./app.css";
import { Switch, Route, Redirect, Link, useLocation } from "react-router-dom";

function App() {
  const url =
    "https://raw.githubusercontent.com/blanzh/carsBase/master/cars.json";

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const page = +useLocation().pathname.slice(1);
  const arrayOfCars = [];

  let currentSwitchers = [];

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(
        (data) => {
          setData(data);
          setLoaded(true);
        },
        (error) => setError(error)
      );
  }, []);

  if (loaded) {
    for (let key in data.list) {
      arrayOfCars.push({ name: key, values: data.list[key] });
    }
  }

  const currentCars = arrayOfCars.filter(
    (car, index) => index < page * 10 && index >= page * 10 - 10
  );

  if (page >= 1 && page <= 4) currentSwitchers = [1, 2, 3, 4, 5, 6, 7];
  else if (
    page <= Math.floor(arrayOfCars.length / 10) &&
    page >= Math.floor(arrayOfCars.length / 10) - 3
  )
    currentSwitchers = [
      Math.floor(arrayOfCars.length / 10) - 6,
      Math.floor(arrayOfCars.length / 10) - 5,
      Math.floor(arrayOfCars.length / 10) - 4,
      Math.floor(arrayOfCars.length / 10) - 3,
      Math.floor(arrayOfCars.length / 10) - 2,
      Math.floor(arrayOfCars.length / 10) - 1,
      Math.floor(arrayOfCars.length / 10),
    ];
  else
    currentSwitchers = [
      page - 3,
      page - 2,
      page - 1,
      page,
      page + 1,
      page + 2,
      page + 3,
    ];

  if (error) return <h1>Sorry ;(</h1>;

  return (
    <>
      <Switch>
        <Route path="/:page">
          <Page cars={currentCars} />
        </Route>
        <Redirect from="/" to="/1" />
      </Switch>
      <div className="switchers">
        <Link className="prev" to={page === 1 ? "/1" : `/${page - 1}`}>
          {"<"}
        </Link>
        {currentSwitchers.map((number, index) => (
          <Link
            key={index}
            to={`/${number}`}
            className={number === page ? "active" : null}
          >
            {number}
          </Link>
        ))}
        <Link
          className="next"
          to={
            page === Math.floor(arrayOfCars.length / 10)
              ? `/${Math.floor(arrayOfCars.length / 10)}`
              : `/${page + 1}`
          }
        >
          {">"}
        </Link>
      </div>
    </>
  );
}

export default App;
