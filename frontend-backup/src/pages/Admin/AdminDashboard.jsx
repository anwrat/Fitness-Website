import AdminNav from "../../components/AdminNav";

function AdminDashboard(){
    return(
        <div className="w-screen min-h-screen">
            <AdminNav />
            <h1 className="text-black text-center">Welcome Admin!!</h1>
        </div>
    );
}
export default AdminDashboard;