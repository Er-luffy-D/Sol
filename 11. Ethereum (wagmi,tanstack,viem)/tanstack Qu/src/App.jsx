import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { Eth } from './Eth';

// Create a client
// const queryClient = new QueryClient();

// function App() {

//   return (<>
//     {/* Creating a context to share queryClient */}
//     <QueryClientProvider client={queryClient}>
//       <Todos></Todos>
//     </QueryClientProvider>
//   </>
//   )
// }

// Now using viem
function App() {

  return (<>
    <Eth></Eth>
  </>
  )
}

// getter function to do api call (fetch or axios request) 
const getTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/")
  const data = await response.json()
  return data;
}


const Todos = () => {


  // Queries (gives Data , isloading , Error and many other ) 
  const { data, isLoading, error } = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // const { data, isLoading, error } = useQuery({ queryKey: ['todos'], queryFn: getTodos,refetchInterval:2000 })
  // also provide refetchInterval to refetch the getter function after a interval (like above one calls the api after every 2 s (2000 miliseconds)) 

  if (isLoading) {
    return <>
      Loading...
    </>
  }


  if (error) {
    return <>
      Error Occured</>
  }

  return <>
    {data.map((s) => <div>
      {s.userId}<br></br>
      {s.title}
    </div>)}
  </>
}



export default App
