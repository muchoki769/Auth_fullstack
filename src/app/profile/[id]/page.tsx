
interface UserProfileProps {
    params: Promise<{
        id: string;

    }>;
}
export default async function UserProfile(props: UserProfileProps) {
    const {id} = await props.params;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>User Profile</h1>
            <hr />
            <p className="text-4xl">User Profile 
                <span className="mt-3 p-2 ml-2 rounded bg-orange-500 text-black">{id}</span>
            </p>
        </div>
    )
}