# Auctioneer

A fullstack auction platform built with **React** and **ASP.NET Core Web API**, backed by **SQL Server**.

## Tech Stack

**Frontend**
- React + TypeScript
- React Router
- Context API (Auth, Toast)
- Vite

**Backend**
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication

## Features

- Browse open auctions without logging in
- Register and log in with JWT-secured sessions
- Create, edit and delete auctions
- Place and retract bids in real time
- Search auctions by title — optionally include closed ones
- Admin panel for deactivating auctions and user accounts
- Responsive design

## Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- SQL Server (local or Docker)

### Backend
```bash
cd Auctioneer.API
# Add your connection string and JWT secret to appsettings.json
dotnet ef database update
dotnet run
```

### Frontend
```bash
cd Auctioneer.Frontend
npm install
npm run dev
```

The API runs on `https://localhost:7029` and the frontend on `http://localhost:5173` by default.

## Project Structure

```
Auctioneer/
├── Auctioneer.API          # Controllers, middleware
├── Auctioneer.Application  # Services, interfaces, DTOs
├── Auctioneer.Domain       # Entities
├── Auctioneer.Infrastructure  # Repositories, DbContext, JWT
└── Auctioneer.Frontend     # React app
```

## License

MIT
