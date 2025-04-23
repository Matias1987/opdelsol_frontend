import SettingList from "@/components/etc/settings/settings_list";
import LayoutAdmin from "@/components/layout/layout_admin";
import LayoutSingleLogedIn from "@/components/layout/layout_single_logedin";

export default function index(){
    return <SettingList />
}

index.PageLayout = LayoutSingleLogedIn;  