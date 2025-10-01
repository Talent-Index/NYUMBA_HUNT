import React, { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient } from '@mysten/sui.js/client';
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { PACKAGE_ID, FULLNODE_URL } from '../constants';

function toBytes(s: string) { return Array.from(new TextEncoder().encode(s)); }

function ListPropertyButton({ metadata, price }: { metadata: string; price: number }) {
    const account = useCurrentAccount();
    const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

    const handleClick = async () => {
        if (!account) { alert('Connect wallet first'); return; }

        const client = new SuiClient({ url: FULLNODE_URL });
        const tx = new TransactionBlock();
        tx.moveCall({
            target: `${PACKAGE_ID}::property::create_property`,
            arguments: [
                tx.pure.string('Title here'),
                tx.pure.string('Location here'),
                tx.pure.u64(BigInt(price)),
                tx.pure.u8(3),
                tx.pure.u8(2),
                tx.pure.bool(true),
                tx.pure.string('Apartment'),
                tx.pure.string(metadata),
            ],
        });

        const bytes = await tx.build({ client });
        const base64 = btoa(String.fromCharCode(...bytes));
        const result = await signAndExecute({ transaction: base64 });
        console.log('Tx result', result);
        alert('Transaction sent!');
    };

    return (
        <>
            <ConnectButton />
            <button onClick={handleClick} disabled={!account || !metadata || price <= 0}>
                List Property
            </button>
        </>
    );
}

export default function PropertyCreatePage() {
    const [metadata, setMetadata] = useState('');
    const [price, setPrice] = useState(0);

    return (
        <div>
            <h2>List a New Property</h2>
            <input type="text" placeholder="Property Metadata" value={metadata} onChange={e => setMetadata(e.target.value)} />
            <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} />
            <ListPropertyButton metadata={metadata} price={price} />
        </div>
    );
}
