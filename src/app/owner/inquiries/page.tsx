import ChatWindow from "@/components/ownerDashboard/ChatWindow";
import InquiryList from "@/components/ownerDashboard/InquiryList";
import RecentChats from "@/components/ownerDashboard/RecentChats";

const Inquiries = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <InquiryList />
        </div>

        <div className="col-span-3">
          <RecentChats />
        </div>

        <div className="col-span-6">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
