
## Team Name
Stoplyfters

## Project Name 
StopLyfterz

## Team Members
Noah Laures
Troy Dvorak
Charlene Wendt
Zach Mork

## Build Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Supabase account and project

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd stoplyfters/StopLyfterz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `env.example` to `.env` (note: the example file doesn't have a leading dot)
   - Update the values with your Supabase project credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_KEY=your_supabase_anon_key
     ```
   - You can find these values in your Supabase project settings

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

