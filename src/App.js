import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";
import { DynamicParallelQueriesPage } from "./components/DynamicParallelQueries.page";

import "./App.css";
import { DependentQueriesPage } from "./components/DependentQueries.page";
import { PaginatedQueriesPage } from "./components/PaginatedQueries.page";
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">RQ Parallel</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">RQ Dynamic Parallel</Link>
              </li>
              <li>
                <Link to="/rq-paginated">RQ Paginated</Link>
              </li>
              <li>
                <Link to="/rq-infinite">RQ Infinite</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelQueriesPage heroIds={[1, 2, 3]} />}
            />
            <Route
              path="/rq-dependent"
              element={<DependentQueriesPage email={"vishwas@example.com"} />}
            />
            <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
            <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />
            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQSuperHeroPage />}
            />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
