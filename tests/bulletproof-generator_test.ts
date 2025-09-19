import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.5.4/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Route Bulletproof Generator: Test Mint Route",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const minter = accounts.get('wallet_1')!;

        const block = chain.mineBlock([
            Tx.contractCall('bulletproof-generator', 'mint-route', [
                types.uint(12345),
                types.utf8('urban'),
                types.uint(10),
                types.uint(500),
                types.utf8('red'),
                types.utf8('blue'),
                types.utf8('green'),
                types.ascii('https://route-metadata.uri')
            ], minter.address)
        ]);

        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk();
    }
});