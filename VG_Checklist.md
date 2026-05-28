# Auctioneer — VG Checklist

## VG Requirements (from assignment spec)

### 1. Authentication & Authorization
- [ ] Guests can only read data — no bidding or creating/updating auctions without being logged in
- [ ] All mutations must be JWT protected (`[Authorize]` on correct endpoints)
- [ ] User can update their own **password** but **not** their username/email

### 2. Auction Search
- [ ] Search auctions by title — **open auctions only** in results
- [ ] Separate search for **closed/ended auctions**
  - Only show auction info + highest winning bid
  - No bid history visible
  - No option to place a bid

### 3. Auction Management
- [ ] Update an auction (title, description, dates etc.)
  - Price **cannot** be changed if bids already exist on the auction
- [ ] Open/closed status must be **dynamically derived** from `EndDate` vs current date/time — not just a manually set `IsActive` flag

### 4. Bid Management
- [ ] Retract (delete) a bid, but only if:
  - The auction is still open (not ended)
  - It is the **latest** bid on that auction

### 5. Admin Role
- [ ] Separate admin login (admin role claim in JWT)
- [ ] Admin can **deactivate an auction** so it no longer appears in searches
- [ ] Admin can **deactivate a user account** so they can no longer log in

### 6. Responsive Design
- [ ] Layout adapts to mobile screen sizes
- [ ] Sidebar/navbar works on small screens (currently a fixed sidebar — consider a hamburger menu on mobile)
- [ ] Auction cards and detail page are readable on mobile

### 7. React Router + Context API
- [x] React Router in use
- [x] AuthContext implemented with token + userId

---

## Code Quality & Architecture (higher standard required for VG)

### Backend
- [ ] Finalize the "delete auction" functionality. Currently the button is there but doesn't do anything.
- [ ] `AuctionService` and `UserService` should be injected via their **interfaces** (`IAuctionService`, `IUserService`) in controllers — not the concrete class
- [ ] `bidderId` should **not** come from the frontend — extract it from JWT claims in the controller and pass it to the service (security risk)
- [ ] `GetAuctionByIdAsync` in service returns `new AuctionDto()` instead of `null` for missing auctions — fix to return `null` and let controller return `NotFound()`
- [ ] `GetAllAuctionsForUserAsync` returns `IEnumerable<AuctionDto?>` (nullable items) — should be `IEnumerable<AuctionDto>`
- [ ] Add consistent error handling — consider a global exception middleware instead of try/catch in every controller action

### Frontend
- [ ] Remove unused `whoAmI` calls and the endpoint itself if no longer needed
- [ ] Add loading states to pages that fetch data (skeleton loaders or spinner) — currently prices flicker
- [ ] Add error states — if an API call fails, show a user-friendly message rather than silent failure
- [ ] `BidModal` still receives `userId` as a prop — it should get it from `useAuth()` directly instead

---

## Nice to Have (not required but improves the grade impression)

- [ ] Confirmation dialog before deleting an auction or retracting a bid
- [ ] Show auction status badge (Open / Closed) on auction cards
- [ ] Redirect to home with a message if a user tries to access a closed auction's bid form directly via URL
- [ ] Protect the `/create-auction` route — redirect unauthenticated users to home (consider a `ProtectedRoute` wrapper component)
- [ ] Pagination or a "load more" button if there are many auctions
- [ ] Display the winning bidder on closed auctions

---

## Summary of Priority Order

| Priority | Task |
|---|---|
| 🔴 High | `bidderId` security fix — extract from JWT in controller |
| 🔴 High | Search by title (open auctions) — required for basic pass too |
| 🔴 High | Open/closed logic derived from `EndDate` dynamically |
| 🔴 High | Admin role — deactivate auctions + users |
| 🟡 Medium | Update auction (with bid-check on price) |
| 🟡 Medium | Retract latest bid |
| 🟡 Medium | Update own password |
| 🟡 Medium | Search closed auctions — winner only view |
| 🟢 Lower | Responsive design |
| 🟢 Lower | ProtectedRoute for create-auction page |
| 🟢 Lower | Global error handling middleware |
