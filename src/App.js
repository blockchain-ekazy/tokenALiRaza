import logo from "./logo.svg";
import React, { useState, useContext, useEffect } from "react";
import { Web3Context } from "./web3Context";
import "./App.css";
import frame from "./Frame.png";
import active from "./active.png";
import metamasklogo from "./MetaMask_Fox.svg.png";
import emachlogo from "./logosin.png";
import { ethers } from "ethers";
import Navbar from "./Navbar";
import sidel from "./sidel.png";
import sider from "./sider.png";
import token from "./token.png";
import one from "./1.png";
import two from "./2.png";
import three from "./3.png";
function App() {
  const {
    isConnectedd,
    web3,
    connectedAddress,
    connectToMetaMask,
    signer,
    Network,
  } = useContext(Web3Context);
  const [TokenQuantity, setTokenQuantity] = useState("");
  const [rate, setrate] = useState(0);

  const handleConnect = async () => {
    if (isConnectedd === false) {
      await connectToMetaMask();
    }
  };

  async function fetchrate() {
    try {
      const ct = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        process.env.REACT_APP_ABI,
        signer
      );
      const tx = await ct.rate();
      setrate(tx);

      console.log("Transaction receipt:", parseInt(tx._hex));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchrate();
  }, [connectedAddress]);

  async function BuyToken(e) {
    e.preventDefault();

    try {
      const ct = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        process.env.REACT_APP_ABI,
        signer
      );
      const tx = await ct.buyToken(TokenQuantity, {
        value: rate * TokenQuantity,
        gasLimit: 3000000,
      });
      console.log("Transaction receipt:", tx);
    } catch (error) {
      alert(error.code);
      console.log(error);
    }
  }
  return (
    <>
      <Navbar />
      <div className="bg-black">
        <div className="  bg-green-radial22 ">
          <div className="main-content    flex min-h-screen items-center justify-center gap-10">
            <div className=" w-[90%] max-w-[1440px] p-4  ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Section: Text, Heading, Tagline */}
                <div className="text-white">
                  <h1 className="textheading px-5">Emach Token!</h1>
                  <p className="mt-4 text-lg text-justify px-5">
                    Donde los ecos de los antiguos guerreros se fusionan con el
                    mundo de vanguardia de las criptomonedas guiados por los
                    principios de fuerza, resiliencia y la promesa de
                    posibilidades ilimitadas.
                  </p>
                  <button
                    onClick={handleConnect}
                    className="bg-white ml-2 mt-10 hover:bg-[#AB3610] hover:text-white   text-black font-semibold   w-[200px] flex flex-row justify-center items-center gap-3 rounded-full px-4 py-2"
                  >
                    <span>
                      <img width={40} height={40} src={metamasklogo} />
                    </span>{" "}
                    {connectedAddress
                      ? `${connectedAddress.slice(
                          0,
                          4
                        )}...${connectedAddress.slice(
                          connectedAddress.length - 4
                        )}`
                      : "Conectar Billetera"}
                  </button>
                </div>

                {/* Right Section: Form Fields, Button, and Heading */}
                <div className="bg-black border  w-[400px] py-5 bg-opacity-[0.3] p-4 rounded-lg shadow-lg">
                  <div className="flex flex-row justify-center items-center">
                    <h2 className="text-xl text-white text-center font-semibold font-sdf">
                      Comprar Tokens{" "}
                    </h2>
                  </div>
                  <div className="flex flex-row mt-6 justify-between">
                    <h3 className="text-white ">Precio de lista</h3>
                    <h3 className="flex flex-row gap-3 items-center justify-center">
                      {" "}
                      <img width="30" height="30" src={frame} />
                      <span className="text-darkText text-white  text-sm ">
                        1 Token = {ethers.utils.formatUnits(rate, "ether")}{" "}
                        MATIC
                      </span>
                    </h3>
                  </div>

                  <div className="w-full  mt-4 text-white rounded-full h-6">
                    <p className="p-tag ">La venta está activa</p>
                  </div>
                  {/* <div>
                    <h2 className="font-bold mt-2 mb-3 text-white ">
                      1 Token = {rate}ETH
                    </h2>
                  </div> */}

                  <form>
                    <div className="flex items-center justify-center py-3 max-w-full mx-auto">
                      <div className="flex  flex-col  gap-x-3 w-full">
                        <div className="flex flex-col ">
                          <label className=" text-white">
                            Cantidad de tokens a comprar{" "}
                          </label>
                        </div>
                        <div className="flex flex-1 w-full mt-2  rounded justify-between items-center p-0.5 pr-1.5 border-b border-skin-pink dark:border-[#ffffff26]">
                          <input
                            type="number"
                            className="bg-transparent flex-1 w-auto text-center z-20 block border-b-[#AB3610]  focus:outline-none text-darkText dark:text-white appearance-none"
                            placeholder="0"
                            min={0}
                            onChange={(e) => {
                              setTokenQuantity(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                      <button
                        onClick={BuyToken}
                        className="hover:bg-white hover:text-black bg-[#AB3610] text-white w-1/2 rounded-full px-4 py-2 mt-4"
                      >
                        Comprar Tokens{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row py-10 justify-center items-center">
          <div className="w-[90%] max-w-[1440px] p-4 ">
            <div className="grid grid-cols-3 text-white gap-3 mx-auto">
              <div className="text-center rounded-md  px-4 py-8 flex flex-col gap-2">
                <span className="mas-addons-feature-icon icon-type-icon mb-[30px]">
                  <div className="dot">
                    <img src={one} alt="" />
                  </div>{" "}
                </span>{" "}
                <h3 className="font-semibold text-lg">
                  Conecta tu bIlletera a Metamask{" "}
                </h3>
                <p>
                  Abre tu navegador _Google Chrome_, haz clic en “Conectar
                  billetera”  y aprueba en tu extensión de Metamask.
                </p>
              </div>
              <div className="text-center rounded-md  px-4 py-8 flex flex-col gap-2">
                <span className="mas-addons-feature-icon icon-type-icon mb-[30px]">
                  <div className="dot">
                    <img src={two} alt="" />
                  </div>{" "}
                </span>
                <h3 className="font-semibold text-lg">Cantidad de Tokens</h3>
                <p> Ingresa la cantidad de tokens que deseas comprar.</p>
              </div>
              <div className="text-center rounded-md  px-4 py-8 flex flex-col gap-2">
                <span className="mas-addons-feature-icon icon-type-icon mb-[30px]">
                  <div className="dot">
                    <img src={three} alt="" />
                  </div>
                </span>{" "}
                <h3 className="font-semibold text-lg">Compra ahora</h3>
                <p> Click en comprar ahora para adquirir tus Tokens Emach.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row py-20 justify-center bg-[#201D1D] items-center">
          <div className="w-[90%] max-w-[1440px] p-4 ">
            <div className="grid grid-cols-2 text-white gap-4 mx-auto">
              <div>
                <div className="ytp-cued-thumbnail-overlay">
                  <div className="ytp-cued-thumbnail-overlay-image">
                    <iframe
                      width="524"
                      height="295"
                      src="https://www.youtube.com/embed/EsZMM25zj6Y"
                      title="Emach Constructor"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className=" px-[30px]">
                <div className="">
                  <h2 className="elementor-element">Cómo funciona?​</h2>
                </div>
                <p className="  mt-5 text-white ">
                  Al integrar perfectamente la tecnología blockchain, Emach
                  pretende revolucionar la forma en que se realizan las
                  transacciones y los servicios dentro de este dominio. Como
                  participante en el espacio criptográfico, ahora es el momento
                  oportuno para profundizar en las complejidades de Emach Token,
                  aprovechar la oportunidad para aprender más y participar
                  activamente en esta floreciente iniciativa blockchain que
                  promete transformar el panorama de la construcción.<br></br>{" "}
                  <span className="my-4">
                    Para más información visita https://www.emach.mx
                  </span>{" "}
                  <br></br> Nuestro Token Emach será abastecido de manera
                  regular con un porcentaje de ganancia del servicio mencionado.
                </p>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F2F2F2] flex justify-between">
          <img className="mt-40" src={sidel} alt="" />
          <div className="flex -mt-52 text-black text-center items-center flex-col justify-center">
            <h1 className="text-4xl  font-semibold">Token Emach</h1>
            <img className="mb-8" src={token} alt="" />
            <p className="font-black text-xl my-8">Flujo Emach</p>
            <p>
              {" "}
              La fortaleza sistemática del Token Emach será abastecida por el
              17% de los ingresos generados por el servicio que brindamos a
              nuestros usuarios de las apps.
            </p>
          </div>
          <img className="mt-40" src={sider} alt="" />
        </div>

        <footer className="bg-black pt-34">
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

          <div className="mx-auto w-[90%] max-w-[1440px] p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <a href="#" className="flex items-center">
                  <img
                    src={emachlogo}
                    className="h-8 mr-3"
                    alt="FlowBite Logo"
                  />
                  {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Flowbite
                  </span> */}
                </a>
                <p className="text-gray-500">
                  Visita nuestro centro de ayuda o haz<br></br> enlace con
                  nosotros por medio <br></br>del chat para solventar tus dudas.{" "}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                    Productos
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="">
                      <a className="hover:underline">Crypto</a>
                    </li>
                    <li>
                      <a className="hover:underline">NFT</a>
                    </li>
                    <li>
                      <a className="hover:underline">Juegos</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                    Empresa
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="">
                      <a className="hover:underline ">Inicio </a>
                    </li>
                    <li>
                      <a className="hover:underline">Acerca de </a>
                    </li>
                    <li>
                      <a className="hover:underline">Tutorial </a>
                    </li>
                    <li>
                      <a className="hover:underline">Legal </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                    Contacto
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li>
                      <a
                        href="https://discord.gg/4eeurUVvTy"
                        className="hover:underline"
                      >
                        token@emach.mx
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023{" "}
                <a href="#" className="hover:underline">
                  Emach
                </a>
                . All Rights Reserved.
              </span>
              <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 8 19"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Facebook page</span>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 21 16"
                  >
                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                  </svg>
                  <span className="sr-only">Discord community</span>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 17"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Twitter page</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
