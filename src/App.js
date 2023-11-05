import logo from "./logo.svg";
import "./App.css";
import active from "./active.png";
import metamasklogo from "./MetaMask_Fox.svg.png";
function App() {
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
                  <button className="bg-white ml-2 mt-10 hover:bg-[#AB3610] hover:text-white   text-black font-semibold   w-[200px] flex flex-row justify-center items-center gap-3 rounded-full px-4 py-2">
                    <span>
                      <img width={40} height={40} src={metamasklogo} />
                    </span>{" "}
                    Connect Wallet
                  </button>
                </div>

                {/* Right Section: Form Fields, Button, and Heading */}
                <div className="bg-black  py-5 bg-opacity-75 p-4 rounded-lg shadow-lg">
                  <div className="flex flex-row justify-center items-center">
                    <h2 className="text-xl text-white text-center font-semibold">
                      Buy Emach Token
                    </h2>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h3 className="text-white">Listing Price</h3>
                    <h3 className="flex flex-row gap-3 items-center justify-center">
                      {" "}
                      <img width="10" height="10" src={active} />
                      <span class="text-darkText text-white dark:text-white text-base md:text-lg">
                        $0.00022
                      </span>
                    </h3>
                  </div>

                  <div class="w-full  mt-4 rounded-full h-6">
                    <p className="p-tag">Sale is Live</p>
                  </div>
                  <div>
                    <h2 className="font-bold mt-2 mb-3 text-white ">
                      1 Token = 0.003ETH
                    </h2>
                  </div>

                  <form>
                    <div class="flex items-center justify-center max-w-full mx-auto">
                      <div class="flex items-center gap-x-3 w-full">
                        <div className="flex flex-row justify-center items-center">
                          <label className=" text-white">
                            <span class="font-bold text-white">Tokens </span>
                            Amount to Buy:
                          </label>
                        </div>
                        <div class="flex flex-1 w-full bg-white dark:bg-[#2f32417f] rounded-full justify-between items-center p-0.5 pr-1.5 border border-skin-pink dark:border-[#ffffff26]">
                          <input
                            type="number"
                            class="bg-transparent flex-1 w-auto text-center z-20 block border-0 focus:outline-none text-darkText dark:text-white appearance-none"
                            placeholder="0"
                            readonly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                      <button className="bg-green-500 hover:bg-[#ffd500] text-white w-1/2 rounded-full px-4 py-2 mt-4">
                        Buy Tokens
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="w-[90%] max-w-[1440px] p-4 ">
            <div className="grid grid-cols-3 text-white gap-3 mx-auto">
              <div className="hover:border rounded-md  p-4 flex flex-col gap-2">
                <img src={metamasklogo} width={40} height={40}></img>
                <h3 className="font-semibold text-lg">
                  Connect Metamask Wallet
                </h3>
                <p>
                  Open your "Google Chrome" browser, click "Connect Wallet"
                  andapprove in your "Metamask" extension.
                </p>
              </div>
              <div className="hover:border rounded-md  p-4 flex flex-col gap-2">
                <img src={metamasklogo} width={40} height={40}></img>
                <h3>Enter token amount</h3>
                <p>Enter the amount of tokens you want to buy.</p>
              </div>
              <div className="hover:border rounded-md  p-4 flex flex-col gap-2">
                <img src={metamasklogo} width={40} height={40}></img>
                <h3>Connect Wallet</h3>
                <p>
                  Open your "Google Chrome" browser, click "Connect Wallet"
                  andapprove in your "Metamask" extension.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
