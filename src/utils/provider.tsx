// "use client";

// import React from "react";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// function Providers({ children }: React.PropsWithChildren) {
//   const [client] = React.useState(
//     new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
//   );

//   return (
//     <QueryClientProvider client={client}>
//       {children}
//       {process.env.NODE_ENV === "development" && (
//         <ReactQueryDevtools initialIsOpen={false} />
//       )}
//     </QueryClientProvider>
//   );
// }

// export default Providers;
