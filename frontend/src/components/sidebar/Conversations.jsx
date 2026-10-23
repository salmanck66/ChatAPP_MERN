import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = ({ search = "" }) => {
  const { loading, conversations } = useGetConversations();

  const query = search.trim().toLowerCase();
  const visible = query
    ? conversations.filter(
        (c) => c.fullName.toLowerCase().includes(query) || c.userName.toLowerCase().includes(query)
      )
    : conversations;

  return (
    <div className="flex flex-col overflow-y-auto min-h-0 flex-1">
      {visible.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === visible.length - 1}
        />
      ))}

      {loading && <span className="loading loading-spinner mx-auto my-4" />}
      {!loading && visible.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-6">
          {query ? "No one matches that search" : "No other users yet"}
        </p>
      )}
    </div>
  );
};

export default Conversations;
