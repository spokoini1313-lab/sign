# Signal Pro 3.9.1 — Bybit integration fixes

Changes: 1x leverage verification, One-Way preflight, account-wide USDT linear position/order snapshots, aggregate allocation, zero-available balance handling, fee-aware sizing, IOC entry price bound, revalidation of approval, durable reservations, exact order reconciliation, protection repair/verification, guarded reduce-only closes, exact exit P&L association, environment separation, and mandatory verified Testnet round trip before mainnet.

Run: node bybit-live.test.mjs

Validation: 42 simulated regression checks and syntax checks. No real exchange orders were submitted. An authenticated Testnet run is still required; the UI keeps mainnet gated until a verified opening/protection/closing cycle. Monitoring and breakeven updates require an open page and unlocked keys. Use a dedicated subaccount and one active device. API/network/exchange failures and stop slippage cannot be eliminated.

Deployment: replace signal-pro/index.html and signal-pro/version.json together. Keep seed.json unchanged. Existing demo history and encrypted keys are preserved; trading is disabled during migration. Existing old failed requests remain reserved until reconciled rather than being assumed unfilled.

Review source: https://github.com/spokoini1313-lab/sign/blob/main/signal-pro/index.html

## 3.9.1 (on top of the 3.9 patch)

- Manual resolution for stuck live orders: a position closed outside the app (Bybit app, liquidation) no longer freezes live trading in "accounting". After a fresh check that no position or entry order remains on the symbol, the result is taken from Bybit closed-PnL for that symbol and window. An order whose response was lost can be released after 10 minutes if Bybit has no record of it and there is no position.
- Wallet: `bonus` / `spotBorrow` / `locked` omitted entirely are treated as 0; present-but-empty still fails closed.
- Mainnet confirmation text states the Testnet key is deleted (matches behavior).
- Open-P&L card counts only live orders of the active environment.
- Verified with the original 42 checks plus the app's own suites (engine 75, live core 45, app 144, live 66 against a simulated Bybit that verifies every HMAC signature and models Limit IOC, attached TP/SL with parentOrderLinkId, and 7-day closed-PnL windows).
