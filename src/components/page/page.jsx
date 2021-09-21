import React from "react";
import "./page.css";

function Page(props) {
  return (
    <table>
      <thead>
        <tr>
          <td>Марка</td>
          <td>Модели</td>
        </tr>
      </thead>
      <tbody>
        {props.cars.map((car, index) => (
          <tr key={index}>
            <td className="name">{car.name}</td>
            <td>
              {car.values.map((el, index) => (
                <span key={index}>
                  {index === car.values.length - 1 ? el + "" : el + ", "}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Page;
