'use client';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from 'react';
import Loading from "./loading-component";

const BACKEND_ENDPOINT = 'http://localhost:8888'


export function FormComponent() {
  const [addressValue, setAddressValue] = useState('');
  const [telegramIDValue, setTelegramIDValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddressInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(event.target.value);
  };

  const handleTelegramIDInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelegramIDValue(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    setLoading(true);
    try {
      const url = `${BACKEND_ENDPOINT}/register`;
      console.log(url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: addressValue,
          telegramID: telegramIDValue,
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    
    } finally {
      console.log('Wait for 3 seconds...');

      setTimeout(() => {
        console.log('3 seconds have passed');
        setLoading(false);
      }, 2000);
      setAddressValue("");
      setTelegramIDValue("");
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#f7931a] via-[#f7e5e5] to-[#e5e5e5]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            alt="Bitcoin Logo"
            className="w-12 h-12"
            height={50}
            src="/bitcoin-btc-logo.png"
            style={{
              aspectRatio: "50/50",
              objectFit: "cover",
            }}
            width={50}
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Register your Bitcoin</h2>
        <form className="space-y-4" onSubmit={handleSearch}>
          {loading ? (
                <Loading />) : (
              <><div>
              <Label className="block font-medium mb-1" htmlFor="bitcoin-address">
                Bitcoin Address
              </Label>
              <Input
                className="border rounded-md px-3 py-2 w-full"
                id="bitcoin-address"
                placeholder="Enter your Bitcoin address"
                type="text"
                value={addressValue}
                onChange={handleAddressInputChange}
              />
            </div>
            <div>
              <Label className="block font-medium mb-1" htmlFor="telegram-id">
                Telegram ID
              </Label>
              <Input
                className="border rounded-md px-3 py-2 w-full"
                id="telegram-id"
                placeholder="Enter your Telegram ID"
                type="text"
                value={telegramIDValue}
                onChange={handleTelegramIDInputChange}
              />
            </div></>
              )}
          
          <Button
            className="bg-[#f7931a] hover:bg-[#e5a12e] text-white font-medium py-2 px-4 rounded-md w-full"
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}
