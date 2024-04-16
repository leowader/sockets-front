import { AreaChart } from "@tremor/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
interface typeChartData {
  error: number;
  iteracion: string;
}
const socket = io("http://localhost:4000");
const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export function AreaChartHero() {
  const [errores, setErrrores] = useState<typeChartData[]>([]);
  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("graficas", (grafica) => {
      if (grafica.iteracion === "iteracion 0") {
        setErrrores([]);
      }
      setErrrores((data) => [...data, grafica]);
      //datos itecacion
      console.log(grafica);
    });
    return () => {
      socket.off("graficas");
      socket.off("connect");
    };
  }, []);
  const graficar = () => {
    setErrrores([]);
    socket.emit("graficas", {
      mensaje: "empieza a graficar bro",
    });
  };
  return (
    <>
      <AreaChart
        className="h-80 "
        data={errores}
        index="iteracion"
        categories={["error"]}
        colors={["indigo"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        showAnimation={true}
        onValueChange={(v) => console.log(v)}
      />
      <button className="p-2 rounded-lg mt-2 bg-black" onClick={graficar}>
        graficar iteracines
      </button>
    </>
  );
}
