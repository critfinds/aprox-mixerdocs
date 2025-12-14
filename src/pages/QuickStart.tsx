import { DocLayout } from "@/components/layout/DocLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InfoBox } from "@/components/docs/InfoBox";
import { SectionHeader } from "@/components/docs/SectionHeader";
import { Wallet, Download, Upload, Settings } from "lucide-react";

const QuickStart = () => {
  return (
    <DocLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">Quick Start</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Get started with AproxMixer in just a few minutes. This guide covers wallet connection, 
            basic deposit and withdrawal operations, and environment setup.
          </p>
        </div>

        {/* Connect Wallet */}
        <SectionHeader 
          title="Connect Your Wallet" 
          subtitle="Using WalletConnect for secure connections"
          id="wallet"
        />

        <div className="space-y-4 mb-12">
          <p className="text-muted-foreground">
            AproxMixer uses WalletConnect for secure, cross-platform wallet connections. 
            Follow these steps to connect your wallet:
          </p>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Step 1: Open the Application</h4>
                <p className="text-sm text-muted-foreground">
                  Navigate to the AproxMixer web application and click the "Connect Wallet" button 
                  in the top right corner.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Step 2: Select Your Wallet</h4>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred wallet from the list (MetaMask, WalletConnect, Coinbase Wallet, etc.). 
                  For mobile wallets, scan the QR code with your wallet app.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Step 3: Approve Connection</h4>
                <p className="text-sm text-muted-foreground">
                  Confirm the connection request in your wallet. Once approved, you'll see your 
                  connected address displayed in the application.
                </p>
              </div>
            </div>
          </div>

          <CodeBlock
            title="React Integration Example"
            language="tsx"
            code={`import { useConnect, useAccount } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

function ConnectButton() {
  const { connect } = useConnect({
    connector: new WalletConnectConnector({
      options: {
        projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
      },
    }),
  })
  const { address, isConnected } = useAccount()

  if (isConnected) {
    return <span>Connected: {address}</span>
  }

  return <button onClick={() => connect()}>Connect Wallet</button>
}`}
          />
        </div>

        {/* Deposit & Withdraw */}
        <SectionHeader 
          title="Deposit & Withdraw" 
          subtitle="Core mixing operations"
          id="deposit-withdraw"
        />

        <div className="space-y-6 mb-12">
          {/* Deposit */}
          <div className="gradient-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Download className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">Making a Deposit</h3>
            </div>

            <ol className="space-y-3 text-muted-foreground mb-4">
              <li className="flex gap-3">
                <span className="text-primary font-mono">1.</span>
                <span>Select the token and amount you wish to deposit (e.g., 0.1 ETH, 1 ETH, 10 ETH)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono">2.</span>
                <span>Click "Deposit" and approve the transaction in your wallet</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono">3.</span>
                <span><strong className="text-foreground">Important:</strong> Save your secret note securely. This note is required to withdraw your funds later</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono">4.</span>
                <span>Wait for transaction confirmation on-chain</span>
              </li>
            </ol>

            <InfoBox variant="warning" title="Critical Security Note">
              Your secret note is the only way to withdraw your deposited funds. If you lose it, 
              your funds will be permanently locked in the contract. Store it securely offline.
            </InfoBox>

            <CodeBlock
              title="Deposit Flow"
              language="typescript"
              code={`// Generate commitment
const secret = randomBytes(31)
const nullifier = randomBytes(31)
const commitment = poseidonHash([nullifier, secret])

// Create note for user to save
const note = \`aprox-\${chainId}-\${amount}-\${toHex(commitment)}\`

// Call deposit function
await mixerContract.deposit(commitment, { value: amount })`}
            />
          </div>

          {/* Withdraw */}
          <div className="gradient-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Making a Withdrawal</h3>
            </div>

            <ol className="space-y-3 text-muted-foreground mb-4">
              <li className="flex gap-3">
                <span className="text-primary font-mono">1.</span>
                <span>Enter your secret note from the deposit</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono">2.</span>
                <span>Specify the recipient address (can be different from deposit address)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono">3.</span>
                <span>Choose whether to use a relayer for enhanced privacy</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono">4.</span>
                <span>Generate the zk-SNARK proof (this may take a few seconds)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono">5.</span>
                <span>Submit the withdrawal transaction</span>
              </li>
            </ol>

            <CodeBlock
              title="Withdrawal Flow"
              language="typescript"
              code={`// Parse note and generate proof
const { nullifier, secret, commitment } = parseNote(note)
const merkleProof = await getMerkleProof(commitment)

const proof = await generateProof({
  nullifier,
  secret,
  merkleProof,
  recipient: recipientAddress,
  relayer: relayerAddress,
  fee: relayerFee,
})

// Submit to relayer or directly to contract
if (useRelayer) {
  await relayer.submitWithdrawal(proof)
} else {
  await mixerContract.withdraw(proof, ...)
}`}
            />
          </div>
        </div>

        {/* Environment Setup */}
        <SectionHeader 
          title="Environment Setup" 
          subtitle="Required configuration variables"
          id="environment"
        />

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Configure the following environment variables in your <code className="text-primary">.env</code> file 
            to connect to the AproxMixer services:
          </p>

          <CodeBlock
            title=".env.example"
            language="bash"
            code={`# WalletConnect Configuration
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id

# RPC Endpoints
NEXT_PUBLIC_RPC_URL_MAINNET=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_RPC_URL_POLYGON=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_RPC_URL_ARBITRUM=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY

# Contract Addresses (per network)
NEXT_PUBLIC_MIXER_ADDRESS_MAINNET=0x...
NEXT_PUBLIC_MIXER_ADDRESS_POLYGON=0x...
NEXT_PUBLIC_MIXER_ADDRESS_ARBITRUM=0x...

# Backend Services
NEXT_PUBLIC_RELAYER_URL=https://relayer.aproxmixer.io
NEXT_PUBLIC_PROOF_API_URL=https://api.aproxmixer.io

# Optional: Custom Gas Settings
NEXT_PUBLIC_GAS_PRICE_ORACLE=https://api.etherscan.io/api`}
          />

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Configuration Notes</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">WalletConnect Project ID:</strong> Obtain from <a href="https://cloud.walletconnect.com" className="doc-link">cloud.walletconnect.com</a></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">RPC URLs:</strong> Use your own nodes or services like Alchemy, Infura, or QuickNode</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Contract Addresses:</strong> See <a href="/appendices#contracts" className="doc-link">Appendices</a> for deployed addresses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Relayer URL:</strong> Optional. Use for anonymous withdrawals</span>
              </li>
            </ul>
          </div>

          <InfoBox variant="info">
            For local development, you can use Hardhat or Anvil to run a local blockchain 
            with the mixer contracts deployed. See the <a href="/tutorials#integration" className="doc-link">Frontend Integration tutorial</a> for details.
          </InfoBox>
        </div>
      </div>
    </DocLayout>
  );
};

export default QuickStart;
