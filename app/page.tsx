import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import NewsList from "@/app/components/NewsList";
import RecentViews from "@/app/components/RecentViews";

export default function Main() {
    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Header />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                <NewsList />
                <RecentViews />
            </div>
        </div>
    )
}