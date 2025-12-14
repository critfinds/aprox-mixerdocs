import { DocLayout } from "@/components/layout/DocLayout";
import { InfoBox } from "@/components/docs/InfoBox";
import { SectionHeader } from "@/components/docs/SectionHeader";
import { Shield, Database, Server, Scale } from "lucide-react";

const Compliance = () => {
  return (
    <DocLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">Compliance</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Understanding AproxMixer's compliance model, data practices, 
            and jurisdictional considerations.
          </p>
        </div>

        {/* Non-custodial Design */}
        <SectionHeader 
          title="Non-Custodial Design" 
          subtitle="Users maintain full control of funds"
          id="non-custodial"
        />

        <div className="space-y-4 mb-12">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">No Custody of User Funds</h4>
                <p className="text-muted-foreground">
                  AproxMixer smart contracts are non-custodial. The protocol never holds, 
                  controls, or has access to user funds. Deposits are locked in immutable 
                  smart contracts, and only users with valid proofs can withdraw.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="gradient-border rounded-xl p-5">
              <h4 className="font-semibold mb-3">What AproxMixer Controls</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✗</span>
                  <span>Cannot access deposited funds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✗</span>
                  <span>Cannot freeze or confiscate assets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✗</span>
                  <span>Cannot block withdrawals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✗</span>
                  <span>Cannot identify depositors</span>
                </li>
              </ul>
            </div>
            <div className="gradient-border rounded-xl p-5">
              <h4 className="font-semibold mb-3">What Users Control</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Full custody of secret notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Exclusive withdrawal rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Choice of recipient address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Decision to use relayers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Minimization */}
        <SectionHeader 
          title="Data Minimization" 
          subtitle="Privacy by design principles"
          id="data"
        />

        <div className="space-y-4 mb-12">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                <Database className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">No Personal Data Collection</h4>
                <p className="text-muted-foreground">
                  AproxMixer does not collect, store, or process any personally identifiable 
                  information (PII). The protocol operates purely on cryptographic commitments 
                  and proofs.
                </p>
              </div>
            </div>
          </div>

          <div className="gradient-border rounded-xl p-6">
            <h4 className="font-semibold mb-4">Data Practices</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs text-green-500 shrink-0">✓</span>
                <div>
                  <span className="font-medium">No PII Collection</span>
                  <p className="text-sm text-muted-foreground">
                    No names, emails, phone numbers, or identity documents are requested or stored.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs text-green-500 shrink-0">✓</span>
                <div>
                  <span className="font-medium">No IP Logging</span>
                  <p className="text-sm text-muted-foreground">
                    IP addresses are not logged by the frontend or backend services.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs text-green-500 shrink-0">✓</span>
                <div>
                  <span className="font-medium">No Analytics Tracking</span>
                  <p className="text-sm text-muted-foreground">
                    No third-party analytics or tracking scripts are embedded in the frontend.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs text-green-500 shrink-0">✓</span>
                <div>
                  <span className="font-medium">On-chain Data Only</span>
                  <p className="text-sm text-muted-foreground">
                    The only data stored are cryptographic commitments on the public blockchain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <InfoBox variant="info" title="Blockchain Transparency">
            While AproxMixer provides transaction privacy, all deposits and withdrawals 
            are recorded on the public blockchain. The privacy comes from the cryptographic 
            unlinkability between deposits and withdrawals, not from hiding transactions.
          </InfoBox>
        </div>

        {/* Relayer Compliance */}
        <SectionHeader 
          title="Relayer Compliance Model" 
          subtitle="Independent operator responsibilities"
          id="relayer"
        />

        <div className="space-y-4 mb-12">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <Server className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Relayer Independence</h4>
                <p className="text-muted-foreground">
                  Relayers are independent operators who choose to participate in the network. 
                  Each relayer is responsible for their own compliance with local regulations.
                </p>
              </div>
            </div>
          </div>

          <div className="gradient-border rounded-xl p-6">
            <h4 className="font-semibold mb-4">Relayer Options</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Permissionless Relaying</h5>
                <p className="text-sm text-muted-foreground">
                  Any operator can run a relayer without permission. Users choose which 
                  relayer to use based on fees, reliability, and trust.
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Compliance-Focused Relayers</h5>
                <p className="text-sm text-muted-foreground">
                  Operators may choose to implement additional compliance measures such as:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                  <li>• OFAC sanctions list screening</li>
                  <li>• Chainanalysis or similar screening integration</li>
                  <li>• Geofencing based on jurisdiction</li>
                  <li>• Transaction monitoring and reporting</li>
                </ul>
              </div>
            </div>
          </div>

          <InfoBox variant="warning" title="Operator Responsibility">
            Relayer operators should consult with legal counsel regarding their obligations 
            under applicable laws, including but not limited to money transmission regulations, 
            sanctions compliance, and anti-money laundering requirements.
          </InfoBox>
        </div>

        {/* Jurisdictional Notes */}
        <SectionHeader 
          title="Jurisdictional Considerations" 
          subtitle="User and operator responsibilities"
          id="jurisdiction"
        />

        <div className="space-y-4">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal Status Varies by Jurisdiction</h4>
                <p className="text-muted-foreground">
                  The legality of privacy tools varies significantly across jurisdictions. 
                  Users are responsible for understanding and complying with the laws 
                  applicable to them.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="gradient-border rounded-xl p-5">
              <h4 className="font-semibold mb-3">User Responsibility</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Understand local regulations</li>
                <li>• Ensure lawful use of the protocol</li>
                <li>• Comply with tax reporting obligations</li>
                <li>• Not use for prohibited activities</li>
              </ul>
            </div>
            <div className="gradient-border rounded-xl p-5">
              <h4 className="font-semibold mb-3">Protocol Neutrality</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Open-source, permissionless protocol</li>
                <li>• No central authority or operator</li>
                <li>• Smart contracts execute autonomously</li>
                <li>• Code is law on the blockchain</li>
              </ul>
            </div>
          </div>

          <InfoBox variant="danger" title="Disclaimer">
            This documentation is for informational purposes only and does not constitute 
            legal advice. Users should consult with qualified legal counsel regarding the 
            use of privacy protocols in their jurisdiction. AproxMixer makes no representations 
            regarding the legality of the protocol in any jurisdiction.
          </InfoBox>
        </div>
      </div>
    </DocLayout>
  );
};

export default Compliance;
