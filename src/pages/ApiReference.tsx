import { DocLayout } from "@/components/layout/DocLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InfoBox } from "@/components/docs/InfoBox";
import { SectionHeader } from "@/components/docs/SectionHeader";

const ApiReference = () => {
  return (
    <DocLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">API Reference</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete API documentation for backend services and relayer endpoints.
          </p>
        </div>

        {/* Backend API */}
        <SectionHeader 
          title="Backend API" 
          subtitle="Proof generation and indexer services"
          id="backend"
        />

        <div className="space-y-4 mb-12">
          <div className="gradient-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">GET /api/merkle/path/:commitment</h4>
              <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-500">GET</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Retrieves the Merkle path for a given commitment, required for proof generation.
            </p>
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "root": "0x1234...abcd",
  "pathElements": [
    "0xabc...",
    "0xdef...",
    // ... 20 elements for tree depth 20
  ],
  "pathIndices": [0, 1, 0, 1, ...],
  "leafIndex": 42
}`}
            />
          </div>

          <div className="gradient-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">GET /api/deposits</h4>
              <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-500">GET</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Lists recent deposits with pagination. Useful for displaying pool statistics.
            </p>
            <CodeBlock
              title="Query Parameters"
              language="text"
              code={`?page=1&limit=20&network=ethereum`}
            />
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "deposits": [
    {
      "commitment": "0x...",
      "leafIndex": 42,
      "timestamp": 1699999999,
      "transactionHash": "0x..."
    }
  ],
  "total": 1234,
  "page": 1,
  "limit": 20
}`}
            />
          </div>

          <div className="gradient-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">GET /api/stats</h4>
              <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-500">GET</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Returns pool statistics including total deposits, anonymity set size, and TVL.
            </p>
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "totalDeposits": 5420,
  "totalWithdrawals": 4100,
  "tvlEth": "132.0",
  "anonymitySet": {
    "0.1": 2100,
    "1": 1800,
    "10": 1520
  }
}`}
            />
          </div>
        </div>

        {/* Relayer API */}
        <SectionHeader 
          title="Relayer API" 
          subtitle="Anonymous withdrawal submission"
          id="relayer"
        />

        <div className="space-y-4 mb-12">
          <InfoBox variant="info">
            Relayer endpoints accept withdrawal requests and submit them on-chain. 
            The relayer fee is deducted from the withdrawal amount.
          </InfoBox>

          <div className="gradient-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">POST /api/relay</h4>
              <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-500">POST</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Submit a withdrawal request to be relayed on-chain.
            </p>
            <CodeBlock
              title="Request Body"
              language="json"
              code={`{
  "proof": "0x...",
  "args": {
    "root": "0x...",
    "nullifierHash": "0x...",
    "recipient": "0x...",
    "relayer": "0x...",
    "fee": "100000000000000000",
    "refund": "0"
  },
  "contract": "0x...",
  "network": "ethereum"
}`}
            />
            <CodeBlock
              title="Response (Success)"
              language="json"
              code={`{
  "success": true,
  "txHash": "0x...",
  "message": "Withdrawal submitted successfully"
}`}
            />
          </div>

          <div className="gradient-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">GET /api/status</h4>
              <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-500">GET</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Check relayer status and current fee rates.
            </p>
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "relayerAddress": "0x...",
  "networks": {
    "ethereum": {
      "enabled": true,
      "feePercent": "0.1",
      "minFeeEth": "0.001"
    },
    "polygon": {
      "enabled": true,
      "feePercent": "0.05",
      "minFeeMatic": "0.5"
    }
  },
  "queueLength": 3,
  "health": "operational"
}`}
            />
          </div>

          <div className="gradient-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">GET /api/job/:id</h4>
              <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-500">GET</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Check the status of a submitted withdrawal job.
            </p>
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "id": "abc123",
  "status": "confirmed",  // pending | submitted | confirmed | failed
  "txHash": "0x...",
  "confirmations": 12,
  "error": null
}`}
            />
          </div>
        </div>

        {/* Error Codes */}
        <SectionHeader 
          title="Error Codes" 
          subtitle="API error responses"
          id="errors"
        />

        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Code</th>
                  <th className="text-left py-3 px-4 font-semibold">Message</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-3 px-4 font-mono text-primary">400</td>
                  <td className="py-3 px-4">INVALID_PROOF</td>
                  <td className="py-3 px-4 text-muted-foreground">The zk-SNARK proof is invalid or malformed</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-primary">400</td>
                  <td className="py-3 px-4">INVALID_ROOT</td>
                  <td className="py-3 px-4 text-muted-foreground">Merkle root is not recognized by the contract</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-primary">400</td>
                  <td className="py-3 px-4">SPENT_NULLIFIER</td>
                  <td className="py-3 px-4 text-muted-foreground">This note has already been withdrawn</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-primary">400</td>
                  <td className="py-3 px-4">INSUFFICIENT_FEE</td>
                  <td className="py-3 px-4 text-muted-foreground">Fee is below the relayer's minimum</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-primary">429</td>
                  <td className="py-3 px-4">RATE_LIMITED</td>
                  <td className="py-3 px-4 text-muted-foreground">Too many requests, please wait</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-primary">500</td>
                  <td className="py-3 px-4">RELAY_FAILED</td>
                  <td className="py-3 px-4 text-muted-foreground">Transaction submission failed on-chain</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-primary">503</td>
                  <td className="py-3 px-4">SERVICE_UNAVAILABLE</td>
                  <td className="py-3 px-4 text-muted-foreground">Relayer is temporarily unavailable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock
            title="Error Response Format"
            language="json"
            code={`{
  "success": false,
  "error": {
    "code": "INVALID_PROOF",
    "message": "The provided proof failed verification",
    "details": {
      "reason": "Pairing check failed"
    }
  }
}`}
          />
        </div>
      </div>
    </DocLayout>
  );
};

export default ApiReference;
