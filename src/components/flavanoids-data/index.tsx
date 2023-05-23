import { Fragment } from "react";
import { data } from "../../constant/data";
import "./style.css";

const FlavanoidsData = () => {
  const alcoholValues: number[] = [];

  // to calculate all alcoholvalues only once  (eg: 1,2,3)
  data.forEach((item) => {
    if (!alcoholValues.includes(item.Alcohol)) {
      alcoholValues.push(item.Alcohol);
    }
  });

  // calculate mean
  const calculateMean = (alcoholValue: number) => {
    const filteredData = data.filter((item) => item.Alcohol === alcoholValue);
    const flavanoids = filteredData.map((item) => item.Flavanoids);
    const sum = flavanoids.reduce(
      (acc, value) => Number(acc) + Number(value),
      0
    );
    const mean = Number(sum) / flavanoids.length;
    return mean.toFixed(3);
  };

  // calculate median
  const calculateMedian = (alcoholValue: number) => {
    const filteredData = data.filter((item) => item.Alcohol === alcoholValue);
    const sortedFlavanoids = filteredData
      .map((item) => item.Flavanoids)
      .sort((a, b) => Number(a) - Number(b));
    const length = sortedFlavanoids.length;

    if (length === 0) {
      return "-";
    }

    const middleIndex = Math.floor(length / 2);
    let median: number;

    if (length % 2 === 0) {
      median =
        (Number(sortedFlavanoids[middleIndex - 1]) +
          Number(sortedFlavanoids[middleIndex])) /
        2;
    } else {
      median = Number(sortedFlavanoids[middleIndex]);
    }

    return median.toFixed(3);
  };

  // calculate mode
  const calculateMode = (alcoholValue: number) => {
    const filteredData = data.filter((wine) => wine.Alcohol === alcoholValue);

    if (filteredData.length === 0) {
      return "-";
    }

    const flavanoidsMap: { [key: number]: number } = {};

    filteredData.forEach((wine) => {
      if (flavanoidsMap[wine.Flavanoids as number]) {
        flavanoidsMap[wine.Flavanoids as number]++;
      } else {
        flavanoidsMap[wine.Flavanoids as number] = 1;
      }
    });

    let maxCount = 0;
    let mode: number = 0;

    Object.entries(flavanoidsMap).forEach(([flavanoids, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mode = parseFloat(flavanoids);
      }
    });

    if (mode !== 0) {
      return mode.toFixed(3);
    }
  };

  return (
    <Fragment>
      <table className="table-body">
        <thead>
          <tr>
            <th className="measure-inline">Measures</th>
            {alcoholValues.map((item) => {
              return <th key={item}>Class {item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="measure-inline">Flavanoids Mean</td>
            {alcoholValues.length &&
              alcoholValues.map((item) => {
                return <th key={item}>{calculateMean(item)}</th>;
              })}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td className="measure-inline">Flavanoids Median</td>
            {alcoholValues.length &&
              alcoholValues.map((item) => {
                return <th key={item}>{calculateMedian(item)}</th>;
              })}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td className="measure-inline">Flavanoids Mode</td>
            {alcoholValues.length &&
              alcoholValues.map((item) => {
                return <th key={item}>{calculateMode(item)}</th>;
              })}
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};
export default FlavanoidsData;
