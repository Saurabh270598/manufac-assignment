import { Fragment, useEffect } from "react";
import { data } from "../../constant/data";
import "./style.css";

const GammaData = () => {
  // to calculate new data with Gamma as key
  const gamaValuesForEachData = () => {
    const newData = data.map((wine) => {
      // Gamma = (Ash * Hue) / Magnesium.
      const gamma =
        (Number(wine.Ash) * Number(wine.Hue)) / Number(wine.Magnesium);
      return { ...wine, Gamma: gamma };
    });
    return newData;
  };

  const alcoholValues: number[] = [];

  // to calculate all alcoholvalues only once  (eg: 1,2,3)
  data.forEach((item) => {
    if (!alcoholValues.includes(item.Alcohol)) {
      alcoholValues.push(item.Alcohol);
    }
  });

  // calculate mean
  const calculateMean = (alcoholValue: number) => {
    const filteredData = gamaValuesForEachData().filter(
      (item) => item.Alcohol === alcoholValue
    );

    const flavanoids = filteredData.map((item) => item.Gamma);
    const sum = flavanoids.reduce(
      (acc, value) => Number(acc) + Number(value),
      0
    );
    const mean = Number(sum) / flavanoids.length;
    return mean.toFixed(3);
  };

  // calculate meadian
  const calculateMedian = (alcoholValue: number) => {
    const filteredData = gamaValuesForEachData().filter(
      (item) => item.Alcohol === alcoholValue
    );
    const sortedFlavanoids = filteredData
      .map((item) => item.Gamma)
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
    const filteredData = gamaValuesForEachData().filter(
      (wine) => wine.Alcohol === alcoholValue
    );

    if (filteredData.length === 0) {
      return "-";
    }

    const flavanoidsMap: { [key: number]: number } = {};

    filteredData.forEach((wine) => {
      if (flavanoidsMap[wine.Gamma as number]) {
        flavanoidsMap[wine.Gamma as number]++;
      } else {
        flavanoidsMap[wine.Gamma as number] = 1;
      }
    });

    let maxCount = 0;
    let mode: number = 0;

    Object.entries(flavanoidsMap).forEach(([Gamma, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mode = parseFloat(Gamma);
      }
    });

    if (mode !== 0) {
      return mode.toFixed(3);
    }
  };

  useEffect(() => {
    gamaValuesForEachData();
  }, []);

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
            <td className="measure-inline">Gamma Mean</td>
            {alcoholValues.length &&
              alcoholValues.map((item) => {
                return <th key={item}>{calculateMean(item)}</th>;
              })}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td className="measure-inline">Gamma Median</td>
            {alcoholValues.length &&
              alcoholValues.map((item) => {
                return <th key={item}>{calculateMedian(item)}</th>;
              })}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td className="measure-inline">Gamma Mode</td>
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
export default GammaData;
