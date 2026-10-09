# Signal Pro 3.9 — Bybit integration fixes

Changes: 1x leverage verification, One-Way preflight, account-wide USDT linear position/order snapshots, aggregate allocation, zero-available balance handling, fee-aware sizing, IOC entry price bound, revalidation of approval, durable reservations, exact order reconciliation, protection repair/verification, guarded reduce-only closes, exact exit P&L association, environment separation, and mandatory verified Testnet round trip before mainnet.

Run: node bybit-live.test.mjs

Validation: 41 simulated regression checks and syntax checks. No real exchange orders were submitted. An authenticated Testnet run is still required; the UI keeps mainnet gated until a verified opening/protection/closing cycle. Monitoring and breakeven updates require an open page and unlocked keys. Use a dedicated subaccount and one active device. API/network/exchange failures and stop slippage cannot be eliminated.

Deployment: replace signal-pro/index.html and signal-pro/version.json together. Keep seed.json unchanged. Existing demo history and encrypted keys are preserved; trading is disabled during migration. Existing old failed requests remain reserved until reconciled rather than being assumed unfilled.

Review source: https://github.com/spokoini1313-lab/sign/blob/main/signal-pro/index.html
