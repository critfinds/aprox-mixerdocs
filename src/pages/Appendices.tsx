import { DocLayout } from "@/components/layout/DocLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InfoBox } from "@/components/docs/InfoBox";
import { SectionHeader } from "@/components/docs/SectionHeader";
import { ExternalLink } from "lucide-react";

const Appendices = () => {
  return (
    <DocLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">Appendices</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Reference materials, configuration details, and additional resources.
          </p>
        </div>

        {/* Environment Variables */}
        <SectionHeader 
          title="Environment Variables" 
          subtitle="Complete .env reference"
          id="env"
        />

        <div className="space-y-4 mb-12">
          <CodeBlock
            title=".env.example"
            language="bash"
            code={`# ============================================
# WALLETCONNECT CONFIGURATION
# ============================================
# Get your project ID from https://cloud.walletconnect.com
VITE_WC_PROJECT_ID=your_walletconnect_project_id

# ============================================
# RPC ENDPOINTS
# ============================================
# Use your own RPC endpoints (Alchemy, Infura, QuickNode, etc.)
VITE_RPC_MAINNET=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
VITE_RPC_POLYGON=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
VITE_RPC_ARBITRUM=https://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
VITE_RPC_OPTIMISM=https://opt-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# ============================================
# CONTRACT ADDRESSES
# ============================================
# Ethereum Mainnet
VITE_MIXER_ETH_01=0x...  # 0.1 ETH pool
VITE_MIXER_ETH_1=0x...   # 1 ETH pool
VITE_MIXER_ETH_10=0x...  # 10 ETH pool

# Polygon
VITE_MIXER_MATIC_100=0x...   # 100 MATIC pool
VITE_MIXER_MATIC_1000=0x...  # 1000 MATIC pool

# Arbitrum
VITE_MIXER_ARB_01=0x...  # 0.1 ETH pool
VITE_MIXER_ARB_1=0x...   # 1 ETH pool

# ============================================
# BACKEND SERVICES
# ============================================
VITE_API_URL=https://api.aproxmixer.io
VITE_RELAYER_URL=https://relayer.aproxmixer.io

# ============================================
# OPTIONAL CONFIGURATION
# ============================================
# Custom gas oracle
VITE_GAS_ORACLE_URL=https://api.etherscan.io/api

# IPFS gateway for circuit files
VITE_IPFS_GATEWAY=https://cloudflare-ipfs.com/ipfs/

# Enable testnet mode
VITE_ENABLE_TESTNETS=false`}
          />

          <InfoBox variant="info">
            Never commit your <code className="text-primary">.env</code> file to version control. 
            Add it to <code className="text-primary">.gitignore</code> and use environment 
            variables in your deployment platform.
          </InfoBox>
        </div>

        {/* Contract Addresses */}
        <SectionHeader 
          title="Contract Addresses" 
          subtitle="Deployed contract addresses by network"
          id="contracts"
        />

        <div className="space-y-4 mb-12">
          <InfoBox variant="warning">
            These addresses are placeholders. Actual deployed addresses will be published 
            after mainnet launch and audit completion.
          </InfoBox>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Network</th>
                  <th className="text-left py-3 px-4 font-semibold">Pool</th>
                  <th className="text-left py-3 px-4 font-semibold">Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-3 px-4">Ethereum Mainnet</td>
                  <td className="py-3 px-4">0.1 ETH</td>
                  <td className="py-3 px-4 font-mono text-xs text-primary">TBD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Ethereum Mainnet</td>
                  <td className="py-3 px-4">1 ETH</td>
                  <td className="py-3 px-4 font-mono text-xs text-primary">TBD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Ethereum Mainnet</td>
                  <td className="py-3 px-4">10 ETH</td>
                  <td className="py-3 px-4 font-mono text-xs text-primary">TBD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Polygon</td>
                  <td className="py-3 px-4">100 MATIC</td>
                  <td className="py-3 px-4 font-mono text-xs text-primary">TBD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Polygon</td>
                  <td className="py-3 px-4">1000 MATIC</td>
                  <td className="py-3 px-4 font-mono text-xs text-primary">TBD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Arbitrum</td>
                  <td className="py-3 px-4">0.1 ETH</td>
                  <td className="py-3 px-4 font-mono text-xs text-primary">TBD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Arbitrum</td>
                  <td className="py-3 px-4">1 ETH</td>
                  <td className="py-3 px-4 font-mono text-xs text-primary">TBD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h4 className="font-semibold mb-3">Testnet Deployments</h4>
            <p className="text-sm text-muted-foreground mb-4">
              For development and testing, use the following testnet deployments:
            </p>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-2">Sepolia</td>
                  <td className="py-2">0.01 ETH</td>
                  <td className="py-2 font-mono text-xs text-primary">0x1234...abcd</td>
                </tr>
                <tr>
                  <td className="py-2">Mumbai</td>
                  <td className="py-2">10 MATIC</td>
                  <td className="py-2 font-mono text-xs text-primary">0x5678...efgh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Resources */}
        <SectionHeader 
          title="Additional Resources" 
          subtitle="External documentation and references"
          id="resources"
        />

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <a 
              href="https://docs.circom.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gradient-border rounded-xl p-5 hover:glow-effect-sm transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold group-hover:text-primary transition-colors">Circom Documentation</h4>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">
                Official documentation for the Circom circuit language used in zk-SNARK development.
              </p>
            </a>

            <a 
              href="https://github.com/iden3/snarkjs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gradient-border rounded-xl p-5 hover:glow-effect-sm transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold group-hover:text-primary transition-colors">snarkjs</h4>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">
                JavaScript library for generating and verifying zk-SNARK proofs.
              </p>
            </a>

            <a 
              href="https://wagmi.sh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gradient-border rounded-xl p-5 hover:glow-effect-sm transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold group-hover:text-primary transition-colors">wagmi</h4>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">
                React Hooks for Ethereum - the recommended way to integrate with AproxMixer.
              </p>
            </a>

            <a 
              href="https://docs.walletconnect.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gradient-border rounded-xl p-5 hover:glow-effect-sm transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold group-hover:text-primary transition-colors">WalletConnect</h4>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">
                Documentation for WalletConnect v2 wallet connection protocol.
              </p>
            </a>

            <a 
              href="https://ui.shadcn.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gradient-border rounded-xl p-5 hover:glow-effect-sm transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold group-hover:text-primary transition-colors">shadcn/ui</h4>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">
                Re-usable components built with Radix UI and Tailwind CSS.
              </p>
            </a>

            <a 
              href="https://tailwindcss.com/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gradient-border rounded-xl p-5 hover:glow-effect-sm transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold group-hover:text-primary transition-colors">Tailwind CSS</h4>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">
                Utility-first CSS framework used for styling the frontend.
              </p>
            </a>
          </div>

          <div className="glass-card rounded-xl p-6 mt-8">
            <h4 className="font-semibold mb-4">Academic References</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary shrink-0">📄</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Groth16:</strong> "On the Size of Pairing-based Non-interactive Arguments" - Jens Groth, 2016
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary shrink-0">📄</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Poseidon Hash:</strong> "Poseidon: A New Hash Function for Zero-Knowledge Proof Systems" - Grassi et al., 2021
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary shrink-0">📄</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Merkle Trees:</strong> "A Digital Signature Based on a Conventional Encryption Function" - Ralph Merkle, 1987
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocLayout>
  );
};

export default Appendices;
