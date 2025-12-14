import { DocLayout } from "@/components/layout/DocLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { FeatureCard } from "@/components/docs/FeatureCard";
import { InfoBox } from "@/components/docs/InfoBox";
import { SectionHeader } from "@/components/docs/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield,
  Lock,
  Layers,
  Globe,
  ArrowRight,
  Zap,
  Eye,
  Network,
} from "lucide-react";

const Index = () => {
  return (
    <DocLayout>
      {/* Hero Section */}
      <div className="mb-16 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-muted-foreground">v1.0.0-beta now available</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          <span className="gradient-text">AproxMixer</span>
          <br />
          <span className="text-foreground">Privacy-First Mixing Protocol</span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
          A non-custodial, zero-knowledge proof-based mixing protocol for Ethereum-compatible networks. 
          Achieve transaction privacy through cryptographic unlinkability without compromising on security or decentralization.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button variant="gradient" size="lg" asChild>
            <Link to="/quick-start">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <SectionHeader 
        title="Key Features" 
        subtitle="What makes AproxMixer unique"
        id="features"
      />
      
      <div className="grid md:grid-cols-2 gap-4 mb-16">
        <FeatureCard
          icon={<Shield className="w-6 h-6 text-primary" />}
          title="Non-Custodial Design"
          description="Your funds remain under your control at all times. Smart contracts handle deposits and withdrawals without third-party custody."
        />
        <FeatureCard
          icon={<Lock className="w-6 h-6 text-primary" />}
          title="zk-SNARK Privacy"
          description="Zero-knowledge proofs ensure complete unlinkability between deposits and withdrawals while maintaining verifiability."
        />
        <FeatureCard
          icon={<Globe className="w-6 h-6 text-primary" />}
          title="Multi-Chain Support"
          description="Deploy and operate across multiple Ethereum-compatible networks including Ethereum, Polygon, Arbitrum, and more."
        />
        <FeatureCard
          icon={<Zap className="w-6 h-6 text-primary" />}
          title="Gas-Optimized Relayers"
          description="Optional relayer network allows withdrawals without linking to your original address through gas payments."
        />
      </div>

      {/* Privacy Overview */}
      <SectionHeader 
        title="Privacy Guarantees" 
        subtitle="How AproxMixer protects your transactions"
        id="privacy-overview"
      />

      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Unlinkability</h4>
            <p className="text-sm text-muted-foreground">
              Deposits and withdrawals cannot be linked through on-chain analysis
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Confidentiality</h4>
            <p className="text-sm text-muted-foreground">
              Transaction details remain private and verifiable only by participants
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Network className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Decentralization</h4>
            <p className="text-sm text-muted-foreground">
              No central authority controls the mixing process or holds user funds
            </p>
          </div>
        </div>
      </div>

      <InfoBox variant="info" title="Important Note">
        AproxMixer is designed for legitimate privacy use cases. Users are responsible for ensuring 
        compliance with applicable laws and regulations in their jurisdiction.
      </InfoBox>

      {/* Architecture Overview */}
      <SectionHeader 
        title="Architecture Overview" 
        subtitle="High-level system components"
        id="architecture-overview"
      />

      <div className="space-y-4 mb-8">
        <div className="gradient-border p-5 rounded-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold">Smart Contracts</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Core protocol logic deployed on-chain, including the Mixer.sol for deposit/withdrawal operations 
            and Verifier.sol for zk-SNARK proof verification.
          </p>
          <CodeBlock 
            code={`// Core contracts
├── Mixer.sol          // Deposit & withdrawal logic
├── Verifier.sol       // zk-SNARK proof verification
└── MerkleTree.sol     // Commitment tree management`}
            language="solidity"
          />
        </div>

        <div className="gradient-border p-5 rounded-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-secondary" />
            </div>
            <h4 className="font-semibold">Frontend Application</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            React-based web application built with Vite and shadcn/ui, providing a seamless 
            user experience for interacting with the protocol.
          </p>
          <CodeBlock 
            code={`// Tech stack
├── React + TypeScript
├── Vite (build tool)
├── shadcn/ui + Tailwind
└── ethers.js / wagmi`}
            language="text"
          />
        </div>

        <div className="gradient-border p-5 rounded-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <h4 className="font-semibold">Backend & Relayer Services</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Optional backend services for proof generation assistance and relayer network 
            for anonymous withdrawals without gas payments from the recipient address.
          </p>
          <CodeBlock 
            code={`// Services
├── Proof Generator API
├── Relayer Network
└── Merkle Tree Indexer`}
            language="text"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="glass-card rounded-xl p-6 mt-12">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-primary" />
          Continue Reading
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link 
            to="/quick-start" 
            className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border/50 transition-colors duration-200 group"
          >
            <span className="font-medium group-hover:text-primary transition-colors">Quick Start Guide</span>
            <p className="text-sm text-muted-foreground mt-1">Get up and running in minutes</p>
          </Link>
          <Link 
            to="/architecture" 
            className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border/50 transition-colors duration-200 group"
          >
            <span className="font-medium group-hover:text-primary transition-colors">Architecture Deep Dive</span>
            <p className="text-sm text-muted-foreground mt-1">Understand the system design</p>
          </Link>
          <Link 
            to="/zk-proofs" 
            className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border/50 transition-colors duration-200 group"
          >
            <span className="font-medium group-hover:text-primary transition-colors">Zero-Knowledge Proofs</span>
            <p className="text-sm text-muted-foreground mt-1">Learn about zk-SNARKs</p>
          </Link>
          <Link 
            to="/api" 
            className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border/50 transition-colors duration-200 group"
          >
            <span className="font-medium group-hover:text-primary transition-colors">API Reference</span>
            <p className="text-sm text-muted-foreground mt-1">Integrate with the protocol</p>
          </Link>
        </div>
      </div>
    </DocLayout>
  );
};

export default Index;
