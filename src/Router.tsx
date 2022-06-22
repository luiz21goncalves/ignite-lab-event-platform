import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Event } from './page/Event';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/event" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
}
