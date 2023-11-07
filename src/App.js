import logo from "./logo.svg";
import React, { useState, useContext, useEffect } from "react";
import { Web3Context } from "./web3Context";
import "./App.css";
import active from "./active.png";
import metamasklogo from "./MetaMask_Fox.svg.png";
import emachlogo from "./logosin-fondo.png";
import { ethers } from "ethers";
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
  const [rate, setrate] = useState("");

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
      setrate(parseFloat(parseInt(tx._hex) / 1e18));
      console.log("Transaction receipt:", parseInt(tx._hex));
    } catch (error) {
      // alert(error.code);
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
        value: ethers.utils.parseEther((rate * TokenQuantity).toString()),
        gasLimit: 3000000,
      });
      console.log("Transaction receipt:", tx);
    } catch (error) {
      alert(error.code);
    }
  }
  return (
    <>
      <div className="bg-black">
        <div className="  bg-green-radial22 ">
          <div className="main-content    flex min-h-screen items-center justify-center gap-10">
            <div className=" w-[90%] max-w-[1440px] p-4  ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Section: Text, Heading, Tagline */}
                <div className="text-white">
                  <h1 className="textheading px-5">Emach Token!</h1>
                  <p className="mt-4 text-lg text-justify px-5">
                    where the echoes of ancient warriors merge with the
                    cutting-edge world of cryptocurrency. Guided by the
                    principles of strength, resilience, and the promise of
                    limitless possibilities.
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
                      : "Connect Wallet"}
                  </button>
                </div>

                {/* Right Section: Form Fields, Button, and Heading */}
                <div className="bg-black border  w-[400px] py-5 bg-opacity-[0.3] p-4 rounded-lg shadow-lg">
                  <div className="flex flex-row justify-center items-center">
                    <h2 className="text-xl text-white text-center font-semibold font-sdf">
                      Buy Emach Token
                    </h2>
                  </div>
                  <div className="flex flex-row mt-6 justify-between">
                    <h3 className="text-white ">Listing Price</h3>
                    <h3 className="flex flex-row gap-3 items-center justify-center">
                      {" "}
                      <img width="10" height="10" src={active} />
                      <span class="text-darkText text-white  text-sm ">
                        1 Token = {rate}ETH
                      </span>
                    </h3>
                  </div>

                  <div class="w-full  mt-4 text-white rounded-full h-6">
                    <p className="p-tag ">Sale is Live</p>
                  </div>
                  {/* <div>
                    <h2 className="font-bold mt-2 mb-3 text-white ">
                      1 Token = {rate}ETH
                    </h2>
                  </div> */}

                  <form>
                    <div class="flex items-center justify-center py-3 max-w-full mx-auto">
                      <div class="flex  flex-col  gap-x-3 w-full">
                        <div className="flex flex-col ">
                          <label className=" text-white">
                            Tokens Amount to Buy
                          </label>
                        </div>
                        <div class="flex flex-1 w-full mt-2  rounded justify-between items-center p-0.5 pr-1.5 border-b border-skin-pink dark:border-[#ffffff26]">
                          <input
                            type="number"
                            class="bg-transparent flex-1 w-auto text-center z-20 block border-b-[#AB3610]  focus:outline-none text-darkText dark:text-white appearance-none"
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
                        Buy Tokens
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
              <div className="hover:border rounded-md  px-4 py-8 flex flex-col gap-2">
                <span class="mas-addons-feature-icon icon-type-icon mb-[30px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                  >
                    <path
                      d="M43.6816 42.3631H39.7265V13.2713H43.6816C44.8508 13.2713 45.4409 11.8548 44.6176 11.0246L34.0707 0.389849C33.5552 -0.12995 32.7141 -0.12995 32.1986 0.389849L21.6517 11.0246C20.8283 11.8549 21.4186 13.2713 22.5878 13.2713H26.5429V21.1815H17.1387C16.4106 21.1815 15.8203 21.7718 15.8203 22.4999V29.0917H6.59179C5.86369 29.0917 5.2734 29.682 5.2734 30.4101V42.3632H1.31839C0.590289 42.3632 0 42.9535 0 43.6816C0 44.4097 0.590289 45 1.31839 45H43.6816C44.4098 45 45 44.4097 45 43.6816C45 42.9534 44.4097 42.3631 43.6816 42.3631ZM15.8203 42.3631H7.91019V31.7283H15.8203V42.3631ZM26.543 42.3631H18.4571V23.8182H26.543V42.3631ZM37.0898 11.953V42.3631H29.1797V11.953C29.1797 11.2249 28.5894 10.6346 27.8613 10.6346H25.7521L33.1348 3.19038L40.5174 10.6346H38.4082C37.6801 10.6347 37.0898 11.2249 37.0898 11.953Z"
                      fill="white"
                    ></path>
                  </svg>{" "}
                </span>{" "}
                <h3 className="font-semibold text-lg">
                  Connect Metamask Wallet
                </h3>
                <p>
                  Open your "Google Chrome" browser, click "Connect Wallet"
                  andapprove in your "Metamask" extension.
                </p>
              </div>
              <div className="border rounded-md  px-4 py-8 flex flex-col gap-2">
                <span class="mas-addons-feature-icon icon-type-icon mb-[30px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="41"
                    height="45"
                    viewBox="0 0 41 45"
                    fill="none"
                  >
                    <path
                      d="M38.4642 7.28943C36.2034 6.51283 34.3924 4.69151 33.6192 2.41734C33.1276 0.97126 31.7738 0 30.2502 0H10.619C9.09565 0 7.74158 0.97126 7.24995 2.41734C6.47678 4.69151 4.66576 6.51283 2.40498 7.28943C0.966454 7.78381 0 9.14165 0 10.6684V15.6346C0 22.1151 1.94183 28.355 5.61573 33.68C8.9772 38.5521 13.6093 42.3647 19.0118 44.7061C19.464 44.9022 19.9491 45 20.4346 45C20.9197 45 21.4048 44.9022 21.857 44.7061C27.2595 42.365 31.8916 38.5521 35.2531 33.68C38.927 28.355 40.8691 22.1148 40.8691 15.6346V10.6684C40.8691 9.14165 39.9027 7.78381 38.4642 7.28943ZM38.2324 15.6346C38.2324 21.5775 36.4516 27.2997 33.0826 32.1827C30.0019 36.648 25.7574 40.142 20.8084 42.2867C20.5712 42.3897 20.2983 42.3901 20.0603 42.2867C15.111 40.142 10.8669 36.648 7.78622 32.1827C4.41753 27.3 2.63672 21.5778 2.63672 15.6346V10.6684C2.63672 10.2674 2.88803 9.91173 3.26191 9.78333C6.2883 8.7434 8.7125 6.30718 9.74625 3.26603C9.87431 2.88975 10.2248 2.63672 10.619 2.63672H30.2502C30.644 2.63672 30.9948 2.88975 31.1229 3.26603C32.1566 6.30718 34.5808 8.7434 37.6072 9.78333C37.9811 9.91173 38.2324 10.2674 38.2324 10.6684V15.6346Z"
                      fill="white"
                    ></path>
                    <path
                      d="M26.0369 17.0931H25.9473V13.3386C25.9473 10.2991 23.4743 7.82617 20.4349 7.82617C17.3955 7.82617 14.9225 10.2991 14.9225 13.3386V17.0931H14.8329C13.0823 17.0931 11.6582 18.5176 11.6582 20.2682V27.8556C11.6582 31.1158 14.3107 33.7687 17.5706 33.7687H23.2992C26.5594 33.7687 29.2116 31.1158 29.2116 27.8556V20.2682C29.2116 18.5176 27.7875 17.0931 26.0369 17.0931ZM17.5592 13.3386C17.5592 11.7531 18.8494 10.4629 20.4349 10.4629C22.0204 10.4629 23.3106 11.7531 23.3106 13.3386V17.0935H17.5592V13.3386ZM26.5749 27.8556C26.5749 29.6622 25.1055 31.1316 23.2992 31.1316H17.5706C15.7643 31.1316 14.2949 29.6622 14.2949 27.8556V20.2682C14.2949 19.9716 14.5363 19.7302 14.8329 19.7302H26.0369C26.3335 19.7302 26.5749 19.9716 26.5749 20.2682V27.8556Z"
                      fill="white"
                    ></path>
                    <path
                      d="M20.4346 22.8672C19.7064 22.8672 19.1162 23.4574 19.1162 24.1855V26.6764C19.1162 27.4045 19.7064 27.9947 20.4346 27.9947C21.1628 27.9947 21.7529 27.4045 21.7529 26.6764V24.1855C21.7529 23.4574 21.1628 22.8672 20.4346 22.8672Z"
                      fill="white"
                    ></path>
                  </svg>{" "}
                </span>
                <h3 className="font-semibold text-lg">Enter token amount</h3>
                <p>Enter the amount of tokens you want to buy.</p>
              </div>
              <div className="hover:border rounded-md  px-4 py-8 flex flex-col gap-2">
                <span class="mas-addons-feature-icon icon-type-icon mb-[30px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                  >
                    <path
                      d="M44.2848 34.0201L39.4634 30.8058C39.1998 30.6306 38.888 30.5358 38.5714 30.5358H17.9855C16.2755 27.5754 13.1062 25.7144 9.64286 25.7144C4.32482 25.7144 0 30.0392 0 35.3572C0 40.6752 4.32482 45.0001 9.64286 45.0001C13.1062 45.0001 16.2755 43.139 17.9855 40.1786H20.512L23.3871 41.617C23.8387 41.8436 24.3723 41.8436 24.8255 41.617L27.3214 40.3683L29.8173 41.6154C30.2689 41.842 30.8025 41.842 31.2557 41.6154L34.1293 40.1786H38.5714C38.888 40.1786 39.1998 40.0838 39.4634 39.9086L44.2848 36.6944C44.7316 36.3954 45 35.894 45 35.3572C45 34.8204 44.7316 34.319 44.2848 34.0201ZM38.0845 36.9644H33.75C33.5009 36.9644 33.2534 37.0222 33.0316 37.1331L30.5357 38.3819L28.0398 37.1347C27.5882 36.9081 27.0546 36.9081 26.6014 37.1347L24.1071 38.3819L21.6112 37.1347C21.3895 37.0222 21.142 36.9644 20.8929 36.9644H17.0004C16.3623 36.9644 15.7837 37.342 15.5282 37.927C14.5012 40.2719 12.1918 41.7858 9.64286 41.7858C6.0975 41.7858 3.21429 38.9026 3.21429 35.3572C3.21429 31.8119 6.0975 28.9286 9.64286 28.9286C12.1918 28.9286 14.5012 30.4426 15.5282 32.7874C15.7837 33.3724 16.3623 33.7501 17.0004 33.7501H38.0845L40.4952 35.3572L38.0845 36.9644Z"
                      fill="white"
                    ></path>
                    <path
                      d="M9.5 32C7.57033 32 6 33.5703 6 35.5C6 37.4297 7.57033 39 9.5 39C11.4297 39 13 37.4297 13 35.5C13 33.5703 11.4297 32 9.5 32ZM9.5 36.6667C8.856 36.6667 8.33333 36.1428 8.33333 35.5C8.33333 34.8572 8.856 34.3333 9.5 34.3333C10.144 34.3333 10.6667 34.8572 10.6667 35.5C10.6667 36.1428 10.144 36.6667 9.5 36.6667Z"
                      fill="white"
                    ></path>
                    <path
                      d="M12.0536 22.5C15.4527 22.5 18.712 21.1516 20.9941 18.7987C21.6129 18.1623 21.5968 17.145 20.9604 16.5262C20.3239 15.9075 19.3066 15.9236 18.6879 16.56C17.0052 18.2925 14.588 19.2857 12.0536 19.2857C7.18071 19.2857 3.21429 15.6809 3.21429 11.25C3.21429 6.81911 7.18071 3.21429 12.0536 3.21429C16.9264 3.21429 20.8929 6.81911 20.8929 11.25C20.8929 17.4536 26.2993 22.5 32.9464 22.5C39.5936 22.5 45 17.4536 45 11.25C45 5.04643 39.5936 0 32.9464 0C29.5473 0 26.288 1.35 24.0059 3.70286C23.3871 4.33929 23.4032 5.35821 24.0396 5.97536C24.6761 6.5925 25.6934 6.57964 26.3121 5.94161C27.9948 4.2075 30.412 3.21429 32.9464 3.21429C37.8193 3.21429 41.7857 6.81911 41.7857 11.25C41.7857 15.6809 37.8193 19.2857 32.9464 19.2857C28.0736 19.2857 24.1071 15.6809 24.1071 11.25C24.1071 5.04643 18.7007 0 12.0536 0C5.40643 0 0 5.04643 0 11.25C0 17.4536 5.40643 22.5 12.0536 22.5Z"
                      fill="white"
                    ></path>
                  </svg>{" "}
                </span>{" "}
                <h3 className="font-semibold text-lg">Click Buy Now </h3>
                <p>Click on Buy now to buy the Emach Tokens.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row py-20 justify-center items-center">
          <div className="w-[90%] max-w-[1440px] p-4 ">
            <div className="grid grid-cols-2 text-white gap-4 mx-auto">
              <div>
                <div class="ytp-cued-thumbnail-overlay">
                  <div class="ytp-cued-thumbnail-overlay-image">
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

              <div class=" px-[30px]">
                <div className="">
                  <h2 class="elementor-element">Cómo funciona??​</h2>
                </div>
                <p class="  mt-5 text-white ">
                  Al darte de alta en nuestra plataforma podrás organizar{" "}
                  <br></br>tus pedidos de maquinaria ligera o pesada, también
                  <br></br>
                  encontrarás otros servicios de manera eficiente.
                </p>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row py-20 justify-center items-center">
          <div className="w-[90%] max-w-[1440px] p-4 ">
            <div className="flex flex-col justify-center items-center">
              <h2 class="elementor-heading-title">¿Qué esperas?​</h2>
            </div>
            <div class="elementor-widget-container px-[30px]">
              <p class="elementor-widget-container text-center mt-5 text-white px-[30px]">
                Descarga, prueba y forma parte de nuestra plataforma digital, en
                Emach estamos para apoyarte.&nbsp;
              </p>{" "}
            </div>
          </div>
        </div>

        <footer class="bg-black pt-34">
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

          <div class="mx-auto w-[90%] max-w-[1440px] p-4 py-6 lg:py-8">
            <div class="md:flex md:justify-between">
              <div class="mb-6 md:mb-0">
                <a href="#" class="flex items-center">
                  <img src={emachlogo} class="h-8 mr-3" alt="FlowBite Logo" />
                  {/* <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Flowbite
                  </span> */}
                </a>
                <p className="text-gray-500">
                  Visita nuestro centro de ayuda o haz<br></br> enlace con
                  nosotros por medio <br></br>del chat para solventar tus dudas.{" "}
                </p>
              </div>
              <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                  <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                    Productos
                  </h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    <li class="">
                      <a class="hover:underline">Crypto</a>
                    </li>
                    <li>
                      <a class="hover:underline">NFT</a>
                    </li>
                    <li>
                      <a class="hover:underline">Juegos</a>
                    </li>
                    <li>
                      <a class="hover:underline">Juegos</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                    Empresa
                  </h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    <li class="">
                      <a class="hover:underline ">Inicio </a>
                    </li>
                    <li>
                      <a class="hover:underline">Acerca de </a>
                    </li>
                    <li>
                      <a class="hover:underline">Tutorial </a>
                    </li>
                    <li>
                      <a class="hover:underline">Legal </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                    Contacto
                  </h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    <li class="">
                      <a
                        href="https://github.com/themesberg/flowbite"
                        class="hover:underline "
                      >
                        +52 xxxxxxxx
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://discord.gg/4eeurUVvTy"
                        class="hover:underline"
                      >
                        info@emach.mx
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="sm:flex sm:items-center sm:justify-between">
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023{" "}
                <a href="#" class="hover:underline">
                  Emach
                </a>
                . All Rights Reserved.
              </span>
              <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
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
                  <span class="sr-only">Facebook page</span>
                </a>
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 21 16"
                  >
                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                  </svg>
                  <span class="sr-only">Discord community</span>
                </a>
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    class="w-4 h-4"
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
                  <span class="sr-only">Twitter page</span>
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
