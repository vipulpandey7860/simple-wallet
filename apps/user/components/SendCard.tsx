"use client";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/Card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { P2PTransfer } from "../lib/actions/p2pTrans";

export function SendCard() {
  const [number, setNumber] = useState(0);
  const [amount, setAmount] = useState(0);

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => {
                setNumber(Number(value));
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(Number(value));
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  await P2PTransfer(amount, number);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
