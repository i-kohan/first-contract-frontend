import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import "./App.css";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";
import WebApp from "@twa-dev/sdk";

function App() {
  const {
    contract_address,
    counter_value,
    // recent_sender,
    // owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();

  const { connected } = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <b>{WebApp.platform}</b>
          <b>Our contract Address</b>
          <div className="Hint">{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className="Hint">{fromNano(contract_balance)}</div>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{counter_value}</div>
        </div>

        <a
          onClick={() => {
            showAlert();
          }}
        >
          Show Alert
        </a>

        <br />

        {connected ? <a onClick={sendIncrement}>Increment by 5</a> : null}
        <br />
        {connected ? (
          <a onClick={sendDeposit}>Request deposit of 1 TON</a>
        ) : null}
        <br />

        {connected ? (
          <a onClick={sendWithdrawalRequest}>Request 0.7 TON withdrawal</a>
        ) : null}
      </div>
    </div>
  );
}

export default App;
