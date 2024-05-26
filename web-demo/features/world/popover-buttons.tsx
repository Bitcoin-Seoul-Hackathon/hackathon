'use client';

import { Icons } from '@/components/custom/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DepositButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'}>Deposit</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
        </DialogHeader>
        <div className={'flex items-center gap-4 font-semibold'}>
          <Icons.bitcoin className={'w-8 h-8'} />
          <div className={'flex w-full items-center gap-2'}>
            <Input type={'number'} step={0.0000001} placeholder={'0.000001'} />
            BTC
          </div>
        </div>
        <DialogFooter>
          <OnRampButton />
          <Button variant={'ghost'}>Deposit by On-chain</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function WithdrawalButton() {
  return (
    <Tabs defaultValue={'on-chain'}>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={'sm'}>Withdraw</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Widthdrawal</DialogTitle>
          </DialogHeader>
          <TabsList className='md:mr-auto'>
            <TabsTrigger
              value='on-chain'
              className='text-zinc-600 dark:text-zinc-200'
            >
              On-chain
            </TabsTrigger>
            <TabsTrigger
              value='off-ramp'
              className='text-zinc-600 dark:text-zinc-200'
            >
              Off-ramp
            </TabsTrigger>
          </TabsList>
          <TabsContent value='on-chain' className='m-0'>
            <div className={'flex items-center gap-4 font-semibold'}>
              <Icons.bitcoin className={'w-8 h-8'} />
              <div className={'flex w-full items-center gap-2'}>
                <Input
                  type={'number'}
                  step={0.0000001}
                  placeholder={'0.000001'}
                />
                BTC
              </div>
            </div>
            <Label>Address</Label>
            <Input />
          </TabsContent>
          <TabsContent value='off-ramp' className='m-0'>
            <div className={'flex items-center gap-4 font-semibold'}>
              <Icons.bitcoin className={'w-8 h-8'} />
              <div className={'flex w-full items-center gap-2'}>
                <Input
                  type={'number'}
                  step={0.0000001}
                  placeholder={'0.000001'}
                />
                BTC
              </div>
            </div>
            <Label>Bank Account(IBAN Code)</Label>
            <Input />
            <small className={'text-end text-gray-500'}>
              Please make sure it{`'s`} valid IBAN Code
            </small>
          </TabsContent>
          <DialogFooter>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}

export function OnRampButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Deposit by On-ramp</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Deposit By On-Ramp</DialogTitle>
        </DialogHeader>
        <div className={'flex items-center gap-4 font-semibold'}>
          <img
            src={'/on-ramp-demo.png'}
            alt={'on-ramp-demo'}
            width={439}
            height={585}
          />
        </div>
        <DialogFooter className={'w-full'}>
          <DialogClose className={'w-full'}>
            <Button variant={'ghost'} className={'w-full bg-gray-100'}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
