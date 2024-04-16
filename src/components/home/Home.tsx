import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");
import { data } from "../../data/data";
import { typePedido } from "../../interfaces/Interfaces";
import { AreaChartHero } from "../Chart";
export default function Home() {
  const [isConnect, setIsconnect] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>("");
  const [mesa, setMesa] = useState<string>("");
  // const [mensajes, setMensajes] = useState<typeMensaje[]>([]);
  const [pedidos, setPedidos] = useState<typePedido[]>(data);
  useEffect(() => {
    socket.on("connect", () => {
      setIsconnect(true);
    });
   
    //suscribirse a un evento
    socket.on("pedidos", (pedidos: typePedido) => {
      setPedidos((pedido) => [...pedido, pedidos]);
    });
    return () => {
      //desconectandose del evento
      socket.off("connect");
      socket.off("chat");
      socket.off("pedidos");
    };
  }, []);
  const graficar = () => {
    socket.emit("graficas",{
      mensaje:"iteracion one"
    })
  };
  const enviarPedido = () => {
    socket.emit("pedidos", {
      pedido: mensaje,
      mesa: mesa,
      id: socket.id,
    });
    socket.emit("graficar", {
      error: 1,
      iteracion: "iteracion  front",
    });
  };
  return (
    <div className="flex  flex-col justify-center items-center">
      {isConnect ? "Conectado" : "Desconectado"}
      <div className="flex justify-between w-96">
        <div>id</div>
        <div>mesa</div>
        <div>pedido</div>
      </div>

      {pedidos.map((pedido, i) => (
        <div key={i} className="flex justify-between w-96">
          <div>{pedido.id.substring(0, 2)} </div>
          <div>{pedido.mesa} </div>
          <div>{pedido.pedido} </div>
        </div>
      ))}
      <div className=" flex flex-col gap-2">
        <label htmlFor=""> Pedido </label>
        <input
          onChange={(e) => setMensaje(e.target.value)}
          type="text"
          className="p-2 rounded-lg inset-0  bg-transparent border border-gray outline-none"
        />
        <label htmlFor="">Mesa </label>
        <input
          onChange={(e) => setMesa(e.target.value)}
          type="text"
          className="p-2 rounded-lg inset-0  bg-transparent border border-gray outline-none"
        />
      </div>
      <button className="p-2 rounded-lg mt-2 bg-black" onClick={enviarPedido}>
        enviar
      </button>
      <button className="p-2 rounded-lg mt-2 bg-black" onClick={graficar}>
        graficar
      </button>
      <AreaChartHero></AreaChartHero>
    </div>
  );
}
