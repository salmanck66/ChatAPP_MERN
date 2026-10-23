import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer.jsx";
import useConversation from "../../store/useConversation";
import useListenMessages from "../../hooks/useListenMessagesHook.jsx";

const Home = () => {
  const { selectedConversation } = useConversation();
  // Listen at page level so messages for other chats still raise a notification
  useListenMessages();

  // On phones show one pane at a time: contacts, or the open chat
  const chatOpen = Boolean(selectedConversation);

  return (
    <div className="z-50 flex w-full max-w-5xl h-[calc(100dvh-2rem)] md:h-[600px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar className={chatOpen ? "hidden md:flex" : "flex"} />
      <MessageContainer className={chatOpen ? "flex" : "hidden md:flex"} />
    </div>
  );
};

export default Home;
