import { DocLayout } from "@/components/layout/DocLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InfoBox } from "@/components/docs/InfoBox";
import { SectionHeader } from "@/components/docs/SectionHeader";
import { Shield, Lock, Eye, CheckCircle, Circle } from "lucide-react";

const ZkProofs = () => {
  return (
    <DocLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">Zero-Knowledge Proofs</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Understanding how zk-SNARKs enable privacy in AproxMixer while maintaining 
            full verifiability of transactions.
          </p>
        </div>

        {/* Overview */}
        <SectionHeader 
          title="zk-SNARKs Overview" 
          subtitle="Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge"
          id="overview"
        />

        <div className="space-y-4 mb-12">
          <p className="text-muted-foreground">
            zk-SNARKs are cryptographic proofs that allow one party (the prover) to prove to 
            another party (the verifier) that a statement is true, without revealing any 
            information beyond the validity of the statement itself.
          </p>

          <div className="glass-card rounded-xl p-6">
            <h4 className="font-semibold mb-4">Key Properties</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Completeness</h5>
                  <p className="text-sm text-muted-foreground">Valid proofs are always accepted by the verifier</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Soundness</h5>
                  <p className="text-sm text-muted-foreground">Invalid proofs cannot fool the verifier</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Zero-Knowledge</h5>
                  <p className="text-sm text-muted-foreground">Proof reveals nothing beyond statement validity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Succinctness</h5>
                  <p className="text-sm text-muted-foreground">Proofs are small and quick to verify</p>
                </div>
              </div>
            </div>
          </div>

          <div className="gradient-border rounded-xl p-6">
            <h4 className="font-semibold mb-4">How It Works in AproxMixer</h4>
            <p className="text-muted-foreground mb-4">
              When withdrawing, users prove they know the secret preimage of a commitment in the 
              Merkle tree without revealing which commitment is theirs:
            </p>
            <CodeBlock
              language="text"
              code={`Proof Statement:
"I know (secret, nullifier) such that:
  1. commitment = hash(nullifier, secret)
  2. commitment is in the Merkle tree with root R
  3. nullifierHash = hash(nullifier)

I'm proving this without revealing secret, nullifier, or which leaf is mine."`}
            />
          </div>
        </div>

        {/* Verifier Contract */}
        <SectionHeader 
          title="Verifier Contract" 
          subtitle="On-chain proof verification"
          id="verifier"
        />

        <div className="space-y-4 mb-12">
          <p className="text-muted-foreground">
            The Verifier contract is automatically generated from the compiled zk-SNARK circuit 
            using snarkjs. It implements the Groth16 verification algorithm.
          </p>

          <div className="glass-card rounded-xl p-6">
            <h4 className="font-semibold mb-4">Verification Process</h4>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0">1</span>
                <div>
                  <span className="font-medium">Parse Proof</span>
                  <p className="text-sm text-muted-foreground">Extract proof components (A, B, C elliptic curve points)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0">2</span>
                <div>
                  <span className="font-medium">Load Public Inputs</span>
                  <p className="text-sm text-muted-foreground">Merkle root, nullifier hash, recipient, relayer, fee</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0">3</span>
                <div>
                  <span className="font-medium">Pairing Check</span>
                  <p className="text-sm text-muted-foreground">Verify cryptographic pairing equation holds</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0">4</span>
                <div>
                  <span className="font-medium">Return Result</span>
                  <p className="text-sm text-muted-foreground">Boolean indicating proof validity</p>
                </div>
              </li>
            </ol>
          </div>

          <CodeBlock
            title="Verifier Interface"
            language="solidity"
            code={`interface IVerifier {
    /// @notice Verifies a Groth16 proof
    /// @param _proof The proof bytes (A, B, C curve points)
    /// @param _pubSignals Public signals array:
    ///   [0] merkleRoot - Current Merkle tree root
    ///   [1] nullifierHash - Hash of the nullifier (prevents double-spend)
    ///   [2] recipient - Address receiving the withdrawal
    ///   [3] relayer - Relayer address (or 0 for self-relay)
    ///   [4] fee - Relayer fee amount
    /// @return bool True if proof is valid
    function verifyProof(
        bytes calldata _proof,
        uint256[5] calldata _pubSignals
    ) external view returns (bool);
}

// Gas cost: ~300,000 gas for Groth16 verification
// Proof size: 256 bytes (8 field elements)`}
          />

          <InfoBox variant="info" title="Circuit Reference">
            The withdrawal circuit is based on the Tornado Cash circuit design, 
            adapted for AproxMixer's requirements. The circuit source is available in the 
            <code className="text-primary ml-1">circuits/</code> directory.
          </InfoBox>
        </div>

        {/* Privacy Guarantees */}
        <SectionHeader 
          title="Privacy Guarantees" 
          subtitle="What information is protected"
          id="privacy"
        />

        <div className="space-y-4">
          <div className="gradient-border rounded-xl p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Unlinkability
            </h4>
            <p className="text-muted-foreground mb-4">
              The core privacy guarantee: deposits cannot be linked to withdrawals through 
              on-chain analysis.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <p className="text-sm">
                <strong className="text-foreground">Why it works:</strong> The zk-SNARK proof proves 
                membership in the set of all depositors without revealing which specific deposit 
                is being withdrawn. The anonymity set equals all deposits of the same denomination.
              </p>
            </div>
          </div>

          <div className="gradient-border rounded-xl p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Confidentiality
            </h4>
            <p className="text-muted-foreground mb-4">
              Transaction details remain private between the depositor and recipient.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Hidden:</strong> Which deposit is being withdrawn</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Hidden:</strong> Depositor's identity</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Hidden:</strong> Link between deposit and withdrawal addresses</span>
              </li>
              <li className="flex items-start gap-2">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Public:</strong> Deposit/withdrawal amounts (fixed denominations)</span>
              </li>
              <li className="flex items-start gap-2">
                <Circle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Public:</strong> Recipient address, relayer, fee</span>
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h4 className="font-semibold mb-4">Anonymity Set Size</h4>
            <p className="text-muted-foreground mb-4">
              Privacy strength depends on the anonymity set - the pool of indistinguishable deposits:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="text-2xl font-bold gradient-text mb-1">Small</div>
                <p className="text-xs text-muted-foreground">&lt;100 deposits</p>
                <p className="text-sm mt-2">Lower privacy</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="text-2xl font-bold gradient-text mb-1">Medium</div>
                <p className="text-xs text-muted-foreground">100-1000 deposits</p>
                <p className="text-sm mt-2">Good privacy</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/20 border border-primary/30">
                <div className="text-2xl font-bold gradient-text mb-1">Large</div>
                <p className="text-xs text-muted-foreground">&gt;1000 deposits</p>
                <p className="text-sm mt-2">Strong privacy</p>
              </div>
            </div>
          </div>

          <InfoBox variant="warning" title="Privacy Best Practices">
            <ul className="space-y-1 mt-2">
              <li>• Wait for more deposits before withdrawing to increase anonymity set</li>
              <li>• Use a relayer to avoid linking gas payments</li>
              <li>• Withdraw to a fresh address with no prior history</li>
              <li>• Vary withdrawal timing to avoid timing analysis</li>
            </ul>
          </InfoBox>
        </div>
      </div>
    </DocLayout>
  );
};

export default ZkProofs;
