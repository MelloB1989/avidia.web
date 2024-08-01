import { useQuery } from '@apollo/client';
import { createUser } from '@mutations';
import {useEffect} from 'react';
import { getUser } from '@queries';

export default function ProtectedPage(){
    const { loading, error, data } = useQuery(getUser, {
  variables: { 
    input: { nbspID: "2" }
  },
});

if (loading) return 'Loading...';
if (error) return `Error! ${error.message}`;
console.log(data);
    return (
        <>
        Test
        </>
        )
}

/*
export default function ProtectedPage(){
    const [addUser, { data, loading, error }] = useMutation(createUser);
    
    // Since you're using async function inside a React component, it's better to use useEffect or a button click handler.
    // React components shouldn't return promises, which is what an async function does.
    // Here's an example using useEffect:
    useEffect(() => {
        // You should handle the async operation here
        async function addUserAsync() {
            const result = await addUser({ variables: { input: {"nbspID":"1"} }});
            //console.log(result.data);
        }
        addUserAsync();
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // Render your component based on the state
    return (
        <div>
            {data ? <p>User created successfully!</p> : <p>Waiting for action</p>}
        </div>
    );
}
*/