import Header from "@/components/Header";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const Home = async() => {
    const user = await getUser();

    if (!user) redirect('/signin');

    return (
        <div>
            <Header user={user}/>
        </div>
    )
}

export default Home;