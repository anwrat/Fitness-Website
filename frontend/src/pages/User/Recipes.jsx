import UserNav from "../../components/UserNav";

function Recipes(){
    return(
        <div className="w-screen min-h-screen">
            <UserNav />
            <div className="pt-24 px-10">
                <h1 className="text-black">This is Recipes Page</h1>
            </div>
        </div>
    );
}
export default Recipes;