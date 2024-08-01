import { Sender, SenderArguments } from "ton-core";
import { useTonConnectUI } from "@tonconnect/ui-react";

export function useTonConnect(): { sender: Sender; connected: boolean } {
  const [tonConnectUi] = useTonConnectUI();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUi.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
    },
    connected: tonConnectUi.connected,
  };
}
