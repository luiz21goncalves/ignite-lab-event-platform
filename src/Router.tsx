import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Event } from './page/Event';
import { Subscribe } from './page/Subscribe';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Subscribe />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event/lesson/:slug" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
}
