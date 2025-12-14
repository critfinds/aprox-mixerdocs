import { DocLayout } from "@/components/layout/DocLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InfoBox } from "@/components/docs/InfoBox";
import { SectionHeader } from "@/components/docs/SectionHeader";

const Tutorials = () => {
  return (
    <DocLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">Tutorials</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Step-by-step guides for common operations and integrations.
          </p>
        </div>

        {/* Deposit Tutorial */}
        <SectionHeader 
          title="Deposit Tutorial" 
          subtitle="Complete deposit walkthrough"
          id="deposit"
        />

        <div className="space-y-4 mb-12">
          <CodeBlock
            title="1. Generate Commitment"
            language="typescript"
            code={`import { randomBytes } from 'crypto'
import { poseidon } from 'circomlibjs'

// Generate random secret and nullifier
const secret = randomBytes(31)
const nullifier = randomBytes(31)

// Compute commitment using Poseidon hash
const commitment = poseidon([nullifier, secret])

// Create note string for user to save
const note = \`aprox-\${chainId}-\${denomination}-\${commitment.toString(16)}\`
console.log('Save this note:', note)`}
          />

          <CodeBlock
            title="2. Call Deposit Contract"
            language="typescript"
            code={`import { useContractWrite } from 'wagmi'
import { parseEther } from 'viem'
import { MIXER_ABI, MIXER_ADDRESS } from './contracts'

const { write: deposit } = useContractWrite({
  address: MIXER_ADDRESS,
  abi: MIXER_ABI,
  functionName: 'deposit',
})

// Execute deposit
await deposit({
  args: [commitment],
  value: parseEther('0.1'), // denomination
})`}
          />

          <InfoBox variant="success" title="Deposit Complete">
            Once the transaction is confirmed, your deposit is added to the mixing pool. 
            Keep your note safe - you'll need it to withdraw.
          </InfoBox>
        </div>

        {/* Withdrawal Tutorial */}
        <SectionHeader 
          title="Withdrawal Tutorial" 
          subtitle="Complete withdrawal walkthrough"
          id="withdrawal"
        />

        <div className="space-y-4 mb-12">
          <CodeBlock
            title="1. Parse Note and Get Merkle Proof"
            language="typescript"
            code={`// Parse the saved note
const [, chainId, denomination, commitmentHex] = note.split('-')
const commitment = BigInt('0x' + commitmentHex)

// Fetch Merkle proof from backend
const response = await fetch(\`/api/merkle/path/\${commitment}\`)
const { root, pathElements, pathIndices, leafIndex } = await response.json()`}
          />

          <CodeBlock
            title="2. Generate zk-SNARK Proof"
            language="typescript"
            code={`import { groth16 } from 'snarkjs'

// Prepare circuit inputs
const input = {
  // Private inputs
  secret,
  nullifier,
  pathElements,
  pathIndices,
  
  // Public inputs  
  root,
  nullifierHash: poseidon([nullifier]),
  recipient: recipientAddress,
  relayer: relayerAddress,
  fee: relayerFee,
}

// Generate proof (runs in Web Worker for performance)
const { proof, publicSignals } = await groth16.fullProve(
  input,
  '/circuits/withdraw.wasm',
  '/circuits/withdraw_final.zkey'
)

// Format proof for contract
const calldata = await groth16.exportSolidityCallData(proof, publicSignals)`}
          />

          <CodeBlock
            title="3. Submit Withdrawal"
            language="typescript"
            code={`// Option A: Direct submission (links gas to recipient)
await mixerContract.withdraw(
  proofBytes,
  root,
  nullifierHash,
  recipient,
  relayer,
  fee
)

// Option B: Via relayer (recommended for privacy)
await fetch('https://relayer.aproxmixer.io/api/relay', {
  method: 'POST',
  body: JSON.stringify({
    proof: proofBytes,
    args: { root, nullifierHash, recipient, relayer, fee },
    network: 'ethereum'
  })
})`}
          />
        </div>

        {/* Relayer Tutorial */}
        <SectionHeader 
          title="Relayer Usage" 
          subtitle="Using relayers for enhanced privacy"
          id="relayer"
        />

        <div className="space-y-4 mb-12">
          <CodeBlock
            title="Query Available Relayers"
            language="typescript"
            code={`// Fetch relayer status
const relayerStatus = await fetch('https://relayer.aproxmixer.io/api/status')
const { relayerAddress, networks } = await relayerStatus.json()

// Calculate fee
const denomination = parseEther('1')
const feePercent = networks.ethereum.feePercent
const fee = denomination * BigInt(feePercent) / 100n`}
          />

          <CodeBlock
            title="Submit Via Relayer"
            language="typescript"
            code={`const response = await fetch('https://relayer.aproxmixer.io/api/relay', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    proof: calldata,
    args: {
      root,
      nullifierHash,
      recipient,
      relayer: relayerAddress,
      fee: fee.toString(),
      refund: '0'
    },
    contract: MIXER_ADDRESS,
    network: 'ethereum'
  })
})

const { success, txHash, jobId } = await response.json()

// Poll for confirmation
const checkStatus = async () => {
  const status = await fetch(\`/api/job/\${jobId}\`)
  const { status: jobStatus, confirmations } = await status.json()
  return jobStatus === 'confirmed'
}`}
          />
        </div>

        {/* Frontend Integration */}
        <SectionHeader 
          title="Frontend Integration" 
          subtitle="Vite + React setup"
          id="integration"
        />

        <div className="space-y-4">
          <CodeBlock
            title="Install Dependencies"
            language="bash"
            code={`npm install wagmi viem @tanstack/react-query snarkjs circomlibjs`}
          />

          <CodeBlock
            title="Configure wagmi"
            language="typescript"
            code={`// src/lib/wagmi.ts
import { createConfig, http } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum],
  connectors: [
    walletConnect({
      projectId: import.meta.env.VITE_WC_PROJECT_ID,
    }),
  ],
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_RPC_MAINNET),
    [polygon.id]: http(import.meta.env.VITE_RPC_POLYGON),
    [arbitrum.id]: http(import.meta.env.VITE_RPC_ARBITRUM),
  },
})`}
          />

          <CodeBlock
            title="Mixer Hook Example"
            language="typescript"
            code={`// src/hooks/useMixer.ts
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { MIXER_ABI, getMixerAddress } from '@/lib/contracts'

export function useDeposit(chainId: number) {
  const { write, data, isLoading } = useContractWrite({
    address: getMixerAddress(chainId),
    abi: MIXER_ABI,
    functionName: 'deposit',
  })

  const { isLoading: isConfirming, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return {
    deposit: (commitment: bigint, value: bigint) => 
      write({ args: [commitment], value }),
    isLoading: isLoading || isConfirming,
    isSuccess,
    txHash: data?.hash,
  }
}`}
          />

          <InfoBox variant="info">
            For production deployments, consider using Web Workers for proof generation 
            to prevent UI blocking during the computationally intensive process.
          </InfoBox>
        </div>
      </div>
    </DocLayout>
  );
};

export default Tutorials;
