import { SwapChartContainer, SwapChartEmpty,ChartWapper } from "./styled";
import empty from "../../../assets/gif/empty.gif";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import Chart from "react-apexcharts";
import axios from "axios";
import { SwapChartPrice } from "../styled";
import { Skeleton } from "antd";
import { ContextProviderWrapper } from "@kibble-exchange/uikit";


const SwapChartTable = ({
  fromAssetKey,
  toAssetKey,
  timeTarget,
  fromSymbol,
  toSymbol,
  setValueChanges,
  valueChanges,
}: any) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { theme } = useContext(ContextProviderWrapper)!;
  const currentDate = new Date();
  const [dataRootTokent, setDataRootTokent] = useState<any>({});
  const [dataSwapTokent, setDataSwapTokent] = useState<any>(null);
  const [dataChart, setDataChart] = useState<any>({ x: [], y: [] });
  const [loading, setLoading] = useState<any>(true);
  const [isReLoad, setIsReLoad] = useState<any>(false);
  const [isNoData, setIsNoData] = useState<any>(false);
  const [currentTimeGetPrice, setCurrentTimeGetPrice] = useState("");

  const [formData, setFormData] = useState({
    token: fromAssetKey,
    currency: "usd",
    start_date: currentDate.getTime() - TimeLine[timeTarget].value,
    end_date: currentDate.getTime(),
  });
  useEffect(() => {
    if (formData.token && formData.end_date && formData.currency) {
      handleSubmit(fromAssetKey, toAssetKey, 1);
      handleGetRatioPrice();
    }
  }, [formData, timeTarget, fromAssetKey, toAssetKey]);
  const handleGetRatioPrice = () => {
    setPoinIndex(0);
    axios
      .post(`${BACKEND_URL}/api/v1/rates`, {
        tokens: [fromAssetKey, toAssetKey],
        currencies: ["usd"],
      })
      .then((response: any) => {
        let a = response?.data?.rates;
        a[fromAssetKey]?.prices?.USD && a[toAssetKey]?.prices?.USD
          ? setPoinIndex(
              (
                a[fromAssetKey]?.prices?.USD / a[toAssetKey]?.prices?.USD
              )?.toFixed(3)
            )
          : setPoinIndex(0);
        setCurrentTimeGetPrice(moment.utc().format("MMMM DD , YYYY hh:mm"));
      })
      .catch((error: any) => {
        console.log("Error:", error);
        setPoinIndex(0);
      });
  };
  const handleSubmit = (fromtoken: any, toTokent: any, type: any) => {
    setIsReLoad(false);
    setLoading(true);
    let c = Math.floor((formData.end_date - TimeLine[timeTarget].value) / 1000);
    let a = c - (c % 3600);

    let body :any = {
      token_address: [`${fromtoken}`, `${toTokent}`],
      from_time: a,
      to_time: Math.floor(
        formData.end_date / 1000 - ((formData.end_date / 1000) % 3600)
      ),
      point_count: TimeLine[timeTarget].poin,
    }
    if(TimeLine[timeTarget].poin === 12){
      body = {
        ...body , type : 'day'
      }
    }else {
      body = {
        ...body , type : 'week'
      }
    }

    axios
      .post(`${BACKEND_URL}/api/v1/rates/prices`, body)
      .then((response: any) => {
        setDataRootTokent(response?.data[0]?.points);
        setDataSwapTokent(response?.data[1]?.points);
        setLoading(false);
        setIsReLoad(true);
        setIsNoData(false);
      })
      .catch((error: any) => {
        console.log("Error:", error);
        setLoading(false);
      });
  };
  const [poinIndex, setPoinIndex] = useState<any>(null);

  useEffect(() => {
    if (isReLoad && dataRootTokent && dataSwapTokent) {
      let data: any = { x: [], y: [] };
      Object.keys(dataRootTokent).map((key: any) => {
        const dateTime = moment.unix(key - 25200);
        const day = dateTime.format("DD");
        const month = dateTime.format("MM");
        const hour = dateTime.format("HH");
        const minute = dateTime.format("mm");
        if (dataSwapTokent[key] && dataSwapTokent[key] > 0) {
          data.x = [
            ...data.x,
            timeTarget === 0
              ? `${hour}:${minute}`
              : timeTarget === 1
              ? `${hour}h-${day}/${month}`
              : `${day}/${month}`,
          ];
          data.y = [...data.y, dataRootTokent[key] / dataSwapTokent[key]];
        }
      });
      setDataChart(data);
    } else {
      setIsNoData(true);
    }
  }, [dataSwapTokent, isReLoad]);

  useEffect(() => {
    if (dataSwapTokent && poinIndex && dataRootTokent && dataChart.y[0]) {
      setValueChanges(((poinIndex - dataChart.y[0]) / dataChart.y[0]) * 100);
    } else {
      setValueChanges(0);
    }
  }, [poinIndex, dataChart.y[0]]);

  const options: any = {
    options: {
      chart: {
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            customIcons: [],
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ",",
              headerCategory: "category",
              headerValue: "value",
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            },
          },
          autoSelected: "zoom",
        },
      },
      colors:
        valueChanges < 0
          ? ["#f50f48", "#3232320", "#3232320"]
          : ["#0ff586", "#3232320", "#3232320"],

      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.8,
          gradientToColors: "#3232320",
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      labels: dataChart?.x,
      xaxis: {
        labels: {
          style: {
            colors: theme === "light" ? "#5E5E6B" : "#ffffff80",
          },
        },
      },
      yaxis: {
        // min: 0,
        decimalsInFloat: 2,
        opposite: true,
        labels: {
          style: {
            colors: theme === "light" ? "#5E5E6B" : "#ffffff80",
          },
        },
        // crosshairs: {
        //   show: true,
        // },
      },
      markers: {
        size: 0,
        fillOpacity: 0,
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            xaxis: {
              // labels: {
              //   show: false,
              // },
            },
          },
        },
      ],
    },
    series: [
      {
        name: `${fromSymbol} / ${toSymbol}`,
        data: dataChart.y,
      },
    ],
  };
  return (
    <>
      <SwapChartPrice className={theme}>
        <p>{poinIndex || "0.00"}</p>
        <span>
          {currentTimeGetPrice ? `${currentTimeGetPrice} UTC` : "--:--"}{" "}
        </span>
      </SwapChartPrice>
      <SwapChartContainer>
        {loading ? (
          <SwapChartEmpty>
            <Skeleton active paragraph={{ rows: 5 }} />
          </SwapChartEmpty>
        ) : dataChart.y <= 0 || isNoData ? (
          <SwapChartEmpty>
            <figure>
              <img src={empty} alt="icon" />
            </figure>
            <p>No data</p>
            <span>
              Data for the chart will not appear until the
              <br /> first swap occurs
            </span>
          </SwapChartEmpty>
        ) : (
          <>
            <ChartWapper>
              <Chart
                options={options.options}
                series={options.series}
                type="area"
                height={350}
              />
            </ChartWapper>
          </>
        )}
      </SwapChartContainer>
    </>
  );
};

const TimeLine = [
  {
    label: "1 Day",
    value: 86400000,
    poin: 12,
  },
  {
    label: "1 Week",
    value: 604800000,
    poin: 6,
  },
  {
    label: "1 Month",
    value: 2629743000,
    poin: 29,
  },
];

export default SwapChartTable;
