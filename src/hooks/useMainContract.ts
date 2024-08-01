import { useEffect, useState } from "react";
import { Address, OpenedContract } from "ton-core";
import { toNano } from "ton-core";

import { useTonConnect } from "./useTonConnect";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { MainContract } from "../contracts/MainContract";

export function useMainContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  const [contractData, setContractData] = useState<null | {
    counter_value: number;
    recent_sender: Address;
    owner_address: Address;
  }>();

  const [balance, setBalance] = useState(0);

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = new MainContract(
      Address.parse("EQAU3h9x__B5TSQ8vnWCCzuZ34RIaND4MvxzQrEr5jPIDl2o")
    );

    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;

      setContractData(null);

      const val = await mainContract.getData();
      const { balance } = await mainContract.getBalance();

      setContractData({ ...val, counter_value: val.number });
      setBalance(balance);
      // await sleep(7000);
      // getValue();
    }

    getValue();
  }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    ...contractData,
    sendIncrement: async () => {
      return mainContract?.sendIncrement(sender, toNano("0.05"), 5);
    },
    sendDeposit: async () => {
      return mainContract?.sendDeposit(sender, toNano("1"));
    },
    sendWithdrawalRequest: async () => {
      return mainContract?.sendWithdrawalRequest(
        sender,
        toNano("0.05"),
        toNano("0.7")
      );
    },
  };
}
